import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Content_Questions from '../../Components/User_Component/Questions_components/Content_Questions'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'

const Questions = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <Content_Questions {...props} />
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

export default React.memo(Questions)

const styles = StyleSheet.create({})