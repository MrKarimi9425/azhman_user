import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Pressable, LayoutAnimation, useWindowDimensions } from "react-native";
import { Blue, White } from "../../InitialValue/Colors";
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Header = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => { }} style={styles.pressable}>
                <FontAwesome5 size={RFValue(25)} name={'user-alt'} style={styles.icon} />
            </Pressable>
            <Pressable onPress={() => navigation.openDrawer()} style={styles.pressable}>
                <AntDesign size={RFValue(25)} name={'appstore1'} style={styles.icon} />
            </Pressable>
        </View>
    )
}

export { Header }

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    icon: {
        padding: 2,
        color: Blue
    },
    pressable: {
        borderRadius: 100,
        justifyContent: 'center',
    }
})
