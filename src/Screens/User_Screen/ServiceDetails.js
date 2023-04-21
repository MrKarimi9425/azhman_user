import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Content from '../../Components/User_Component/ServiceDetails_components/Content'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'

const ServiceDetails = (props) => {
  const { alertConfig } = useContext(Context)
  const state = useIsFocused();

  return (
    <View style={Style.screenContainer}>
      <Header {...props} />
      <ScrollView>
        <Content {...props} />
      </ScrollView>
      {/* {
        state &&
        <Alert
          title={alertConfig.title}
          message={alertConfig.message}
          onPress={alertConfig.onPress}
          type={alertConfig.type}
        />
      } */}
    </View>
  )
}

export default React.memo(ServiceDetails)

const styles = StyleSheet.create({})