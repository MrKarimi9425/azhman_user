import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Cards_coachesCourses from '../../Components/User_Component/CoachsCourses_components/Cards_coachesCourses'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'
import { Card_Articles } from '../../Components/User_Component/Articles_component/Card_Articles'
import { RFValue } from 'react-native-responsive-fontsize'
import { Blue } from '../../Components/InitialValue/Colors'

const Articles = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <Text style={styles.title}>مقالات آژمان</Text>
            <Card_Articles {...props} />
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

export { Articles }

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(20),
        fontFamily: 'BYekan',
        color: Blue,
        textAlign: 'center',
        margin: 10
    },
})