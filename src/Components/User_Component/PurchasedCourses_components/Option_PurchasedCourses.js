import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Black } from '../../InitialValue/Colors'

const Option_PurchasedCourses = ({ image, title, text }) => {
    return (
        <View style={styles.option}>
            <Image resizeMode='contain' resizeMethod='resize' style={styles.imageOption} source={image} />
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
                {title}
            </Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={{ ...styles.text, marginVertical: 5 }}>
                {text}
            </Text>
        </View>
    )
}

export default React.memo(Option_PurchasedCourses)

const styles = StyleSheet.create({
    imageOption: {
        width: 40,
        height: 40
    },
    option: {
        alignItems: 'center',
        padding: 5,
        width: '25%'
    },
    text: {
        fontSize: RFValue(10),
        color: Black,
        fontFamily: 'BYekan',
    },
})