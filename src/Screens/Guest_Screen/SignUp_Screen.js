import React from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { Blue } from '../../Components/InitialValue/Colors';
import Content_SignUp from '../../Components/Guest_Component/SignUp_components/Content_SignUp';
import { Style } from '../../Components/Common/Style';
import Icon_component from '../../Components/Guest_Component/Icon_component';
import { View } from 'react-native-animatable';



const SignUp_Screen = (props) => {
  return (
    <View style={Style.screenContainer}>
      <Content_SignUp {...props} />
    </View>
  )
}

export default React.memo(SignUp_Screen)

const styles = StyleSheet.create({

})