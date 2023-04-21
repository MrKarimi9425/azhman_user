import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Black } from '../InitialValue/Colors'
import { isSet } from './isSet'

const EmptyPage = ({ text }) => {
    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={{ width: '70%', height: 200 }} source={require('../../assets/images/empty.png')} />
            {
                isSet(text) && text.map(value => {
                    return (
                        <Text style={styles.text}>{value}</Text>
                    )
                })
            }
        </View>
    )
}

export { EmptyPage }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 20
    },
    text: {
        color: Black,
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        marginTop: 20
    }
})