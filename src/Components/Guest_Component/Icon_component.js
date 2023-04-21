import { Dimensions, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { Main, White } from '../InitialValue/Colors';


const Icon_component = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>

      <Image style={{
        width: width > height ? 300 : width / 2.5,
        height: width > height ? 300 : width / 2.5
      }} source={require('../../assets/images/logo.png')} resizeMode={'contain'} resizeMethod={'resize'}
      />
    </View>
  )
}

export default React.memo(Icon_component);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center',
  },

}) 