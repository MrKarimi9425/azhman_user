import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ripple from 'react-native-material-ripple'
import { Black, WhiteSmoke } from '../../Components/InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DropDown = ({ onPress, selected = null, placeholder }) => {


    const name = selected.name != '' ? selected.name : placeholder;
    // console.log('selected55',selected)
    // const placeholder =  received == false ? (
    //     <Text style={styles.text}>انتخاب کنید</Text>
    // ) :
    // received == true ? (
    //     <View style={styles.notConnect}>
    //         <ActivityIndicator color={Black}/>
    //         <Text style={styles.text}>صبر کنید</Text>
    //     </View>
    // ) : null



    return (
        <View>
            <Ripple onPress={onPress} style={styles.dropDown}>
                <View style={styles.icon}>
                    <AntDesign name='down' size={RFValue(15)} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </Ripple>
        </View>
    )
}

export { DropDown }

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'BYekan',
        color: Black,
        fontSize: 20
    },
    dropDown: {
        backgroundColor: WhiteSmoke,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10
    },
    icon: {
        padding: 5,

    },
    notConnect: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})