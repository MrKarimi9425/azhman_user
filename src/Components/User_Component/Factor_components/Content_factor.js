import { Image, LayoutAnimation, Linking, Platform, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { Black } from '../../InitialValue/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { baseUrl, url } from '../../Common/Address';
import { Context } from '../../../Storage/Context';
import { Button, isSet, useFetch } from '../../Common';


// if (Platform.OS === 'android') {
//     if (UIManager.setLayoutAnimationEnabledExperimental) {
//         UIManager.setLayoutAnimationEnabledExperimental(true);
//     }
// }

const Info = ({ text, value, style }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={{ ...styles.value, ...style }}>{value}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
const Content_factor = (props) => {
    const { GET_KEY } = useContext(Context)
    const { replace } = useNavigation();
    const { openAlert } = useContext(Context);
    const { data } = useFetch('factor/show', false, 'POST', {
        idCourse: props.route.params.id,
    });
    const { data: del, doFetch } = useFetch('activation/delete_buy_course', true);

    useEffect(() => {
        if (data.res == 0) {
            openAlert('error', 'خطا', data["msg"])
        }
    }, [data])

    useEffect(() => {
        if (isSet(del)) {
            if (del.res !== 0) {
                replace('user', { screen: 'Main', params: { goback: props.route.name } })
            }
        }
    }, [del])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>تاییدیه و پرداخت</Text>
                <MaterialCommunityIcons name='check-circle'
                    style={styles.icon}
                />
            </View>
            {
                isSet(data["output"]) &&
                <>
                    <Info text={'نام مربی :'} value={data["output"]["coach"]["name"]} />
                    <Info text={'نام خانوادگی مربی :'} value={data["output"]["coach"]["lName"]} />
                    <Info text={'نام دوره :'} value={data["output"]["course"]["title"]} />
                    <Info text={'توضیحات دوره :'} />
                    <Info text={data["output"]["course"]["desShort"]} />
                    <Info style={{ textDecorationLine: 'line-through', color: 'red' }}
                        text={'قیمت دوره :'}
                        value={`${data["output"]["course"]["price"]} تومان`} />
                    <Info style={{ color: 'green' }}
                        text={'قیمت دوره  با تخفیف:'} value={`${data["output"]["course"]["priceDiscounted"]} تومان`} />
                    {
                        typeof data["output"]["bank"] !== 'undefined' &&
                        data["output"]["bank"] != null && data["output"]["bank"].map((value, index) => {
                            return (
                                <>
                                    <Info text={'شماره کارت :'}
                                        value={value["accountNumber"]} />
                                    <Info text={'بانک واریزی :'} value={value["nameBank"]} />
                                </>
                            )
                        })
                    }

                    <View style={styles.buttonContiner}>
                        <Button onPress={() => {
                            Linking.openURL(`${baseUrl}/factor/paid?auth=${GET_KEY}&idFactor=${data["output"]["factor"]["id"]}`)
                        }}
                            type={'success'} title={'پرداخت آنلاین'}
                        />
                        <Button onPress={() => {
                            replace('user', {
                                screen: 'OfflinePayment', params: {
                                    id: data["output"]["course"]["id"],
                                    goback: props.route.name
                                }
                            })
                        }} type={'success'}
                            title={'پرداخت آفلاین'} />
                    </View>
                    <Button onPress={() => {
                        doFetch({
                            idCourse: data["output"]["course"]["id"]
                        })
                    }}
                        type={'danger'} title={'حذف و بازگشت'} />
                </>
            }


        </View>

    )
}

export default React.memo(Content_factor)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        padding: 15,
        // marginHorizontal: 40,
        backgroundColor: 'rgba(242, 242, 242, 0.2)'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    title: {
        fontSize: RFValue(16),
        fontFamily: 'BYekan',
        // margin: 20,
        color: Black,
    },
    textContainer: {
        margin: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    icon: {
        color: 'rgba(75, 211, 123, 1)',
    },
    text: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Black
    },
    value: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Black,
    },
    buttonContiner: {
        flexDirection: 'row',
        padding: 20,
        marginTop: 30
    }
})