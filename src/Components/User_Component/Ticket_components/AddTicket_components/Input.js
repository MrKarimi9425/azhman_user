import React from "react";
import { View, TextInput, ToastAndroid, StyleSheet, Text } from "react-native";
import Ripple from "react-native-material-ripple";
import { RFValue } from "react-native-responsive-fontsize";
import { Black, Gray, White, WhiteSmoke } from "../../../../Components/InitialValue/Colors";
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Input = ({
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    placeholder,
    keyboardType = 'default',
    icon,
    style,
    title,
    numberOfLines,
    multiline = false,
    scrollEnabled = false
}) => {
    return (
        <View style={{ width: '100%' }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.container}>
                {
                    (errors && touched) &&
                    <Ripple onPress={() => {
                        ToastAndroid.showWithGravity(
                            errors,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        )
                    }}>
                        <AntDesign style={styles.icon} size={RFValue(20)} name={"exclamationcircleo"} />
                    </Ripple>
                }
                <View style={[styles.input, style]}>
                    <TextInput
                        numberOfLines={numberOfLines}
                        onChangeText={handleChange}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        value={values}
                        scrollEnabled={scrollEnabled}
                        multiline={multiline}
                        onBlur={handleBlur}
                        style={styles.textInput} />
                    {
                        (errors && touched) &&
                        <Animatable.View animation="fadeInRight" duration={500}>
                            <Text style={styles.errorMsg}>{errors}</Text>
                        </Animatable.View>
                    }
                </View>
            </View>
        </View>
    );
};
export { Input }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: Black,
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        marginTop: 15,
        margin: 5
    },
    input: {
        width: '100%',
        backgroundColor: White,
        elevation: 5,
        borderRadius: 10,
        alignSelf: 'center'
    },
    textInput: {
        width: '100%',
        fontFamily: 'BYekan',
    },
    icon: {
        padding: 5,
        color: 'red'
    }
})