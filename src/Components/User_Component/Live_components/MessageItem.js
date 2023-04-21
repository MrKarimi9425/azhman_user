import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import styles from './styles';

const MessageItem = ({ data }) => {
  return (
    <View style={styles.chatItem}>
      <View>
        <Image source={require('../../../assets/images/avatar_1.png')} style={styles.avatar} />
      </View>
      <View style={styles.messageItem}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.content}>{message}</Text>
      </View>
    </View>
  );
};


export { MessageItem }
