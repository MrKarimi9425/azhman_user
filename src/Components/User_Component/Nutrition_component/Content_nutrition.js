import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, Linking, ToastAndroid } from "react-native";
import { Courses } from "../../Common/dataArray";
import { Black, Blue, Pink, White, Main } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseUrl, imageUrl, url } from '../../Common/Address';
import { useNavigation } from '@react-navigation/native'
import { Factor } from '../../InitialValue/Factor'
import { EmptyPage, isSet, JDate, useFetch } from '../../Common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const Content_nutrition = (props) => {
    let factor = new Factor();
    const { data } = useFetch('activitypro/nutrition')
    const { navigate, replace } = useNavigation()


    const Info = ({ text, value, style }) => {
        return (
            <View style={styles.textContainer}>
                <Text style={{ ...styles.value, ...style }}>{value}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }

    return (
        <>
            {
                isSet(data) ?
                    isSet(data["data"]["nutrition"]) ?
                        data["data"]["nutrition"].map((value, index) => {
                            return (
                                <View key={index} style={styles.card}>
                                    <View style={styles.section1}>
                                        <Text style={styles.itemTitle}>{value["title"]}</Text>
                                    </View>
                                    <View style={styles.section2}>
                                        <Text style={styles.descriptoin}>{value["des"]}</Text>
                                        <Info text={'تاریخ:'} value={JDate(value["date"])} />
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        isSet(value["typeRecord"]) &&
                                            value["typeRecord"] == 'CoachResponse' ?
                                            value["file"] != null ?
                                                Linking.openURL(`${baseUrl}${imageUrl}activitypro/${value["file"]}`) :
                                                ToastAndroid.showWithGravity(
                                                    'برنامه ای وجود ندارد لطفا به مربی پیام بدهید',
                                                    ToastAndroid.SHORT,
                                                    ToastAndroid.BOTTOM
                                                ) :
                                            ToastAndroid.showWithGravity(
                                                'لطفا تا دریافت پاسخ کارشناسان منتظر بمانید',
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM
                                            )
                                    }} style={styles.buttons}>
                                        <Text style={styles.buttonText}>
                                            {
                                                isSet(value["typeRecord"]) &&
                                                    value["typeRecord"] == 'CoachResponseWait' ?
                                                    <Text style={styles.buttonText}>درحال بررسی توسط کارشناس تغذیه</Text> :
                                                    <Text style={styles.buttonText}>دانلود برنامه</Text>
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigate('user', { screen: 'Chat', params: { idTicket: value["idTable"] } })}
                                        style={{ ...styles.buttons, backgroundColor: Pink }}>
                                        <Text style={styles.buttonText}>ارتباط با مربی</Text>
                                    </TouchableOpacity>
                                    {/* {
                                        console.log( value["done"])
                                    } */}
                                    {
                                        value["done"] && value["done"] != null &&
                                        (value["done"] != "questionNOTExist" || value["done"] == "questionExist") &&
                                        <TouchableOpacity onPress={() => {
                                            // console.log(value["idItem"])
                                            if (value["done"] == "questionAnswer") {
                                                ToastAndroid.showWithGravity(
                                                    "شما به سوالات این برنامه پاسخ داده اید",
                                                    ToastAndroid.SHORT,
                                                    ToastAndroid.BOTTOM
                                                )
                                            } else {
                                                replace('user',
                                                    {
                                                        screen: 'Questions',
                                                        params:
                                                        {
                                                            idItem: value["idItem"],
                                                            type: 'nutrition'
                                                        }
                                                    })
                                            }
                                        }}
                                            style={{ ...styles.buttons, backgroundColor: Main }}>
                                            <Text style={styles.buttonText}>سوالات آپشن</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                            )
                        })
                        : <EmptyPage text={data["msg"]} />
                    : Courses.map((value, index) => {
                        return (
                            <View key={index} style={styles.loadingCard} />
                        )
                    })
            }
        </>
    )
}

export default React.memo(Content_nutrition)

const styles = StyleSheet.create({
    card: {
        backgroundColor: White,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        margin: 10,
        padding: 5
    },
    textContainer: {
        margin: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    text: {
        fontFamily: 'BYekan',
        fontSize: RFValue(10),
        color: 'rgba(0, 0, 0, 0.5)'
    },
    value: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Black
    },
    loadingCard: {
        width: '95%',
        alignSelf: 'center',
        height: 300,
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    section1: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#2095F2',
        overflow: 'hidden'
    },
    section2: {
        flex: 1.1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttons: {
        backgroundColor: Blue, borderRadius: 15, width: '100%', padding: 8, justifyContent: 'center', alignItems: 'center',
        marginVertical: 3
    },
    buttonText: {
        fontSize: RFValue(14), color: White, fontFamily: 'BYekan'
    },
    image: {
        width: '100%',
        height: 150
    },
    avatar: {
        width: 50,
        height: 50
    },
    itemTitle: {
        fontFamily: 'BYekan',
        fontSize: RFValue(20),
        color: White,
        alignSelf: 'center',
        margin: 10
    },
    descriptoin: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: `rgba(228, 228, 228,0.5)`,
        padding: 10,
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        lineHeight: 20,
        marginTop: 10
    },
    sec1Text: {
        color: White,
        backgroundColor: `rgba(173, 215, 228,0.5)`,
        width: '100%',
        textAlign: 'center'
    },

})