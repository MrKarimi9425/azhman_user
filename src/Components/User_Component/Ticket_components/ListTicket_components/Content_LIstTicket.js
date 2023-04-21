import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, View, Text, Pressable, StyleSheet, useWindowDimensions, PixelRatio } from "react-native";
import { Black, Blue, White, WhiteSmoke } from '../../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import Rating from '../../../Common/Rating';
import { useNavigation } from '@react-navigation/native';
import { EmptyPage, isSet, useFetch } from '../../../Common';
import { Online } from '../../../Common/dataArray';
import { baseUrl, imageUrl } from '../../../Common/Address';
import { windowWidth } from '../../../../utils/Dimensions';

const Content_LIstTicket = ({ data }) => {
    const { width, height } = useWindowDimensions();
    const { navigate } = useNavigation();

    return (
        <>
            {
                isSet(data) ?
                    data.map((value, index) => {
                        return (
                            <View key={index}
                                style={{ ...styles.card, width: width / 2.8, height: width / 2 }}>
                                <View style={styles.section1}>
                                    {
                                        isSet(value["coach"]["img"]) &&
                                        <Image
                                            resizeMethod='auto'
                                            resizeMode='stretch'
                                            style={styles.image}
                                            source={{ uri: `${baseUrl}${imageUrl}profile/${value["coach"]["img"]}` }} />
                                    }
                                </View>
                                <View style={styles.section2}>
                                    <Text style={styles.titleText}>{`${value["coach"]["userName"]}`}</Text>
                                    <Text style={{ ...styles.titleText, fontSize: RFValue(8) }}>({`${value["coach"]["name"]} ${value["coach"]["lName"]}`})</Text>
                                </View>
                                <Ripple onPress={() => navigate('user', { screen: 'Show_Ticket', params: { idCoach: value["idCoach"],name:value["coach"]['userName'] } })} style={styles.button}>
                                    <Text style={styles.otherText}>ارسال پیام</Text>
                                </Ripple>
                            </View>
                        )
                    }) :
                      <View style={{ width: windowWidth, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'BYekan', fontSize: RFValue(16), color: Black }}>در دوره ای ثبت نام نکردید</Text>
                    </View>
            }
        </>
    )
}

export default React.memo(Content_LIstTicket);

const styles = StyleSheet.create({
    card: {
        backgroundColor: White,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        margin: 10,
        padding: 5
    },
    section1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        backgroundColor: '#2095F2',
        overflow: 'hidden'
    },
    section2: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    titleText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: Black,
        margin: 5
    },
    otherText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: White
    },
    contentContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%'
    },
})