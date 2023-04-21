import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { DropDown } from './DropDown'
import { Formik } from 'formik';
import { Black, Blue, Gray, White, WhiteSmoke } from '../../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input } from './Input';
import { isSet, useFetch } from '../../../Common';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../../../Storage/Context';
import { Uploads } from './Uploads';

const Content_AddTicket = ({ data, props }) => {
    const [sendTo, setSendTo] = useState(0);
    const { data: submitData, doFetch } = useFetch('ticket/add', true)
    const { replace } = useNavigation();
    const { openAlert } = useContext(Context);
    const [file, setFile] = useState({
        video: '',
        image: '',
        audio: '',
        document: ''
    })

    useEffect(() => {
        if (isSet(submitData)) {
            console.log('submitData', submitData)
            if (submitData.res == 1) {
                replace('user', { screen: 'List_Ticket' })
                openAlert('success', 'ثبت تیکت', 'تیکت با موفقیت ثبت شد')
            } else {
                openAlert('error', 'خطا در دریافت اطلاعات', submitData["msg"])
            }
        }
    }, [submitData])

    return (
        <View style={styles.container}>
            <DropDown
                title={'دسته:'}
                items={data}
                value={sendTo}
                setValue={setSendTo}
                empty={'اطلاعاتی وجود ندارد'}
            />
            <Formik initialValues={{ title: '', body: '' }} onSubmit={(values, { setSubmitting }) => {

                doFetch({
                    idReceiver: props.route.params.idCoach,
                    des: values.body,
                    title: values.title,
                    type: sendTo,
                    video: file.video,
                    document: file.document,
                    audio: file.audio,
                    image: file.image
                })
                setSubmitting(false)
            }}>
                {
                    ({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values
                    }) => (
                        <>
                            <Input title={'عنوان'}
                                handleBlur={handleBlur('title')}
                                handleChange={handleChange('title')}
                                value={values.title}
                                placeholder={'عنوان پیام'} />
                            <Input
                                title={'متن پیام'}
                                handleBlur={handleBlur('body')}
                                handleChange={handleChange('body')}
                                value={values.body}
                                placeholder={'متن پیام'}
                                multiline={true}
                                scrollEnabled={true}
                                numberOfLines={15} />
                            <Uploads setFile={setFile} file={file} />
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Text style={styles.buttontext}>ثبت تیکت</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </Formik>
        </View>
    )
}

export { Content_AddTicket }

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        color: Black,
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        marginTop: 15,
        margin: 5
    },
    textInput: {
        width: '100%',
        backgroundColor: White,
        elevation: 5,
        borderRadius: 10,
        alignSelf: 'center'
    },
    submitButton: {
        backgroundColor: Blue,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        marginTop: 15

    },
    buttontext: {
        fontSize: RFValue(14),
        color: White,
        fontFamily: 'BYekan',
    },
})