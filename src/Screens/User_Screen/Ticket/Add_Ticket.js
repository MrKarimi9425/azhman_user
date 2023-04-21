import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Style } from '../../../Components/Common/Style'
import { Blue_Header } from '../../../Components/Common/Blue_Header'
import { RFValue } from 'react-native-responsive-fontsize'
import { Blue } from '../../../Components/InitialValue/Colors'
import { Alert, isSet, useFetch } from '../../../Components/Common'
import { Content_AddTicket } from '../../../Components/User_Component/Ticket_components/AddTicket_components/Content_AddTicket'
import { Context } from '../../../Storage/Context'

const Add_Ticket = (props) => {
    const { data } = useFetch('ticket/get-type')
    const { alertConfig } = useContext(Context)

    return (
        <View style={Style.screenContainer}>
            <Blue_Header {...props} />
            <Text style={styles.title}>ثبت تیکت جدید</Text>
            <ScrollView>
                <Content_AddTicket props={props} data={data["data"]} />
            </ScrollView>
            <Alert
                title={alertConfig.title}
                message={alertConfig.message}
                onPress={alertConfig.onPress}
                type={alertConfig.type}
            />
        </View>
    )
}

export default React.memo(Add_Ticket)

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(20),
        fontFamily: 'BYekan',
        color: Blue,
        textAlign: 'center',
        margin: 10
    },
})