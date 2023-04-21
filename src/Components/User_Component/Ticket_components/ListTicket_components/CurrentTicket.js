import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, View, Text, Pressable, StyleSheet, useWindowDimensions, PixelRatio } from "react-native";

import { Black, Blue, Gray, Green, White, WhiteSmoke } from '../../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { imageUrl } from '../../../Common/Address';
import { isSet, JDate } from '../../../Common';
import { useNavigation } from '@react-navigation/native';
import { windowWidth } from '../../../../utils/Dimensions';

const CurrentTicket = ({ data }) => {
    const { width, height } = useWindowDimensions();
    const { navigate } = useNavigation();

    const status = (status) => {
        let textColor;
        switch (status) {
            case 'wait':
                return {
                    text: 'در انتظار پاسخ کارشناس',
                    color: 'orange'
                }
            case 'close':
                textColor = 'red'
                return {
                    text: 'بسته شده',
                    color: 'red'
                }
            case 'answer':
                return {
                    text: 'پاسخ داده شده',
                    color: Green
                }
            default:
                return {
                    text: 'نامشخص',
                    color: Gray
                }
        }
    }
    return (
        <View>
            {
                isSet(data) ?
                    data.map((value, index) => {
                        return (
                            <Ripple onPress={() => {
                                navigate('user', { screen: 'Chat', params: { idTicket: value["id"] } })
                            }} key={index} style={{ ...styles.container, width: width - 50, }}>
                                <View style={styles.sec}>
                                    <Text style={styles.valueText}>{JDate(value["date"])}</Text>
                                    <Text style={styles.text}>تاریخ :</Text>
                                </View>
                                <View style={styles.sec}>
                                    <Text style={styles.valueText}>{value["receiver"] ? `${value["receiver"]["name"]} ${value["receiver"]["lName"]}` : 'نامشخص'}</Text>
                                    <Text style={styles.text}>نام مربی :</Text>
                                </View>
                                <View style={styles.sec}>
                                    <Text style={styles.valueText}>{value["type"]}</Text>
                                    <Text style={styles.text}>موضوع تیکت :</Text>
                                </View>
                                <View style={styles.sec}>
                                    <Text style={styles.valueText}>{value["title"]}</Text>
                                    <Text style={styles.text}>عنوان تیکت :</Text>
                                </View>
                                <View style={{ ...styles.sec, justifyContent: 'flex-end' }}>
                                    <Text style={styles.text}>وضعیت تیکت :</Text>
                                </View>
                                <View style={styles.sec}>
                                    <Text style={{ ...styles.valueText, fontSize: RFValue(14), color: status(value["status"]).color }}>{status(value["status"]).text}</Text>
                                </View>
                                <View style={styles.hale} />
                            </Ripple>
                        )
                    })
                    :
                    <View style={{ width: windowWidth, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'BYekan', fontSize: RFValue(16), color: Black }}>تیکت فعالی وجود ندارد</Text>
                    </View>
            }
        </View>
    )
}

export { CurrentTicket }

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        position: 'relative',
        padding: 10,
        elevation: 5,
        borderRadius: 20,
        margin: 10,
        overflow: 'hidden',
        backgroundColor: White
    },
    sec: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    valueText: {
        fontFamily: 'BYekan',
        color: Blue,
        fontSize: RFValue(12),
    },
    text: {
        fontFamily: 'BYekan',
        color: Black,
        fontSize: RFValue(12),
    },
    hale: {
        width: 500, height: 500, borderRadius: 500, backgroundColor: Blue, opacity: 0.4,
        position: 'absolute', right: -200,
        top: -5
    }

})