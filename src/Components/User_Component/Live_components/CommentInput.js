import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';



const CommentInput = ({ onPress, setMessage, message }) => {
  return (
    <View style={styles.wrapper}>

      <TextInput
        style={styles.textInput}
        placeholder="اینجا تایپ کنید"
        underlineColorAndroid="transparent"
        onChangeText={setMessage}
        value={message}
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={onPress}
        style={styles.wrapIconSend}
        activeOpacity={0.6}
      >
        <Image source={require('../../../assets/images/ico_send.png')} style={styles.iconSend} />
      </TouchableOpacity>
    </View>
  );
}

export { CommentInput }

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  wrapIconHeart: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    zIndex: 2,
  },
  iconHeart: {
    width: 45,
    height: 45,
    zIndex: 2,
  },
  wrapIconSend: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconSend: {
    width: 33,
    height: 33,
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
})