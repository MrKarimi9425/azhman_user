import { FlatList, Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import * as yup from "yup";
import { Black, Blue, Gray, White, WhiteSmoke } from '../../InitialValue/Colors';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable'
import { ErrorMassages } from '../../Common/ErrorMassages';
import { RFValue } from 'react-native-responsive-fontsize';
import { setAuth_key, setStore } from '../../../Storage/Async';
import { Context } from '../../../Storage/Context';
import { Button, DropDown, isSet, Loading, useFetch } from '../../Common';
import LinearGradient from 'react-native-linear-gradient';
import { Text_input } from './Text_input';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Content_SignUp = (props) => {
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions();
    const [modal, setModal] = useState(false)
    const { SET_KEY } = useContext(Context);
    const [position, setPosition] = useState('country')

    const [country, setCountry] = useState({
        name: '',
        id: ''
    })
    const [province, setProvince] = useState({
        name: '',
        id: ''
    })
    const [city, setCity] = useState({
        name: '',
        id: ''
    })
    const [region, setRegion] = useState({
        name: '',
        id: ''
    })

    const validationSchema = yup.object().shape({
        name: yup.string().required('نام خود را وارد کنید'),
        lName: yup.string().required('نام خانوادگی خود را وارد کنید'),
        userName: yup.string().required('نام کاربری خود را وارد کنید'),
        tell: yup.string().required('شماره ثابت خود را وارد کنید'),
        code: yup.string().matches(props.route.params.code, 'کد وارد شده اشتباه است')
            .required('کد تایید خود را وارد کنید')
    })

    const { data, doFetch, loading } = useFetch('guest/signup', true);
    useMemo(() => {
        if (isSet(data)) {
            if (data.res !== 1) {
            } else {
                if (isSet(data.data.country)) setModal(!modal)
                if (isSet(data.data.province)) setModal(!modal)
            }
        }
    }, [data])

    const { data: dataCity, doFetch: doCity } = useFetch('guest/getcity', true);
    useMemo(() => {
        if (isSet(dataCity)) {
            if (data.res !== 1) {
            } else {
                if (isSet(dataCity.data)) setModal(!modal)
            }
        }
    }, [dataCity])



    const { data: dataRegion, doFetch: doRegion } = useFetch('guest/getregion', true);
    useMemo(() => {
        if (isSet(dataRegion)) {
            if (data.res !== 1) {
            } else {
                if (typeof data.data.country !== 'undefined' && data.data.country.length !== 0) setModal(!modal)
            }
        }
    }, [dataRegion])

    const { data: signup, doFetch: request, loading: loading2 } = useFetch('guest/signup', true);
    useMemo(() => {
        if (isSet(signup)) {
            if (signup.res !== 1) {
                ErrorMassages(data.msg)
            } else {
                setStore('@auth_key', signup.data.user.auth_key)
                SET_KEY(signup.data.user.auth_key)
                navigation.navigate('user', { screen: 'Main' })
            }
        }
    }, [signup])


    const Items = ({ data, onPress }) => {
        return (
            <FlatList
                data={data} renderItem={({ item }) => {
                    return (
                        <Ripple onPress={() => {
                            onPress(item)
                            setModal(!modal)
                        }} style={styles.modal.country.textContainer} >
                            {
                                position == 'country' ?
                                    <Text style={{ ...styles.modal.country.text, textDecorationLine: 'underline' }}>+{item.id}</Text> : null
                            }

                            <Text style={styles.modal.country.text}>{item.name}</Text>
                        </Ripple>
                    )
                }}
                keyExtractor={(item, index) => item.id + index} />
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Blue} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>ثبت نام</Text>
            </View>
            <Formik validationSchema={validationSchema}
                initialValues={{
                    name: '',
                    lName: '',
                    userName: '',
                    tell: '',
                    code: '',
                    idInstagram: ''
                }} onSubmit={(values, { setSubmitting }) => {
                    let required = 0;
                    if (typeof country !== 'undefined' || typeof province !== 'undefined' || typeof city !== 'undefined' || typeof region !== 'undefined') {
                        if (country.id == '') {
                            ToastAndroid.showWithGravity(
                                'کشور را انتخاب کنید',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            )
                            required++;
                            return;
                        }
                        if (province.id == '') {
                            ToastAndroid.showWithGravity(
                                'استان را انتخاب کنید',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            )
                            required++;
                            return;
                        }
                        if (city.id == '') {
                            ToastAndroid.showWithGravity(
                                'شهر را انتخاب کنید',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM
                            )
                            required++;
                            return;

                        }
                        //     if (region.id == '') {
                        //         ToastAndroid.showWithGravity(
                        //             'منطقه را انتخاب کنید',
                        //             ToastAndroid.SHORT,
                        //             ToastAndroid.BOTTOM
                        //         )
                        //         received ++;
                        // }
                    }
                    if (required == 0) {
                        request({
                            name: values.name,
                            lName: values.lName,
                            userName: values.userName,
                            tell: values.tell,
                            mobile: props.route.params.mobile,
                            role: 'user',
                            idCountry: country.id,
                            idProvince: province.id,
                            idCity: city.id,
                            idRegion: region.id,
                            nameImage: '',
                            codeSms: values.code,
                        })
                    }
                    setSubmitting(false)
                }}>
                {
                    ({
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        values
                    }) => (

                        <Animatable.View
                            animation="fadeInUpBig"
                            style={[styles.footer, {
                                backgroundColor: White
                            }]}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.imagePicker.container}>
                                    <Button
                                        title={'انتخاب عکس'}
                                        style={{ paddingHorizontal: 30 }}
                                        textStyle={{ fontSize: RFValue(10) }}
                                    />
                                    <View style={{ ...styles.imagePicker.image, width: width / 4, height: width / 4, }}>
                                        <FontAwesome name='photo' type='FontAwesome' size={RFValue(35)} />
                                    </View>
                                </View>
                                <Text_input
                                    title={'نام'}
                                    value={values.name}
                                    onBlur={handleBlur('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder='نام'
                                    error={errors.name}
                                    touched={touched.name}
                                    icon={() => <AntDesign name='user' size={25} />}
                                />
                                <Text_input
                                    title={'نام خانوادگی'}
                                    value={values.lName}
                                    onBlur={handleBlur('lName')}
                                    onChangeText={handleChange('lName')}
                                    placeholder='نام خانوادگی'
                                    error={errors.lName}
                                    touched={touched.lName}
                                    icon={() => <AntDesign name='user' size={25} />}
                                />
                                <Text_input
                                    title={'نام کاربری'}
                                    value={values.userName}
                                    onBlur={handleBlur('userName')}
                                    onChangeText={handleChange('userName')}
                                    placeholder='نام کاربری'
                                    error={errors.userName}
                                    touched={touched.userName}
                                    icon={() => <AntDesign name='user' size={25} />}
                                />
                                <Text_input
                                    title={'تلفن ثابت'}
                                    value={values.tell}
                                    onBlur={handleBlur('tell')}
                                    onChangeText={handleChange('tell')}
                                    placeholder='تلفن ثابت'
                                    error={errors.tell}
                                    touched={touched.tell}
                                    icon={() => <AntDesign name='user' size={25} />}
                                />
                                <Text_input
                                    title={'کد تایید'}
                                    value={values.code}
                                    onBlur={handleBlur('code')}
                                    onChangeText={handleChange('code')}
                                    placeholder='کد تایید'
                                    error={errors.code}
                                    touched={touched.code}
                                    icon={() => <MaterialIcons name='verified-user' size={25} />}
                                />
                                <Text_input
                                    title={'آیدی اینستاگرام'}
                                    value={values.idInstagram}
                                    onBlur={handleBlur('idInstagram')}
                                    onChangeText={handleChange('idInstagram')}
                                    placeholder='آیدی اینستاگرام'
                                    error={errors.idInstagram}
                                    touched={touched.idInstagram}

                                    icon={() => <AntDesign name={'instagram'} size={25} />}
                                />
                                <View style={{ marginTop: 25 }}>
                                    {/* کشور */}
                                    <DropDown onPress={() => {
                                        doFetch()
                                        setPosition('country')
                                    }}
                                        selected={country}
                                        placeholder={'کشور'}
                                    />



                                    {/* استان */}
                                    {
                                        country.name != '' ?
                                            <DropDown
                                                onPress={() => {
                                                    setPosition('province')
                                                    doFetch()
                                                }}
                                                selected={province}
                                                placeholder={'استان'}
                                            /> : null
                                    }



                                    {/* شهر */}
                                    {
                                        dataCity.length !== 0 ?
                                            <DropDown
                                                onPress={() => {
                                                    setPosition('city')
                                                    doCity({
                                                        idProvince: province.id
                                                    })
                                                }}
                                                selected={city}
                                                placeholder={'شهر'}
                                            /> : null
                                    }



                                    {/* منطقه */}
                                    {
                                        dataRegion.length !== 0 ?
                                            <DropDown
                                                onPress={() => {
                                                    setPosition('region')
                                                    doRegion()
                                                }}
                                                selected={region}
                                                placeholder={'منطقه'}
                                            /> : null
                                    }
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity
                                        style={styles.signIn}
                                        onPress={handleSubmit}
                                    >
                                        <LinearGradient
                                            colors={['#85c2f3', Blue]}
                                            style={styles.signIn}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>ثبت نام</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </Animatable.View>
                    )
                }
            </Formik>
            <Modal visible={modal} animationType={'fade'} transparent>
                <Pressable onPress={() => setModal(!modal)} style={styles.modal.modalConatiner} />
                {
                    isSet(data.data) &&
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.modal.country.itemContainer}>
                            {
                                isSet(data.data) &&
                                    position == 'country' ?
                                    <Items data={data.data.country}
                                        onPress={item => {
                                            setCountry({ name: item.name, id: item.id })
                                            setPosition('province')
                                            doFetch()
                                        }}
                                    />
                                    :
                                    position == 'province' ?
                                        <Items data={data.data.province}
                                            onPress={item => {
                                                setProvince({ name: item.name, id: item.id })
                                                doCity({
                                                    idProvince: item.id
                                                })
                                                setPosition('city')
                                            }}
                                        />
                                        :
                                        position == 'city' ?
                                            <Items data={dataCity.data}
                                                onPress={item => {
                                                    setCity({ name: item.name, id: item.id })
                                                    if (item.name == 'تهران') {
                                                        doRegion({
                                                            idCity: item.id
                                                        })
                                                    }
                                                }}
                                            />
                                            :
                                            position == 'region' ?
                                                <Items data={dataRegion.data}
                                                    onPress={item => {
                                                        setRegion({ name: item.name, id: item.id })
                                                    }}
                                                /> : null
                            }

                        </View>

                    </View>
                }

            </Modal>

            <Modal visible={loading2}>
                <Loading />
            </Modal>
        </View>
    );
}




export default React.memo(Content_SignUp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Blue
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        // fontWeight: 'bold',
        fontFamily: 'BYekan',
        fontSize: RFValue(30)
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: RFValue(18),
        // fontWeight: 'bold'
        fontFamily: 'BYekan'
    },
    modal: {
        modalConatiner: {
            position: 'absolute',
            backgroundColor: '#dbdbdb',
            width: '100%', height: '100%', opacity: 0.5
        },
        country: {
            itemContainer: {
                marginHorizontal: 20,
                marginVertical: 50, borderRadius: 15,
                backgroundColor: White, elevation: 15
            },
            textContainer: {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            },
            text: {
                fontSize: RFValue(20),
                textAlign: 'center',
                fontFamily: 'BYekan',
                color: Black
            }
        }
    },
    imagePicker: {
        container: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 20
        },
        image: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: WhiteSmoke,
            borderRadius: 15
        },
        ripple: {
            backgroundColor: Blue,
            paddingHorizontal: 15,
            // paddingVertical:2,
            borderRadius: 15
        },
        rippleText: {
            color: White,
            fontFamily: 'BYekan'
        }

    }
})