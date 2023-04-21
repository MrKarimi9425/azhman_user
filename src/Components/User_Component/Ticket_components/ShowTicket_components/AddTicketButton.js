import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Blue, White } from '../../../InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AddTicketButton = (props) => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate('user', { screen: 'Add_Ticket', params: { idCoach: props.route.params.idCoach } })} style={styles.addTicketButton}>
            <MaterialCommunityIcons name={"email-plus-outline"} size={RFValue(24)} style={styles.icon} />
        </TouchableOpacity>
    )
}

export { AddTicketButton }

const styles = StyleSheet.create({
    addTicketButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: Blue,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        color: White
    }
})