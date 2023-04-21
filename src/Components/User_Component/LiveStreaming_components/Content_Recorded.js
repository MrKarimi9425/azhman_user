import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Black, Blue, Gray, Main, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native'
import { useFetch, isSet, EmptyPage, JDate } from '../../Common'
import { Courses } from '../../Common/dataArray';

const Content_livesToday = (props) => {
    const width = 320;
    const { replace } = useNavigation()


    const { data } = useFetch('datacourse/live_program_user', false)


    return (
        <>
            {
                isSet(data) ?
                    isSet(data["data"]) ?
                        data["data"].map((value, index) => {
                            return (
                                <>
                                    <Text style={styles.courseTitle}>{value["course"]["title"]}</Text>
                                    {
                                        isSet(value["course"]["item_live"]) && value["course"]["item_live"].map((value2, index2) => {
                                            return (
                                                <>
                                                    <Text style={styles.itemTitle}>{value2["title"]}</Text>
                                                    <View style={styles.line} />
                                                    <View style={styles.container}>

                                                        {
                                                            isSet(value2["data_course_to_day"]) && value2["data_course_to_day"].map((value3, index3) => {
                                                                return (
                                                                    <View key={index3} style={{ ...styles.card, width: width / 1.8 }}>
                                                                        <View style={styles.header}>
                                                                            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/logo.png')} />
                                                                            <View style={styles.index}>
                                                                                <Text style={styles.textIndex}>{index3 + 1}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={styles.textContainer}>
                                                                            <Text style={styles.title}>{value3.title}</Text>
                                                                            <Text style={styles.texts}>شروع کلاس</Text>
                                                                            {
                                                                                value3["datePlay"] != null ?
                                                                                    <Text style={styles.texts}>{JDate(value3["datePlay"])}</Text> :
                                                                                    <Text style={styles.texts}>نامشخص</Text>
                                                                            }
                                                                            <Text style={styles.texts}>{`ساعت ${value3["timeStart"]}`}</Text>
                                                                            <Text style={styles.texts}>برای ورود به کلاس برروی دکمه کلیک کنید</Text>
                                                                        </View>
                                                                        <Ripple onPress={() => replace('user', {
                                                                            screen: 'Live', params: {
                                                                                idDataCourse: value3["id"],
                                                                                goBack: props.route.name
                                                                            }
                                                                        })} style={styles.ripple}>
                                                                            <Text style={styles.rippleText}>وارد شوید</Text>
                                                                        </Ripple>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>

                                                </>
                                            )
                                        })
                                    }
                                </>
                            )

                        }) : <EmptyPage text={data["msg"]} />
                    :
                    <View style={styles.container}>
                        {
                            Courses.map(() => {
                                return (
                                    <View style={{ ...styles.loadingCard, width: width / 1.8, height: width / 1.2 }} />
                                )
                            })
                        }
                    </View>

            }
        </>
    )
}

export default React.memo(Content_livesToday)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    loadingCard: {
        backgroundColor: White,
        borderRadius: 15,
        margin: 10,
    },
    logo: {
        fontSize: RFValue(30),
        color: Main,
        margin: 8
    },
    line: {
        backgroundColor: Black,
        height: 0.5,
        width: '50%',
        alignSelf: 'center',
        margin: 10
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Main,
    },
    courseTitle: {
        fontFamily: 'BYekan',
        fontSize: RFValue(30),
        color: Main,
        alignSelf: 'center',
        margin: 5,
        borderWidth: 1,
        paddingHorizontal: 50,
        borderRadius: 10,
        borderColor: Main
    },
    itemTitle: {
        fontFamily: 'BYekan',
        fontSize: RFValue(20),
        color: Main,
        alignSelf: 'center',
        marginTop: 30
    },
    index: {
        backgroundColor: Main,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 100,
        margin: 8
    },
    textIndex: {
        fontFamily: 'BYekan',
        fontSize: RFValue(20),
        color: White,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    card: {
        backgroundColor: White,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        margin: 10,
        padding: 5
    },
    ripple: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Main,
        borderTopLeftRadius: 20,
        padding: 10,
    },
    rippleText: {
        fontFamily: 'BYekan',
        fontSize: RFValue(10),
        color: White,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
        marginHorizontal: 15
    },
    texts: {
        fontFamily: 'BYekan',
        fontSize: RFValue(10),
        color: Gray,
        margin: 5,
        textAlign: 'center'
    }
})