import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Black } from '../../InitialValue/Colors'

const Text_input = ({
    title,
    onChangeText,
    placeholder,
    keyboardType,
    value,
    numberOfLines = 1,
    onBlur,
    error,
    touched,
    style = {},
    icon = function () { }
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
                    numberOfLines={numberOfLines}
                    textAlign='center'
                    onBlur={onBlur}
                    style={[styles.textInput, {
                        color: Black
                    }, style]}
                />
                {
                    icon()
                }
            </View>
            {
                (error && touched) &&
                <View>
                    <Text style={styles.errorMsg}>{error}</Text>
                </View>
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