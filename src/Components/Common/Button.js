import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Blue, Main, White } from '../../Components/InitialValue/Colors';
import Ripple from 'react-native-material-ripple';

const Button = ({ type, title, onPress, style,
    textStyle,
    backgroundColor = null, buttonStyle = null }) => {
    let color;
    switch (type) {
        case 'important':
            color = Main
            break;
        case 'success':
            color = '#198754'
            break;
        case 'information':
            color = Blue
            break;
        case 'warning':
            color = '#FFC107'
            break;
        case 'danger':
            color = '#DC3545'
            break;
        default:
            color = Main
            break;
    }
    return (
        // <View style={{ ...styles.container, ...style }}>
        <Ripple onPress={onPress}
            style={{
                ...styles.pressable,
                backgroundColor: backgroundColor != null ? backgroundColor : color,
                ...style,
            }}>
            <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
        </Ripple>
        // </View>
    )
}

export { Button }

const styles = StyleSheet.create({
    container: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressable: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 4,
        alignItems: 'center',
        // width: '40%',
        borderRadius: 5,
        margin: 20
    },
    text: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: White
    }
})