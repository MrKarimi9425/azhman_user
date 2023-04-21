import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../../Components/Common'
import { Blue_Header } from '../../../Components/Common/Blue_Header'
import Content_Analysis from '../../../Components/User_Component/Analysis_components/Content_Analysis'

const Submit_Analysis = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Blue_Header {...props} />
            <ScrollView>
                <Content_Analysis {...props} />
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

export default React.memo(Submit_Analysis)