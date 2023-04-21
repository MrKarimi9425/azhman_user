import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { Blue } from '../../Components/InitialValue/Colors';
import Content_Login from '../../Components/Guest_Component/Login_components/Content_Login';
import { Style } from '../../Components/Common/Style';
import Icon_component from '../../Components/Guest_Component/Icon_component';

const Login_Screen = (props) => {
  return (
    <View style={Style.screenContainer}>
        <Content_Login />
    </View>
  )
}

export default React.memo(Login_Screen)
