import { Dimensions, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { Black, Blue, Gray, White } from '../../InitialValue/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from "yup";
import { ErrorMassages, text } from '../../Common/ErrorMassages';
import { setStore } from '../../../Storage/Async';
import * as Animatable from 'react-native-animatable';
import { Context } from '../../../Storage/Context';
import { Button, Input, isSet, Loading, useFetch } from '../../Common';
import LinearGradient from 'react-native-linear-gradient';


const Content_SmsCode = (props) => {
    const navigation = useNavigation()
    const { SET_KEY } = useContext(Context)
    const { width, height } = useWindowDimensions()

    const { data, doFetch, loading } = useFetch('guest/login_by_code', true);


    const validationSchema = yup.object().shape({
        code: yup.string().matches(props.route.params.code, 'کد وارد شده اشتباه است')
            .required('کد تایید خود را وارد کنید')
    })


    useMemo(() => {
        if (isSet(data)) {
            if (data.res !== 1) {
                ErrorMassages(data.msg)
            } else {
                setStore('@auth_key', data["data"]["auth_key"])
                SET_KEY(data["data"]["auth_key"])
                navigation.navigate('user', { screen: 'Main' })
            }
        }
    }, [data])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Blue} barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.text_header}>تایید شماره تلفن</Text>
            </View>
            <Formik validationSchema={validationSchema} initialValues={{ code: '' }} onSubmit={(values, { setSubmitting }) => {
                doFetch({ code: values.code, mobile: props.route.params.mobile })
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
                            <Text style={[styles.text_footer, {
                                color: Black
                            }]}>کد تایید</Text>
                            <View style={styles.action}>

                                <TextInput
                                    onChangeText={handleChange("code")}
                                    placeholder="کد تایید"
                                    keyboardType={'decimal-pad'}
                                    value={values.code}
                                    textAlign='center'
                                    onBlur={handleBlur("code")}
                                    style={[styles.textInput, {
                                        color: Black
                                    }]}
                                />
                                <MaterialCommunityIcons
                                    name='email-edit-outline'
                                    color={Black}
                                    size={RFValue(20)}
                                />
                            </View>
                            {
                                (errors.code && touched.code) &&
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>{errors.code}</Text>
                                </Animatable.View>
                            }




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
                                        }]}>تایید</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <Text onPress={() => navigation.goBack()} style={styles.forgettenText}>شماره تلفن را اشتباه وارد کردید؟</Text>


                        </Animatable.View>
                    )
                }
            </Formik>
            <Modal visible={loading}>
                <Loading />
            </Modal>
        </View>
    )
}


export default React.memo(Content_SmsCode)

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
    forgettenText: {
        fontFamily: 'BYekan',
        color: Gray,
        margin: 10,
        fontSize: RFValue(14)
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
    text_footer: {
        color: '#05375a',
        fontSize: RFValue(18),
        fontFamily: 'BYekan'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems: 'center'
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: Black,
        fontFamily: 'BYekan'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: RFValue(10),
        fontFamily: 'BYekan'
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
    }
});