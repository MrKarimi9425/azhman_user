import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { White } from '../../InitialValue/Colors'

const Search = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/images/search.png')} />
            <TextInput style={styles.textInput}/>
        </View>
    )
}

export {Search}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:30,
        marginTop:20,
        backgroundColor: White,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
        borderRadius:100,
        elevation:5
    },

    textInput:{
        width:'80%'
    }
})