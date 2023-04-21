import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Blue } from '../../Components/InitialValue/Colors';
import Content_SmsCode from '../../Components/Guest_Component/SmsCode/Content_SmsCode';
import { Style } from '../../Components/Common/Style';
import Icon_component from '../../Components/Guest_Component/Icon_component';


const SmsCode_Screen = (props) => {
  return (
    <View style={Style.screenContainer}>
      <Content_SmsCode {...props} />
    </View>
  )
}

export default React.memo(SmsCode_Screen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Blue
  }
})