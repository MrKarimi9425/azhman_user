import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, ToastAndroid, Animated } from "react-native";
import { Black, Gray, Main, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native'
import { isSet, EmptyPage, JDate, JTime } from '../../Common'
import { Courses } from '../../Common/dataArray';


const Content_liveStreaming = ({ data, props }) => {
    const [fadeAnimation] = useState(new Animated.Value(0))

    const width = 320;
    const { replace, navigate } = useNavigation()



    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [])

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
                                                            "data_course_to_day" in value2 ?
                                                                value2["data_course_to_day"].map((value3, index3) => {
                                                                    return (
                                                                        <View key={index3} style={{ ...styles.card, width: width / 1.8 }}>
                                                                            <View style={styles.header}>
                                                                                <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/logo.png')} />
                                                                                {
                                                                                value3["status"] == 'complete' &&
                                                                                <Animated.View style={{
                                                                                    opacity: fadeAnimation
                                                                                }}>
                                                                                    < Image
                                                                                        resizeMode={'contain'}
                                                                                        resizeMethod={'resize'}
                                                                                        source={require('../../../assets/images/ico_live.png')}
                                                                                    />
                                                                                </Animated.View>
                                                                            }
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
                                                                                <Text style={styles.texts}>{`ساعت ${JTime(value3["timeStart"])}`}</Text>
                                                                                <Text style={styles.texts}>برای ورود به کلاس برروی دکمه کلیک کنید</Text>
                                                                            </View>
                                                                          
                                                                            {
                                                                                value3["status"] == 'complete' &&
                                                                                <Ripple onPress={() =>
                                                                                    replace('user', {
                                                                                        screen: 'Live', params: {
                                                                                            idDataCourse: value3["id"],
                                                                                            goBack: props.route.name
                                                                                        }
                                                                                    })
                                                                                } style={styles.ripple}>
                                                                                    <Text style={styles.rippleText}>وارد شوید</Text>
                                                                                </Ripple>
                                                                            }
                                                                        </View>
                                                                    )
                                                                }) :
                                                                'data_course_live_before' in value2 &&
                                                                value2["data_course_live_before"].map((value3, index3) => {
                                                                    return (
                                                                        <View key={index3} style={{ ...styles.card, width: width }}>
                                                                            <View style={styles.recorded.header}>
                                                                                <Text style={styles.recorded.title}>{value3.title}</Text>
                                                                                <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/logo.png')} />
                                                                            </View>
                                                                            <View style={styles.recorded.textContainer}>
                                                                            </View>
                                                                            <Ripple onPress={() => {
                                                                                if (value3["status"] === 'complete') {
                                                                                    navigate('user', {
                                                                                        screen: 'PlayVideo',
                                                                                        params: {
                                                                                            url: value3['hls_playlist'],
                                                                                            goBack: props.route.name
                                                                                        }
                                                                                    })
                                                                                    // console.log('video ====>',value3['hls_playlist'])
                                                                                } else if (value3["status"] === 'changing') {
                                                                                    ToastAndroid.showWithGravity(
                                                                                        'ویدئو در حال آماده سازی است',
                                                                                        ToastAndroid.SHORT,
                                                                                        ToastAndroid.BOTTOM
                                                                                    )
                                                                                } else {
                                                                                    ToastAndroid.showWithGravity(
                                                                                        'ویدئویی وجود ندارد',
                                                                                        ToastAndroid.SHORT,
                                                                                        ToastAndroid.BOTTOM
                                                                                    )
                                                                                }
                                                                            }} style={styles.recorded.ripple}>
                                                                                <Text style={styles.rippleText}>پخش ویدیو</Text>
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
                            Courses.map(value => {
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

export default React.memo(Content_liveStreaming)

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
        marginTop: 20,
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
        // marginTop: 30
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
    },
    recorded: {
        textContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 40,
            // marginHorizontal: 15
            position: 'absolute'
        },
        header: {
            alignItems: 'center',
            padding: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row'
        },
        ripple: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: Main,
            borderTopRightRadius: 20,
            padding: 10,
            paddingHorizontal: 20
        },
        title: {
            fontFamily: 'BYekan',
            fontSize: RFValue(14),
            color: Main,
            marginRight: 20
        },
    }
})