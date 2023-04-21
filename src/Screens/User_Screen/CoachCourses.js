import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Cards from '../../Components/User_Component/ClassesTime/Cards'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'

const CoachCourses = (props) => {
  const { alertConfig } = useContext(Context)
  const state = useIsFocused();

  return (
    <View style={Style.screenContainer}>
      <Header {...props} />
      <ScrollView>
        <Cards {...props}/>
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

export default React.memo(CoachCourses)