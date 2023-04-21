import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header, Style } from '../../Components/Common'
import { ScrollView } from 'react-native-gesture-handler'
import { Content_aboutUs } from '../../Components/User_Component/AboutUs_components/Content_aboutUs'

const AboutUs = (props) => {
    return (
        <View style={Style.screenContainer}>
            <Header {...props}/>
            <ScrollView>
                <Content_aboutUs {...props}/>
            </ScrollView>
        </View>
    )
}

export default React.memo(AboutUs)