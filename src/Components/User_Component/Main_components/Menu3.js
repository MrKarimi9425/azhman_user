import { Image, Linking, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { Black, White } from '../../InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import { isSet } from '../../Common';
import { baseUrl } from '../../Common/Address';

const Buttons = [
    {
        id: 1,
        text: 'درباره آژمان',
        image: require('../../../assets/images/logo.png'),
        screen: 'AboutUs'
    },
    {
        id: 2,
        text: 'کلاس های من',
        image: require('../../../assets/images/schedule.png'),
        screen: 'MyClasses'
    },
    {
        id: 3,
        text: 'فاکتور ها',
        image: require('../../../assets/images/paid.png'),
        screen: 'UserFactorList'
    },
    // {
    //     id: 4,
    //     text: 'ارتباط با مدیران',
    //     image: require('../../../assets/images/manager.png'),
    //     screen: null
    // },

]

const Menu3 = () => {
    const { replace } = useNavigation();

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>آژمان</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.container}>
                {
                    Buttons.map((value, index) => {
                        return (
                            <Ripple onPress={() => {
                                if (isSet(value["screen"])) {
                                    if (value["screen"] == 'AboutUs') {
                                        Linking.openURL(`${baseUrl}/site/about`)
                                    }else
                                    replace('user', {
                                        screen: value["screen"],
                                    })
                                }
                                else {
                                    ToastAndroid.showWithGravity(
                                        'این صفحه درحال آماده سازی می باشد ...',
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM
                                    )
                                }
                            }} rippleContainerBorderRadius={20} key={index} style={styles.button}>
                                <Image source={value.image} style={styles.image} />
                                <Text adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={styles.text}>{value.text}</Text>
                            </Ripple>
                        )
                    })
                }
            </View>
        </>
    )
}

export { Menu3 }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: White,
        justifyContent: 'space-evenly',
        width: 120,
        height: 120,
        borderRadius: 15,
        alignItems: 'center',
        margin: 10,
        elevation: 5
    },
    image: {
        width: '50%',
        height: '50%'
    },
    text: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Black
    },
    sepratorImage: {
        width: '50%',
        height: 50,
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(18),
        color: Black
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    line: {
        backgroundColor: Black,
        height: 0.5,
        width: '50%',
        alignSelf: 'center',
        margin: 10
    },
})