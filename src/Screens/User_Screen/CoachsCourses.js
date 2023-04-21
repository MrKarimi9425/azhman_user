import { ScrollView, View } from 'react-native'
import React, { useContext } from 'react'
import Cards_coachesCourses from '../../Components/User_Component/CoachsCourses_components/Cards_coachesCourses'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native'
import { Alert, Header, Style } from '../../Components/Common'

const CoachesOfGroup = (props) => {
  const { alertConfig } = useContext(Context)
  const state = useIsFocused();

  return (
    <View style={Style.screenContainer}>
      <Header {...props} />
      <Cards_coachesCourses {...props} />
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

export default React.memo(CoachesOfGroup)