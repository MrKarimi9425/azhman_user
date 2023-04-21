import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, isSet, Style, useFetch } from '../../../Components/Common'
import { CurrentTicket } from '../../../Components/User_Component/Ticket_components/ShowTicket_components/CurrentTicket'
import { Courses } from '../../../Components/Common/dataArray'
import { windowWidth } from '../../../utils/Dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import { Blue, White } from '../../../Components/InitialValue/Colors'
import { AddTicketButton } from '../../../Components/User_Component/Ticket_components/ShowTicket_components/AddTicketButton'
import { Blue_Header } from '../../../Components/Common/Blue_Header'

const Show_Ticket = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();
    const { data } = useFetch('ticket/list', false, 'POST', {
        idCoach: props["route"]["params"]["idCoach"]
    })




    return (
        <View style={Style.screenContainer}>
            <Blue_Header {...props} />
            <Text style={styles.title}>{`ارسال پیام به ${props["route"]["params"]["name"]}`}</Text>
            <ScrollView>
                {
                    isSet(data) ?
                        <CurrentTicket data={data["data"]["tickets"]} {...props} /> :
                        Courses.map(() =>
                            <View style={{ ...styles.loadingCard, alignSelf: 'center', width: windowWidth - 50, height: windowWidth / 4 }} />
                        )

                }
            </ScrollView>
            <AddTicketButton {...props} />
        </View>
    )
}

export default React.memo(Show_Ticket)

const styles = StyleSheet.create({
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    title: {
        fontSize: RFValue(20),
        fontFamily: 'BYekan',
        color: Blue,
        textAlign: 'center',
        margin: 10
    },
})