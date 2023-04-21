import { StyleSheet, Text, View,StyleProp,ViewStyle } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Rating = ({ rating, maxRating, size, border = false, style }) => {
  return (
    <View style={[styles.container, border ? { borderTopWidth: 0.5, borderTopColor: '#00DCAE' } : null]}>
      {
        Array(rating).fill(1).map((el, index) => (
          <FontAwesome key={index} style={{...styles.icon,style}} name='star' size={size} color='#fff500' />
        ))
      }
      {
        Array(maxRating - rating).fill(1).map((el, index) => (
          <FontAwesome key={index} style={{...styles.icon,style}} name='star-o' size={size} color='#2e2e2e' />
        ))
      }
    </View>
  );
};

export {Rating}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 2
  }
})