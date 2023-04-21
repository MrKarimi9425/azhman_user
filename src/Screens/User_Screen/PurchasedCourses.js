import { ScrollView, View } from 'react-native'
import React, { useContext } from 'react'
import Content_PurchasedCourses from '../../Components/User_Component/PurchasedCourses_components/Content_PurchasedCourses'
import { useIsFocused } from '@react-navigation/native'
import { Context } from '../../Storage/Context'
import { Alert, Header, Style } from '../../Components/Common'


const PurchasedCourses = (props) => {
  const { alertConfig } = useContext(Context)

  const state = useIsFocused();

  return (
    <View style={Style.screenContainer}>
      <Header {...props} />
      <ScrollView>
        <Content_PurchasedCourses {...props} />
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

export default React.memo(PurchasedCourses);