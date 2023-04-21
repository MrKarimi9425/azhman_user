import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import CartView from '../../Components/User_Component/OfflinePayment_components/CartView'
import Form from '../../Components/User_Component/OfflinePayment_components/Form'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'

const OfflinePayment = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <CartView />
                <Form {...props} />
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

export default React.memo(OfflinePayment)

const styles = StyleSheet.create({})