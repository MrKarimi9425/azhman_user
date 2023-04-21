import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Content_alarm from '../../Components/User_Component/alarm_components/Content_alarm'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Style } from '../../Components/Common'

const Alarm = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <ScrollView>
                <Content_alarm {...props} />
            </ScrollView>
            {
                state &&
                <Alert
                    title={alertConfig.title}
                    message={alertConfig.message}
                    onPress={alertConfig.onPress}
                    type={alertConfig.type}
                />
            }
        </View>
    )
}

export default React.memo(Alarm)

