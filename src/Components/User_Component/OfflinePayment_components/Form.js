import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, ToastAndroid, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import Input from './Input';
import { Black, Gray, White, WhiteSmoke } from '../../InitialValue/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DropDown from './DropDown';
import { Formik } from 'formik';
import { Library, uploadFile } from '../../Common/ImagePicker';
import { launchImageLibrary } from "react-native-image-picker";
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import { Context } from '../../../Storage/Context';
import { Button, isSet, UnDoneWork, useFetch, UserManual } from '../../Common';


const Form = (props) => {
    const { GET_KEY } = useContext(Context)
    const { alertConfig, closeAlert, openAlert } = useContext(Context);

    const { width, height } = useWindowDimensions();
    const [counter, setCounter] = useState(0)
    const [counter2, setCounter2] = useState(0)
    const [bank, setBank] = useState(0)
    const [image, setImage] = useState(null)
    const [cartNumber, setCartNumber] = useState(0)
    const [datePayment, setDatePayment] = useState('1401/1/1')
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dropDownItems] = useState([]);
    const { work } = UnDoneWork()
    const { manual } = UserManual()
    const [banks] = useState([]);


    // دریافت اطلاعات از سرور
    const { data } = useFetch('factor/offline', false, 'POST', {
        idCourse: props.route.params.id,
    });
    // دریافت اطلاعات فرم از سرور
    useEffect(() => {
        if (typeof data !== 'undefined' && typeof data["data"] !== 'undefined') {
            if (data["data"] != null) {
                let keys = Object.keys(data["data"]["ofBank"])
                let values = Object.values(data["data"]["ofBank"])
                let i = 0;
                if (counter2 != keys.length) {
                    while (i < keys.length) {
                        banks.push({ 'label': values[i], 'value': keys[i] })
                        setCounter2(keys.length)
                        i++;
                    }
                }
                if (counter == 0) {
                    data["data"]["idBank"]["full"].forEach(value => {
                        dropDownItems.push({ 'label': `${value["accountNumber"]} - ${value["nameBank"]}`, 'value': value.id });
                        setCounter(counter + 1)
                    })
                }
            }
        }
    }, [data])


    // ارسال اطلاعات به سرور
    const { data: submit, doFetch } = useFetch('factor/offline', true);
    useEffect(() => {
        if (isSet(submit)) {
            console.log(submit)
            if (submit.res == 0) {
                work({
                    type: submit["type"],
                    id: 10,
                    navigation: props.navigation,
                    msg: submit["msg"]
                })
            } else {
                manual({
                    id: submit["data"]["idCourse"],
                    navigation: props.navigation,
                })
            }
        }
    }, [submit])


    // دریافت رسید از گالری
    const ImagePicker = async () => {
        setLoading(true)
        Library('photo').then(image => {
            setImage(image["image"])
            setLoading(false)
        })
    }

    return (
        <>
            <Formik initialValues={{
                ofAccount: '',
                issueTracking: '',
                price: '',
                desUser: '',
            }}
                onSubmit={(values, { setSubmitting }) => {
                    doFetch({
                        idCourse: props.route.params.id,
                        sendData: 1,
                        Factor: {
                            datePayment: datePayment,
                            img: image,
                            idBank: cartNumber,
                            ofAccount: values["ofAccount"],
                            IssueTracking: values["issueTracking"],
                            ofBank: bank,
                            price: values["price"],
                            desUser: values["desUser"],
                            idCourse: props.route.params.id
                        }
                    })
                    setSubmitting(false)
                }}>
                {
                    ({
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        values
                    }) => <View style={styles.container}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.title}>تاریخ پرداخت :</Text>
                                <Pressable onPress={() => setDatePickerVisible(true)} style={styles.datePayment}>
                                    <Text style={{ ...styles.dateText, color: Black }}>{datePayment}</Text>
                                </Pressable>
                            </View>
                            <DropDown title={'شماره کارت مقصد:'} items={dropDownItems}
                                value={cartNumber} setValue={setCartNumber} empty={'کارتی اضافه نشده'}
                            />

                            <Input
                                values={values["ofAccount"]}
                                handleBlur={handleBlur("ofAccount")}
                                handleChange={handleChange("ofAccount")}
                                keyboardType={'decimal-pad'}
                                placeholder={'شماره کارت مبدا'} text={'شماره کارت مبدا:'} />

                            <DropDown title={'بانک مبدا :'} items={banks}
                                value={bank} setValue={setBank} empty={'بانکی اضافه نشده'}
                            />

                            <Input
                                values={values["issueTracking"]}
                                handleBlur={handleBlur("issueTracking")}
                                handleChange={handleChange("issueTracking")}
                                keyboardType={'decimal-pad'}
                                placeholder={'شناسه پیگیری'}
                                text={'شناسه پیگیری :'} />

                            <View style={styles.inputContainer}>
                                <Text style={styles.title}>بارگذاری فیش :</Text>
                                <Pressable onPress={ImagePicker} style={styles.ripple}>
                                    {
                                        !loading ?
                                            image == null ? (
                                                <FontAwesome style={styles.icon} size={RFValue(25)} name='upload' />
                                            ) : (
                                                <FontAwesome style={styles.icon} size={RFValue(25)} name='check' />
                                            )
                                            :
                                            <ActivityIndicator />
                                    }
                                    {
                                        image != null ?
                                            <Text style={styles.image}>رسید بارگزاری شد</Text> :
                                            <Text style={styles.image}>انتخاب عکس ...</Text>
                                    }
                                </Pressable>
                            </View>

                            <Input
                                values={values["price"]}
                                handleBlur={handleBlur("price")}
                                handleChange={handleChange("price")}
                                keyboardType={'decimal-pad'}
                                placeholder={'(تومان)'}
                                text={'قیمت :'} />

                            <Input
                                values={values["desUser"]}
                                handleBlur={handleBlur("desUser")}
                                handleChange={handleChange("desUser")}
                                placeholder={'توضیحات خود را تایپ کنید...'}
                                text={'توضیحات تکمیلی :'} />

                            <Button style={{ margin: 25 }} onPress={handleSubmit} type={'success'} title={'پرداخت'} />
                        </View>
                }
            </Formik>
            <Modal visible={datePickerVisible} transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <DatePicker
                        style={[styles.datePicker.style, width > height ? { height: '100%' } : null]}
                        minDate='1401/1/1'
                        maxDate='1500/1/1'
                        onDateChange={date => {
                            setDatePayment(date)
                            setDatePickerVisible(false)
                        }}
                        selected={datePayment}
                        yearMonthBoxStyle={styles.datePicker.yearMonthBoxStyle}
                        headerContainerStyle={styles.datePicker.headerContainerStyle}
                        yearMonthTextStyle={styles.datePicker.yearMonthTextStyle}
                        iconContainerStyle={styles.datePicker.iconContainerStyle}
                        backIconStyle={styles.datePicker.backIconStyle}
                        nextIconStyle={styles.datePicker.nextIconStyle}
                        eachYearStyle={styles.datePicker.eachYearStyle}
                        eachYearTextStyle={styles.datePicker.eachYearTextStyle}
                        eachMonthStyle={styles.datePicker.eachMonthStyle}
                        eachMonthTextStyle={styles.datePicker.eachMonthTextStyle}
                        weekdaysContainerStyle={styles.datePicker.weekdaysContainerStyle}
                        weekdayStyle={styles.datePicker.weekdayStyle}
                        weekdayTextStyle={styles.datePicker.weekdayTextStyle}
                        borderColor='#4bcffa'
                        dayStyle={styles.datePicker.dayStyle}
                        selectedDayStyle={styles.datePicker.selectedDayStyle}
                        selectedDayColor='#4bcffa'
                        dayTextStyle={styles.datePicker.dayTextStyle}
                        selectedDayTextColor='white'
                        dayTextColor={Black}
                        disabledTextColor='#4bcffa66'
                    />
                </View>
            </Modal>

        </>
    )
}

export default React.memo(Form)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    },
    inputContainer: {
        marginTop: 15,
        width: '100%',
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Black
    },
    ripple: {
        backgroundColor: WhiteSmoke,
        width: '100%',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        color: 'rgba(84, 84, 84, 0.5)'
    },
    text: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: 'rgba(84, 84, 84, 0.5)'
    },
    datePayment: {
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    dateText: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: 'rgba(84, 84, 84, 0.5)'
    },
    datePicker: {
        style: {
            height: '60%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            margin: 15,
            borderRadius: 25,
            elevation: 5
        },
        yearMonthBoxStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            paddingHorizontal: 15,
            borderRadius: 10
        },
        headerContainerStyle: {
            // height: '15%',
            padding: 15
        },
        yearMonthTextStyle: {
            fontFamily: 'BYekan',
            fontSize: RFValue(22),
            color: '#4bcffa'
        },
        iconContainerStyle: {
            width: `${100 / 7}%`
        },
        backIconStyle: {
            width: 20,
            height: 20,
            resizeMode: 'center',
            tintColor: '#808e9b'
        },
        nextIconStyle: {
            width: 20,
            height: 20,
            resizeMode: 'center',
            tintColor: '#4bcffa'
        },
        eachYearStyle: {
            width: '30%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4bcffa',
            marginTop: '1.5%',
            marginBottom: 5,
            marginHorizontal: '1.5%',
            borderRadius: 10,
            elevation: 5
        },
        eachYearTextStyle: {
            fontFamily: 'BYekan',
            fontSize: RFValue(16),
            color: 'white'
        },
        eachMonthStyle: {
            width: `${88 / 3}%`,
            height: `${88 / 4}%`,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4bcffa',
            margin: 5,
            borderRadius: 15,
            elevation: 3
        },
        eachMonthTextStyle: {
            fontFamily: 'BYekan',
            fontSize: RFValue(16),
            color: 'white'
        },
        weekdaysContainerStyle: {
            // height: '10%'
        },
        weekdayStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        weekdayTextStyle: {
            fontFamily: 'BYekan',
            fontSize: RFValue(16),
            color: '#808e9b',
            marginBottom: 5
        },
        dayStyle: {
            width: `${100 / 7}%`,
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: 1 / 1
        },
        selectedDayStyle: {
            width: '70%',
            aspectRatio: 1 / 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100
        },
        dayTextStyle: {
            fontFamily: 'BYekan',
            fontSize: RFValue(18)
        },
    }

})