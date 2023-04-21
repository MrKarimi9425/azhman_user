import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Black } from '../../InitialValue/Colors'
import * as Animatable from 'react-native-animatable';

const Text_input = ({
    title,
    onChangeText,
    placeholder,
    keyboardType,
    value,
    onBlur,
    error,
    touched,
    icon = () => { }
}) => {
    return (
        <>
            <Text style={styles.text_footer}>{title}</Text>
            <View style={styles.action}>

                <TextInput
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    textAlign='center'
                    onBlur={onBlur}
                    style={[styles.textInput, {
                        color: Black
                    }]}
                />
                {
                    icon()
                }
            </View>
            {
                (error && touched) &&
                <Animatable.View animation="fadeInRight" duration={500}>
                    <Text style={styles.errorMsg}>{error}</Text>
                </Animatable.View>
            }
        </>

    )
}

export { Text_input }

const styles = StyleSheet.create({
    text_footer: {
        color: '#05375a',
        fontSize: RFValue(14),
        fontFamily: 'BYekan',
        marginTop: 20,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: Black,
        fontFamily: 'BYekan'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: RFValue(10),
        fontFamily: 'BYekan'
    },
})