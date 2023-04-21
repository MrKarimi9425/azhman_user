import { FlatList, Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import * as yup from "yup";
import { Black, Blue, Gray, White, WhiteSmoke } from '../../InitialValue/Colors';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Animatable from 'react-native-animatable'
import { RFValue } from 'react-native-responsive-fontsize';
import { Context } from '../../../Storage/Context';
import { Button, isSet, Library, Loading, useFetch } from '../../Common';
import LinearGradient from 'react-native-linear-gradient';
import { Text_input } from './Text_input';
import { windowWidth } from '../../../utils/Dimensions';
import { BallIndicator } from 'react-native-indicators';
import DropDown from './DropDown';
import { baseUrl, imageUrl } from '../../Common/Address';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Content_Analysis = (props) => {
    const { openAlert } = useContext(Context)
    const { data } = useFetch('analyzepro/add')
    const { data: submit, doFetch } = useFetch('analyzepro/add', true)

    const navigation = useNavigation()
    const [files, setFiles] = useState({
        photoOpposite: "",
        photoBack: "",
        photoRight: "",
        photoLeft: "",
        file: "",
        LoadingImageLeft: "none",
        LoadingImageFront: "none",
        LoadingImageRight: "none",
        LoadingImageBack: "none",
        LoadingImageOther: "none",
    })

    const [gender, setGender] = useState('')
    const [activityRate, setActivityRate] = useState('')

    const [dropDown] = useState({
        gender: [],
        activityRate: []
    })

    useEffect(() => {
        openAlert('warning', "لطفا با دقت بخوانید", "  در تکمیل اطلاعات دقت کنید چون قابل ویرایش نمی باشد تحت هیچ شرایط عکس قابل شناسایی بارگزاری نکنید در این صورت کلیه مسئولیت آن با شماست ، لازم به ذکر است اگر اطلاعات را کامل پر نکنید بسیاری از تجزیه و تحلیل های شما ناقص خواهد بود")
        if (isSet(data["data"])) {
            const dataGender = data["data"]["info"]["gender"];
            const dataActivityRate = data["data"]["info"]["activityRate"];

            Object.keys(dataGender).forEach((item, index) => {
                const label = Object.values(dataGender)
                dropDown.gender.push({ label: label[index], value: item })
            })

            Object.keys(dataActivityRate).forEach((item, index) => {
                const label = Object.values(dataActivityRate)
                dropDown.activityRate.push({ label: label[index], value: item })
            })
        }
    }, [data])


    useEffect(() => {
        if (isSet(submit)) {
            if (submit["res"] == 1) {
                console.log(submit)
                navigation.replace('user', { screen: 'Show_Analysis' })
            } else {
                openAlert('error', 'خطا', submit["msg"])
            }
        }
    }, [submit])

    const validationSchema = yup.object().shape({
        height: yup.string().required('قد خود را وارد کنید'),
        weight: yup.string().required('وزن خود را وارد کنید'),
        age: yup.string().required('سن خود را وارد کنید'),
    })


    const File = ({ text, type }) => {
        let display;
        switch (type) {
            case 'front':
                display = files.LoadingImageFront
                break;
            case 'back':
                display = files.LoadingImageBack
                break;
            case 'right':
                display = files.LoadingImageRight
                break;
            case 'left':
                display = files.LoadingImageLeft
                break;
            case 'file':
                display = files.LoadingImageOther
                break;
            default:
                break;
        }
        return (
            <Pressable onPress={() => filePicker(type)} style={styles.file}>
                <MaterialIcons name='insert-photo' size={RFValue(35)} style={{ color: Black }} />
                <Text style={styles.fileText}>{text}</Text>
                <BallIndicator size={25} color={Black} style={{ display: display }} />
            </Pressable>
        )
    }
    const UploadedImage = ({ image, type }) => {
        return (
            <Pressable onPress={() => filePicker(type)} style={styles.file}>
                <Image source={{ uri: `${baseUrl}${imageUrl}tmp/${image}` }}
                    resizeMode='contain'
                    resizeMethod='resize'
                    style={{ width: '100%', height: '100%' }}
                />
            </Pressable>
        )
    }

    const filePicker = (type) => {
        switch (type) {
            case 'front':
                setFiles(provFiles => ({ ...provFiles, LoadingImageFront: "flex" }))
                break;
            case 'left':
                setFiles(provFiles => ({ ...provFiles, LoadingImageLeft: "flex" }))
                break;
            case 'right':
                setFiles(provFiles => ({ ...provFiles, LoadingImageRight: "flex" }))
                break;
            case 'back':
                setFiles(provFiles => ({ ...provFiles, LoadingImageBack: "flex" }))
                break;
            case 'file':
                setFiles(provFiles => ({ ...provFiles, LoadingImageOther: "flex" }))
                break;
            default:
                break;
        }

        Library('photo').then(fileName => {
            switch (type) {
                case 'front':
                    if (typeof fileName["image"] !== 'undefined') {
                        setFiles(provFiles => ({ ...provFiles, photoOpposite: fileName["image"], LoadingImageFront: "none" }))
                    } else {
                        setFiles(provFiles => ({ ...provFiles, photoOpposite: "", LoadingImageFront: "none" }))
                    }
                    break;
                case 'left':
                    if (typeof fileName["image"] !== 'undefined') {
                        setFiles(provFiles => ({ ...provFiles, photoLeft: fileName["image"], LoadingImageLeft: "none" }))
                    } else {
                        setFiles(provFiles => ({ ...provFiles, photoLeft: "", LoadingImageLeft: "none" }))
                    }
                    break;
                case 'right':
                    if (typeof fileName["image"] !== 'undefined') {
                        setFiles(provFiles => ({ ...provFiles, photoRight: fileName["image"], LoadingImageRight: "none" }))
                    } else {
                        setFiles(provFiles => ({ ...provFiles, photoRight: "", LoadingImageRight: "none" }))
                    }
                    break;
                case 'back':
                    if (typeof fileName["image"] !== 'undefined') {
                        setFiles(provFiles => ({ ...provFiles, photoBack: fileName["image"], LoadingImageBack: "none" }))
                    } else {
                        setFiles(provFiles => ({ ...provFiles, photoBack: "", LoadingImageBack: "none" }))
                    }
                    break;
                case 'file':
                    if (typeof fileName["image"] !== 'undefined') {
                        setFiles(provFiles => ({ ...provFiles, file: fileName["image"], LoadingImageOther: "none" }))
                    } else {
                        setFiles(provFiles => ({ ...provFiles, file: "", LoadingImageOther: "none" }))
                    }
                    break;
                default:
                    break;
            }
        }).catch(error => {
            console.log('error', error)
        })
    }


    return (
        <LinearGradient colors={[Blue, White]} style={styles.container}>
            <StatusBar backgroundColor={Blue} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>ثبت اطلاعات بدنی جدید</Text>
            </View>
            <Formik validationSchema={validationSchema}
                initialValues={{
                    height: "",
                    weight: "",
                    age: "",
                    aroundWrist: "",
                    waist: "",
                    aroundArm: "",
                    aroundRhigh: "",
                    neck: "",
                    des: ""
                }} onSubmit={(values, { setSubmitting }) => {

                    // console.log({
                    //     height: values.height,
                    //     weight: values.weight,
                    //     age: values.age,
                    //     gender: gender,
                    //     activityRate: activityRate,
                    //     aroundWrist: values.aroundWrist,
                    //     waist: values.waist,
                    //     aroundArm: values.aroundArm,
                    //     aroundRhigh: values.aroundRhigh,
                    //     photoOpposite: files.photoOpposite,
                    //     photoBack: files.photoBack,
                    //     photoRight: files.photoRight,
                    //     photoLeft: files.photoLeft,
                    //     file: files.file,
                    //     neck: values.aroundNeck,
                    //     des: values.des,
                    //     sendData: 1
                    // })
                    doFetch({
                        height: values.height,
                        weight: values.weight,
                        age: values.age,
                        gender: gender,
                        activityRate: activityRate,
                        aroundWrist: values.aroundWrist,
                        waist: values.waist,
                        aroundArm: values.aroundArm,
                        aroundRhigh: values.aroundRhigh,
                        photoOpposite: files.photoOpposite,
                        photoBack: files.photoBack,
                        photoRight: files.photoRight,
                        photoLeft: files.photoLeft,
                        file: files.file,
                        neck: values.aroundNeck,
                        des: values.des,
                        sendData: 1
                    })
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
                            <>
                                <Text_input
                                    title={'قد'}
                                    value={values.height}
                                    keyboardType={'decimal-pad'}
                                    onBlur={handleBlur('height')}
                                    onChangeText={handleChange('height')}
                                    placeholder='قد'
                                    error={errors.height}
                                    touched={touched.height}
                                    icon={() => <MaterialCommunityIcons name='human-male-height' size={RFValue(20)} />}
                                />
                                <Text_input
                                    title={'وزن'}
                                    value={values.weight}
                                    keyboardType={'decimal-pad'}
                                    onBlur={handleBlur('weight')}
                                    onChangeText={handleChange('weight')}
                                    placeholder='وزن'
                                    error={errors.weight}
                                    touched={touched.weight}
                                    icon={() => <MaterialCommunityIcons name='weight-kilogram' size={RFValue(20)} />}

                                />
                                <Text_input
                                    title={'سن'}
                                    value={values.age}
                                    keyboardType={'decimal-pad'}
                                    onBlur={handleBlur('age')}
                                    onChangeText={handleChange('age')}
                                    placeholder='سن'
                                    error={errors.age}
                                    touched={touched.age}
                                    icon={() => <MaterialCommunityIcons name='weight-kilogram' size={RFValue(20)} />}

                                />
                                <DropDown title={'جنسیت'} items={dropDown.gender}
                                    value={gender} setValue={setGender} empty={'اطلاعاتی وجود ندارد'}
                                />
                                <Text style={{ fontFamily: 'BYekan', fontSize: RFValue(14), color: 'red' }}>
                                    ارسال اطلاعات پایین ضروری نیست و به هیچ وجه عکس قابل شناسایی نفرستید
                                </Text>
                                <Text_input
                                    title={'دور مچ دست'}
                                    keyboardType={'decimal-pad'}
                                    value={values.aroundWrist}
                                    onBlur={handleBlur('aroundWrist')}
                                    onChangeText={handleChange('aroundWrist')}
                                    placeholder='دور مچ دست'
                                    error={errors.aroundWrist}
                                    touched={touched.aroundWrist}
                                    icon={() => <MaterialCommunityIcons name='weight-kilogram' size={RFValue(20)} />}

                                />
                                <Text_input
                                    title={'دور کمر'}
                                    keyboardType={'decimal-pad'}
                                    value={values.waist}
                                    onBlur={handleBlur('waist')}
                                    onChangeText={handleChange('waist')}
                                    placeholder='دور کمر'
                                    error={errors.waist}
                                    touched={touched.waist}
                                    icon={() => <MaterialIcons name='fitness-center' size={RFValue(20)} />}
                                />
                                <Text_input
                                    title={'دور ران'}
                                    value={values.aroundRhigh}
                                    keyboardType={'decimal-pad'}
                                    onBlur={handleBlur('aroundRhigh')}
                                    onChangeText={handleChange('aroundRhigh')}
                                    placeholder='دور ران'
                                    error={errors.aroundRhigh}
                                    touched={touched.aroundRhigh}
                                    icon={() => <MaterialIcons name='fitness-center' size={RFValue(20)} />}

                                />
                                <Text_input
                                    title={'دور بازو'}
                                    value={values.aroundArm}
                                    keyboardType={'decimal-pad'}
                                    onBlur={handleBlur('aroundArm')}
                                    onChangeText={handleChange('aroundArm')}
                                    placeholder='دور بازو'
                                    error={errors.aroundArm}
                                    touched={touched.aroundArm}
                                    icon={() => <MaterialIcons name='fitness-center' size={RFValue(20)} />}

                                />
                                <Text_input
                                    title={'دور گردن'}
                                    keyboardType={'decimal-pad'}
                                    value={values.aroundNeck}
                                    onBlur={handleBlur('aroundNeck')}
                                    onChangeText={handleChange('aroundNeck')}
                                    placeholder='دور گردن'
                                    error={errors.aroundNeck}
                                    touched={touched.aroundNeck}
                                    icon={() => <MaterialIcons name='fitness-center' size={RFValue(20)} />}

                                />
                                <Text_input
                                    title={'توضیحات'}
                                    value={values.des}
                                    numberOfLines={5}
                                    onBlur={handleBlur('des')}
                                    onChangeText={handleChange('des')}
                                    placeholder='توضیحات'
                                    error={errors.des}
                                    touched={touched.des}
                                    icon={() => <MaterialIcons name='fitness-center' size={RFValue(20)} />}

                                />

                                <DropDown title={'چقدر فعالیت ورزشی دارید ?'} items={dropDown.activityRate}
                                    value={activityRate} setValue={setActivityRate} empty={'اطلاعاتی وجود ندارد'}
                                />

                                <View style={styles.fileContainer}>
                                    {
                                        files.photoOpposite !== "" ?
                                            <UploadedImage image={files.photoOpposite} type={'front'} /> :
                                            <File text={'عکس از جلو'} type={'front'} />
                                    }
                                    {
                                        files.photoLeft !== "" ?
                                            <UploadedImage image={files.photoLeft} type={'left'} /> :
                                            <File text={'عکس از چپ'} type={'left'} />
                                    }

                                    {
                                        files.photoRight !== "" ?
                                            <UploadedImage image={files.photoRight} type={'right'} /> :
                                            <File text={'عکس از راست'} type={'right'} />
                                    }
                                    {
                                        files.photoBack !== "" ?
                                            <UploadedImage image={files.photoBack} type={'back'} /> :
                                            <File text={'عکس از پشت'} type={'back'} />
                                    }
                                    {
                                        files.file !== "" ?
                                            <UploadedImage image={files.file} type={'file'} /> :
                                            <File text={'فایل آزمایش'} type={'file'} />
                                    }
                                </View>

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
                                        }]}>ثبت اطلاعات</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </>
                        </Animatable.View>
                    )
                }
            </Formik>
        </LinearGradient >
    );
}

export default React.memo(Content_Analysis)

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
        flex: 2,
        marginHorizontal: 20,
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
        fontSize: RFValue(20),
        textAlign: 'center'
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
        padding: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: RFValue(18),
        // fontWeight: 'bold'
        fontFamily: 'BYekan'
    },
    file: {
        width: windowWidth / 3, height: windowWidth / 3, margin: 5, backgroundColor: WhiteSmoke,
        justifyContent: 'center', overflow: 'hidden',
        alignItems: 'center', borderRadius: 20,

    },
    fileContainer: {
        flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', marginTop: 25
    },
    fileText: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Black
    }
})