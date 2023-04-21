import React, { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { WhiteSmoke } from '../../Components/InitialValueColors';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Blue, Main } from '../InitialValue/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = (props) => {
    const { replace } = useNavigation();
    return (
        <View style={styles.container}>
            <Ripple onPress={() => replace('user', {
                screen: 'Main'
            })} rippleContainerBorderRadius={50}>
                <Fontisto name={'home'} size={RFValue(25)} style={styles.icon} />
            </Ripple>
            <Ripple onPress={() => props.navigation.openDrawer()} style={styles.pressable}>
                <AntDesign name={'appstore1'} size={RFValue(25)} style={styles.icon2} />
            </Ripple>
        </View>
    )
}
export { Header }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    icon: {
        padding: 8,
        color: Blue
    },
    icon2: {
        padding: 2,
        color: Blue
    },
    pressable: {
        borderRadius: 100,
        justifyContent: 'center',
    }
})
