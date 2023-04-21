import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from "react-native";
import { Courses } from "../../Common/dataArray";
import { Black, Blue, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { useFetch } from '../../Common';
import { baseUrl, imageUrl } from '../../Common/Address';
import { useNavigation } from '@react-navigation/native'

const Coachs = (props) => {
    const width = 320;
    const navigation = useNavigation()
    const { data } = useFetch('guest/find', false, 'POST', {
        idCatService: 1
    })
    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>مربیان آژمان</Text>
                <View style={styles.line} />
            </View>
            <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
                {
                    typeof data.data !== 'undefined' ?
                        data.data.listCoach.map((value, index) => {
                            return (
                                <View
                                    key={index} style={{ ...styles.card, width: width / 1.5, height: width}}>
                                    <View style={styles.section1}>
                                        {
                                            value.img != 'empty' ?
                                                <Image style={styles.image}
                                                    resizeMode={'stretch'}
                                                    resizeMethod={'resize'}
                                                    source={{ uri: `${baseUrl}${imageUrl}profile/${value.img}` }} /> :
                                                <Image style={styles.avatar} source={require('../../../assets/images/logo.png')} />
                                        }
                                    </View>
                                    <View style={styles.section2}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={styles.titleText}>{value.name} {value.lName}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 2 }}>
                                            <View style={styles.contentText}>
                                                <Text style={styles.otherText}>امتیاز</Text>
                                                <Text style={styles.otherText}>{value["score"]}</Text>
                                            </View>
                                            <View style={styles.contentText}>
                                                <Text style={styles.otherText}>شاگردان</Text>
                                                <Text style={styles.otherText}>150</Text>
                                            </View>
                                            <View style={styles.contentText}>
                                                <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.otherText}>کلاس های فعال</Text>
                                                <Text style={styles.otherText}>100</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.bottonContainer}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.replace('user', { screen: 'instagram', params: { screen: 'profile', params: { id: value["idUser"] } } })
                                        }} style={styles.bottons}>
                                            <Text style={styles.bottonText}>پروفایل</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            navigation.replace('user', {
                                                screen: 'CoachsCourses',
                                                params: {
                                                    idCatService: 1,
                                                    idCoach: value.idUser,
                                                    goBack: props.route.name
                                                }
                                            })
                                        }} style={styles.bottons}>
                                            <Text style={styles.bottonText}>دوره ها</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                        : Courses.map((value, index) => {
                            return (
                                <View key={index} style={{ ...styles.loadingCard, width: width / 2, height: width / 1.5 }} />
                            )
                        })
                }
            </ScrollView>
        </>
    )
}

export { Coachs }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentText: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: White,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        margin: 10,
        padding: 5
    },
    contentText: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
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
        fontSize: RFValue(18),
        color: Black,
        marginTop: 25
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 20
    },
    section1: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
    button: {
        backgroundColor: '#1690FF',
        borderRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    avatar: {
        width: 50,
        height: 50
    },
    titleText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: Blue
    },
    descriptoin: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: `rgba(228, 228, 228,0.5)`,
        padding: 5,
        fontFamily: 'BYekan',
        fontSize: RFValue(8)
    },
    sec1Text: {
        color: White,
        backgroundColor: `rgba(173, 215, 228,0.5)`,
        width: '100%',
        textAlign: 'center'
    },
    otherText: {
        fontSize: RFValue(8),
        fontFamily: 'BYekan',
        color: Black
    },
    bottonContainer: {
        flexDirection: 'row', justifyContent: 'space-evenly'
    },
    bottons: {
        backgroundColor: Blue, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flex: 1, margin: 5
    },
    bottonText: {
        color: White, fontFamily: 'BYekan', fontSize: RFValue(12)
    }
})