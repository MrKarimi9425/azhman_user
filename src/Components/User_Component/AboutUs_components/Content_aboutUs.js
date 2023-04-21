import { Dimensions, Image, Linking, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useContext } from 'react'
import { Black, Main, White } from '../../InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { Context } from '../../../Storage/Context';

let { width } = Dimensions.get('screen');


const Content_aboutUs = () => {
    const { width } = useWindowDimensions();
    const { version, checkVersion } = useContext(Context)
    return (
        <View style={styles.container}>
            <View style={{ height: width / 2, width: width }}>
                <Image source={require('../../../assets/images/logo.png')}
                    resizeMode={'contain'} resizeMethod={'resize'}
                    style={styles.image} />
            </View>
            <Text style={styles.titleText}>درباره آژمان</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.textBody}>آینده سازان آژمان {"\n"}
                    طراح  سامانه آنلاین آژمان به عنوان اولین سامانه پخش اختصاصی ویدیو زنده در ایران{"\n"}{"\n"}
                    آموزش دهنده های محترم{"\n"}
                    میتوانند برای داشتن پنل اختصاصی و پخش زنده آموزش های خود با متخصصین شرکت در ارتباط باشند
                    در این پنل میتوانید :
                    {"\n"}- تمامی امور ثبت نام آنلاین و آفلاین خود را به این سامانه بسپارید
                    {"\n"}- پخش زنده تمامی آموزش های خود
                    {"\n"}- هیچ محدودیتی در زمان لایو نمی باشد
                    {"\n"}- تعریف انواع دوره
                    {"\n"}- طراحی فرم های سوالات از شاگردان در زمان ثبت نام یا هر زمان دیگری{"\n"}
                    {"\n"}قوانین انتشار ویدئو
                    {"\n"}- تمامی ویدئو های منتشر شده در اپلیکیشن و سایت آژمان، متعلق به تیم توسعه دهنده و شرکت آژمان است و با رضایت کامل مربی ها منتشر شده اند{"\n"}
                </Text>
                <Text style={styles.contactText}>جهت هرگونه ارتباط با شماره
                    <Text style={{ ...styles.contactText, color: Main, fontSize: RFValue(20) }}>
                        {"\n"}09191761030{"\n"}
                    </Text>
                    تماس بگیرید
                </Text>
            </View>
            <Text style={styles.othertext}>نسخه {version}</Text>
            {
                checkVersion.version != version ?
                    <Text onPress={() => Linking.openURL(checkVersion.url)} style={{ ...styles.othertext, color: 'red' }}>نسخه قدیمی {'\n'}(برای بروزرسانی کلیک کنید)</Text> :
                    <Text style={{ ...styles.othertext, color: 'green' }}>آخرین نسخه</Text>
            }
            <Text onPress={() => Linking.openURL(('https://azhman.online/site/policy'))}
                style={{ ...styles.othertext, color: 'green', fontSize: RFValue(25) }}>قوانین و مقررات آژمان</Text>

        </View>
    )
}

export { Content_aboutUs }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20
    },
    contentContainer: {
        borderRadius: 30,
        padding: 20,
        elevation: 8,
        backgroundColor: White,
    },
    titleText: {
        fontFamily: 'BYekan',
        fontSize: RFValue(20),
        color: Main,
        margin: 15,
        alignSelf: 'center'
    },
    textBody: {
        fontFamily: 'BYekan', fontSize: RFValue(14), color: Black, lineHeight: 40
    },
    image: {
        width: '100%',
        height: '100%'
    },
    contactText: {
        fontFamily: 'BYekan',
        fontSize: RFValue(15),
        color: Black,
        textAlign: 'center',
        lineHeight: 40
    },
    othertext: {
        margin: 10,
        fontFamily: 'BYekan',
        textAlign: 'center'
    }
})