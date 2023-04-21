import React, { useState } from "react";
import { Dimensions, Image, Modal, PixelRatio, Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { Black, Blue, White } from "../../InitialValue/Colors";
import { useNavigation } from "@react-navigation/native";
import TextTicker from 'react-native-text-ticker'
import { Style } from "../../Common/Style";
import Ripple from "react-native-material-ripple";
import { RFValue } from 'react-native-responsive-fontsize'
import { isSet } from "../../Common";

const Width = Dimensions.get('window').width;

const Menu = ({ data, type }) => {
    const [register, setRegister] = useState(false);
    const { replace, navigate } = useNavigation();
    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{type == 'secondMenu' ? 'تغذیه' : 'ورزشی'}</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.contentContainer}>
                {
                    data.map((value, index) => {
                        return (
                            <Ripple onPress={() => {
                                if (isSet(value["screen"])) {
                                    if (value["screen"] == 'LivesTody') {
                                        navigate('user', { screen: 'Home', params: { screen: value["screen"] } })
                                    } else {
                                        if (value["screen"] == 'explore') {
                                            replace('user', { screen: 'instagram', params: { screen: value["screen"] } })
                                        } else {
                                            replace('user', {
                                                screen: value["screen"],
                                            })
                                        }
                                    }
                                }
                                else {
                                    ToastAndroid.showWithGravity(
                                        'این صفحه درحال آماده سازی می باشد ...',
                                        ToastAndroid.SHORT,
                                        ToastAndroid.BOTTOM
                                    )
                                }
                            }} key={index} rippleContainerBorderRadius={30}
                                style={{ ...styles.button, backgroundColor: type != 'secondMenu' ? 'rgba(200,228,255,1)' : 'rgba(212,212,212,1)' }}>
                                <Image resizeMode="contain" resizeMethod="resize" style={styles.image} source={value.image} />
                                {
                                    value.text.length > 15 ?
                                        <TextTicker duration={7000}
                                            bounce={false}
                                            isRTL
                                            animationType="scroll"
                                            shouldAnimateTreshold={40}
                                            repeatSpacer={100}
                                            loop
                                            marqueeDelay={2000} style={styles.text}>
                                            {value.text}
                                        </TextTicker> :
                                        <Text style={styles.text}>{value.text}</Text>
                                }
                                <View style={styles.opacity} />
                            </Ripple>
                        )
                    })
                }
            </View>
            <Modal visible={register} animationType={'fade'} transparent>
                <Pressable onPress={() => setRegister(!register)} style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ffffff",
                    opacity: 0.6,
                }} />
                <View style={Style.center}>
                    <View style={styles.modalContainer}>
                        <View style={{ ...Style.center }}>
                            <Text style={{ ...Style.menu.text, fontSize: RFValue(18) }}>مسیر ورزشی خود را انتخاب کنید</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={Style.center}>
                                <Pressable style={styles.modalPressable}>
                                    <Text style={Style.menu.text}>حضوری</Text>
                                </Pressable>
                            </View>
                            <View style={Style.center}>
                                <Pressable onPress={() => navigation.navigate('Stack', { screen: 'Person' })} style={styles.modalPressable}>
                                    <Text style={Style.menu.text}>آنلاین</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export { Menu }

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '45%',
        margin: 5,
        elevation: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        overflow: 'hidden'
    },
    line: {
        backgroundColor: Black,
        height: 0.5,
        width: '50%',
        alignSelf: 'center',
        margin: 10
    },
    opacity: {
        position: 'absolute',
        borderRadius: 200,
        backgroundColor: White,
        width: 150,
        height: 150,
        left: -60,
        bottom: -60,
        opacity: 0.2
    },
    modalPressable: {
        backgroundColor: '#F4F4F4',
        elevation: 10,
        width: '70%',
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 55,
        height: 55
    },
    sepratorImage: {
        width: '50%',
        height: 50,
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(18),
        color: Black,
        marginTop: 25
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 20
    },
    modalContainer: {
        backgroundColor: White,
        elevation: 20,
        borderRadius: 30,
        width: Width - 100,
        height: Width / 1.5
    },
    text: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Black,
        marginRight: 10,
    }
})