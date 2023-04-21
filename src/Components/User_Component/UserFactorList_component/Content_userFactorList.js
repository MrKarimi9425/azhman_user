import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Courses } from "../../Common/dataArray";
import { Black, Blue, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseUrl, imageUrl, url } from '../../Common/Address';
import { useNavigation } from '@react-navigation/native'
import { Factor } from '../../InitialValue/Factor'
import { EmptyPage, isSet, JDate, useFetch } from '../../Common';

const Content_userFactorList = (props) => {
    const width = 320;
    let factor = new Factor();
    const { data } = useFetch('factor/list', false, 'POST', {
        idCatService: 1
    })

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
                    isSet(data["data"]) ?
                        data.data.map((value, index) => {
                            return (
                                <View key={index} style={styles.card}>
                                    <View style={styles.section1}>
                                        {
                                            value.img != 'empty' ?
                                                <Image style={styles.image}
                                                    resizeMode={'cover'}
                                                    resizeMethod={'resize'}
                                                    source={{ uri: `${baseUrl}${imageUrl}factor/${value.img}` }} /> :
                                                <Image style={styles.avatar} source={require('../../../assets/images/avatar.png')} />
                                        }
                                    </View>
                                    <View style={styles.section2}>
                                        {/* <Text style={styles.descriptoin}>توضیحات کوتاه</Text> */}
                                        <Info text={'شماره فاکتور :'} value={value["id"]} />
                                        <Info text={'وضعیت فاکتور :'}
                                            style={{ color: factor.status(value["status"])["color"] }}
                                            value={factor.status(value["status"])["status"]} />
                                        <Info text={'تاریخ صدور :'} value={JDate(value["dateIssuing"])} />
                                        <Info text={'قیمت :'} value={`${value["price"]} تومان`} />

                                    </View>
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

export default React.memo(Content_userFactorList)

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
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
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
        height: 150
    },
    avatar: {
        width: 50,
        height: 50
    },
    titleText: {
        fontSize: RFValue(10),
        fontFamily: 'BYekan',
        color: Black
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
})