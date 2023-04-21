import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Black, Gray, White } from '../../../InitialValue/Colors'
import { Formik } from 'formik'

const Search = ({searchFilterFunction, search }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../../assets/images/search.png')} />
            <TextInput
                onChangeText={text => searchFilterFunction(text)}
                value={search}
                placeholderTextColor={Gray}
                placeholder={'نام مربی را وارد کنید'}
                style={styles.textInput} />
        </View >
    )
}

export { Search }

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 20,
        backgroundColor: White,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 100,
        elevation: 5,
        marginBottom: 10
    },
    textInput: {
        width: '80%',
        fontFamily: 'BYekan',
        color: Black
    }
})