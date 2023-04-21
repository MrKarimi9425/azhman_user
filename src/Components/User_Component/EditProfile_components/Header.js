import React, { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFValue } from 'react-native-responsive-fontsize';
import { White, Blue } from '../../InitialValue/Colors';

const Header = (props) => {
    const { replace } = useNavigation();
    return (
        <View style={styles.container}>
            <Ripple onPress={() => replace('user', {
                screen: 'Main'
            })} rippleContainerBorderRadius={50}>
                <Fontisto  size={RFValue(25)} name={'home'} style={styles.icon} />
            </Ripple>
            <Ripple onPress={() => props.navigation.openDrawer()} style={styles.pressable}>
                <AntDesign size={RFValue(25)}  name={'appstore1'} style={styles.icon2} />
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
        backgroundColor: Blue
    },
    icon: {
        padding: 8,
        color: White
    },
    icon2: {
        padding: 2,
        color: White
    },
    pressable: {

        borderRadius: 100,
        justifyContent: 'center',
    }
})
