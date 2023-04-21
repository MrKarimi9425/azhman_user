import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Content_factor from '../../Components/User_Component/Factor_components/Content_factor'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'

const Factor = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <Content_factor {...props} />
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

export default React.memo(Factor)

const styles = StyleSheet.create({})