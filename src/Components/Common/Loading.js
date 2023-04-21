import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { Style, White } from "./Style";

const Loading = () => {
    const { width } = useWindowDimensions()
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/Blocks-1s-200px.gif")}
                style={{ width: width / 5 }}
                resizeMode="contain"
                resizeMethod="resize"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export {Loading}