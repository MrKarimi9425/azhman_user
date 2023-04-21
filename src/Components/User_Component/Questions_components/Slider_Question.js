import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider';
import { Blue } from '../../InitialValue/Colors'
const Slider_Question = ({ count, idQuestion }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${count} / ${idQuestion}`}</Text>
        <Text style={styles.text}>{`سوال شماره ${idQuestion}`}</Text>
      </View>
      {/* <Slider
        inverted
        minimumValur={0}
        thumbTintColor={Blue}
        value={idQuestion}
        minimumTrackTintColor={Blue}
      /> */}
    </View>
  )
}

export default React.memo(Slider_Question)

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  text: {
    fontFamily: 'BYekan'
  }
})