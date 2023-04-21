import React from "react";
import { View, TextInput, ToastAndroid, StyleSheet, Text,StyleProp } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Black } from "../../../Components/InitialValue/Colors";

const Input = ({ 
    errors, 
    touched,
    values,
    handleChange, 
    handleBlur, 
    placeholder, 
    keyboardType = 'default',
    text,style = StyleProp
}) => {
    return (
        <View style={{...styles.container,...style}}>
            <Text style={styles.title}>{text}</Text>
            <TextInput
                onChangeText={handleChange}
                placeholder={placeholder}
                keyboardType={keyboardType}
                textAlign={"center"}
                value={values}
                onBlur={handleBlur}
                style={styles.textInput} />
        </View>
    );
};
export default React.memo(Input)

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: '100%',
        alignSelf: 'center'
    },
    textInput: {
        borderBottomWidth: 1,
        fontFamily:'BYekan'
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        // marginRight:15
        color:Black
    },
})