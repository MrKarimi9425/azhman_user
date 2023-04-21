import moment from 'jalali-moment';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Black, Blue, Gray, White } from '../../../InitialValue/Colors';
import { isSet, JDate, JDateTime, useFetch } from '../../../Common';
import { baseUrl, imageUrl } from '../../../Common/Address';
import { windowWidth } from '../../../../utils/Dimensions';
import VideoPlayer from 'react-native-video-player';

const Content_channelMessage = ({ data, props }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        isSet(data["chats"]) &&
            data["chats"].forEach(value => {
                setMessages(msg => ([{ image: value["image"], video: value["video"], message: value["des"], date: value["date"], type: 'receiver' }, ...msg]))
            })
    }, [data])

    return (
        <FlatList data={messages} keyExtractor={x => x.id} renderItem={({ item, index }) => <ChatItem {...{ item, index }} />} inverted contentContainerStyle={styles.listStyle} />
    )
}

const showImage = (image) => {
    return (
        <View style={styles.fileContainer}>
            <Image style={{ flex: 1 }}
                source={{ uri: `${baseUrl}${imageUrl}tickets/${image}` }}
                resizeMode={'stretch'}
                resizeMethod={'resize'}
            />
        </View>
    )
}

const showVideo = (video) => {
    return (
        <View style={styles.fileContainer}>
            <VideoPlayer
                video={{ uri: `${baseUrl}${imageUrl}tickets/${video}` }}
                onLoad={() => <ActivityIndicator size={'large'} color={Black} />}
                style={{ width: '100%', height: '100%' }}
                showDuration
                thumbnail={require('../../../../assets/images/logo.png')}
            />
            {/* <VideoPlayer style={{ width:'100%',height:'100%' }} resizeMode={'stretch'} source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }} /> */}
        </View>
    )
}



function ChatItem({ item }) {
    let message = item["message"].replace('-', '\n')
    console.log('item',item)
    return (
        <View style={[styles.chatItemCommon, item.type === 'send' ? { ...styles.send } : styles.receive]}>
            {
                isSet(item["image"]) &&
                item["image"] !== 'n/a' &&
                showImage(item["image"])
            }
            {
                isSet(item["video"]) &&
                item["video"] !== 'n/a' &&
                showVideo(item["video"])
            }
            <Text style={{ ...styles.msgtxt, color: item.type === 'send' ? White : Blue }}>{message}</Text>
            <Text style={{ ...styles.msgtxt, fontSize: RFValue(10), color: item.type === 'send' ? White : Blue }}>{JDateTime(item["date"])}</Text>
        </View>
    )
}
export { Content_channelMessage }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    input: {
        flex: 1,
        fontSize: RFValue(14),
        padding: 10,
    },
    send: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(105,185,246,1)',
    },
    receive: {
        alignSelf: 'flex-start',
        backgroundColor: White,
    },
    chatItemCommon: {
        marginBottom: 8,
        borderRadius: 10,
    },
    fileContainer: {
        width: windowWidth / 1.5, height: 300, margin: 5, borderRadius: 10, overflow: 'hidden'
    },
    msgtxt: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        maxWidth: '90%',
        fontSize: RFValue(12),
        color: Black,
        fontFamily: 'BYekan',
        lineHeight: 25
    },
    listStyle: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    sendIcon: {
        transform: [{ rotate: '180deg' }],
        fontSize: RFValue(25)
    }
})