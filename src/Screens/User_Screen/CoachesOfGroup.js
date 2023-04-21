import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Cards_coachesOfGroup, CoachBetter } from '../../Components/User_Component/CoachesOfGroup_components'
import { RFValue } from 'react-native-responsive-fontsize'
import { Black } from '../../Components/InitialValue/Colors'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style, useFetch } from '../../Components/Common'
import React,{ useContext, useEffect } from 'react'

const CoachesOfGroup = (props) => {
  const { alertConfig } = useContext(Context)
  const state = useIsFocused();

  return (
    <View style={Style.screenContainer}>
      <Header {...props} />
      <ScrollView>
        <Text style={styles.title}>مربیان برتر</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CoachBetter {...props}/>
        </ScrollView>
        <Text style={styles.title}>مربیان معمولی</Text>
        <Cards_coachesOfGroup {...props} />
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

const styles = StyleSheet.create({
  title: {
    margin: 20,
    marginTop: 30,
    fontFamily: 'BYekan',
    fontSize: RFValue(18),
    color: Black
  },
})

export default React.memo(CoachesOfGroup)