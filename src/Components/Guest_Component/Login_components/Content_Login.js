import { Alert, Dimensions, Image, Linking, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { Black, Blue, Gray, White } from '../../InitialValue/Colors'
import { Formik } from 'formik';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { ErrorMassages } from '../../Common/ErrorMassages';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, Input, isSet, Loading, useFetch } from '../../Common';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'



const validationSchema = yup.object().shape({
    phoneNumber: yup.string().matches('^(\\+98?)?{?(09[0-9]{9,9}}?)$', 'شماره تلفن وارد شده اشتباه است')
        .required('شماره خود را وارد کنید')
})


const Content_Login = (props) => {
    const { width, height } = useWindowDimensions()
    const { navigate } = useNavigation()
    const { data, doFetch, loading } = useFetch('guest/getmobile', true);
    useEffect(() => {
        if (isSet(data)) {
            if (data.res !== 1) {
                ErrorMassages(data.msg)
            } else if (data.data.exist !== 0) {
                navigate('Code', { code: data.data.codeSms, mobile: data.data.mobile })
            } else {
                navigate('SignUp', { code: data.data.codeSms, mobile: data.data.mobile })
            }
        }
    }, [data])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Blue} barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.text_header}>به آژمان خوش آمدید ...</Text>
            </View>
            <Formik validationSchema={validationSchema} initialValues={{ phoneNumber: '' }} onSubmit={(values, { setSubmitting }) => {
                doFetch({ mobile: values.phoneNumber })
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
                            <Text style={styles.text_footer}>شماره تلفن</Text>
                            <View style={styles.action}>

                                <TextInput
                                    onChangeText={handleChange("phoneNumber")}
                                    placeholder="شماره تلفن"
                                    keyboardType={'decimal-pad'}
                                    value={values.phoneNumber}
                                    textAlign='center'
                                    onBlur={handleBlur("phoneNumber")}
                                    style={[styles.textInput, {
                                        color: Black
                                    }]}
                                />
                                <Entypo
                                    name='phone'
                                    color={Black}
                                    size={RFValue(20)}
                                />
                            </View>
                            {
                                (errors.phoneNumber && touched.phoneNumber) &&
                                <Animatable.View animation="fadeInRight" duration={500}>
                                    <Text style={styles.errorMsg}>{errors.phoneNumber}</Text>
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
                                        }]}>ورود</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.policyText}>
                                شرایط
                                <Text onPress={() => Linking.openURL('https://azhman.online/site/policy')} style={{ ...styles.policyText, color: Blue, textDecorationLine: 'underline' }}> قوانین و مقررات </Text>و
                                <Text onPress={() => Linking.openURL('https://azhman.online/site/privacy')} style={{ ...styles.policyText, color: Blue, textDecorationLine: 'underline' }}> حریم خصوصی </Text>
                                را میپذیرم
                            </Text>
                        </Animatable.View>
                    )
                }
            </Formik>
            <Modal visible={loading}>
                <Loading />
            </Modal>
        </View>
    );
}

export default React.memo(Content_Login)

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
        fontSize: RFValue(25)
    },
    text_footer: {
        color: '#05375a',
        fontSize: RFValue(16),
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
    },
    policyText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        textAlign: 'center',
        margin: 10
    }
});