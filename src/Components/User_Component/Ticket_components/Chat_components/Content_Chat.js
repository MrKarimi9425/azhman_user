import moment from 'jalali-moment';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Image, Pressable, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, ActivityIndicator, ToastAndroid } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { windowWidth } from '../../../../utils/Dimensions';
import { Black, Blue, Gray, White, WhiteSmoke } from '../../../InitialValue/Colors';
import { isSet, JDate, JDateTime, Library, useFetch } from '../../../Common';
import { baseUrl, imageUrl, url } from '../../../Common/Address';
import VideoPlayer from 'react-native-video-player';

const Content_Chat = ({ data, props ,send}) => {
   

    return (
        <>
          
        </>
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

const showDocument = (document) => {
    return (
        <View style={styles.fileContainer}>
            <Image style={{ width: '100%', height: '100%' }} blurRadius={10} resizeMode='stretch' resizeMethod='resize' source={require('../../../../assets/images/pdf.png')} />
            <Pressable onPress={() => { Linking.openURL(`${baseUrl}${imageUrl}tickets/${document}`) }} style={styles.documentShow}>
                <Entypo name='download' size={RFValue(40)} style={{ color: Black }} />
            </Pressable>
        </View>
    )
}


export { Content_Chat }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        backgroundColor: White,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    input: {
        flex: 1,
        fontSize: RFValue(12),
        padding: 10,
        fontFamily: 'BYekan'
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
    },
    fileContainer: {
        width: windowWidth / 1.5, height: 250, margin: 5, borderRadius: 10, overflow: 'hidden'
    },
    audioContainer: {
        width: windowWidth / 1.5, height: 70, margin: 5, borderRadius: 10, overflow: 'hidden'
    },
    documentShow: {
        position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
    },
    fileModal: {
        height: 200,
        backgroundColor: White,
        flexDirection: 'row'
    },
    modalSec: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalIcons: {
        fontSize: RFValue(25),
        color: Gray
    },
    modalTexts: {
        fontSize: RFValue(12),
        color: Gray,
        fontFamily: "BYekan"
    }
})