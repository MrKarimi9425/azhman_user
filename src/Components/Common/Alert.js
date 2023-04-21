import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Pressable,
    LayoutAnimation,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Context } from "../../Storage/Context";
import { Black, White } from "../InitialValue/Colors";
import { Button, isSet } from "./index";

const Alert = ({ type, title, message, onPress }) => {
    const { alertConfig, closeAlert } = useContext(Context);
    const [message2] = useState([])
    let image;
    let buttonColor;

    switch (type) {
        case 'warning':
            image = require('../../assets/images/Warning.png');
            buttonColor = '#FFD200';
            break;
        case 'success':
            image = require('../../assets/images/Success.png');
            buttonColor = '#13FF56';
            break;
        case 'error':
            image = require('../../assets/images/Error.png')
            buttonColor = '#FF8A8B';
            break;
        default:
            break;
    }

    useEffect(() => {
        if (Array.isArray(message)) {
            for (let i = 0; i < message.length; i++) {
                message2.push(message[i] + '\n')
            }
        }
    }, [])

    return (
        <Modal visible={alertConfig.visible} animationType={"fade"} transparent>
            <View style={styles.container}>
                {/* {
                    LayoutAnimation.configureNext({
                        duration: 400,
                        create: {
                            type: LayoutAnimation.Types.spring,
                            property: LayoutAnimation.Properties.scaleXY,
                            springDamping: 20
                        }
                    })
                } */}
                <View style={styles.contentContainer}>
                    <Image source={image} style={{ width: 120, height: 120 }} resizeMode={'stretch'} />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}>{title}</Text>

                        {
                            Array.isArray(message) ?
                                isSet(message) && message.map(value => {
                                    return (
                                        <Text style={styles.bodyText}>{value}</Text>
                                    )
                                }) :
                                <Text style={styles.bodyText}>{message}</Text>
                        }

                    </View>
                    <Button
                        onPress={() => {
                            closeAlert();
                        }}
                        buttonStyle={{ margin: 20 }}
                        backgroundColor={buttonColor}
                        title={'باشه'}
                    />
                </View>
            </View>
        </Modal>
    )
}

export { Alert }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentContainer: {
        backgroundColor: White,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        // width: '40%',
        borderRadius: 30,
        elevation: 5
    },
    title: {
        fontSize: RFValue(20),
        color: Black,
        fontFamily: "BYekan",
    },
    bodyText: {
        fontSize: RFValue(14),
        color: "black",
        fontFamily: "BYekan",
        textAlign: 'center'
    },
})