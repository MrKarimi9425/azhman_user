import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, DevSettings, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { isSet, useFetch } from '../../Components/Common'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import { CommentInput } from '../../Components/User_Component/Live_components/CommentInput'
import { VideoPlayer } from '../../Components/User_Component/Live_components/VideoPlayer'
import { Black, White } from '../../Components/InitialValue/Colors'
import Icons from '../../Components/User_Component/Live_components/Icons'
import { RFValue } from 'react-native-responsive-fontsize'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const Live = (props) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');
    const [reconnect, setReconnect] = useState(false);
    const [Animation] = useState(new Animated.Value(0))
    const navigation = useNavigation();
    const [repeat, setRepeat] = useState(false)

    useEffect(() => {
        Animated.loop(
            Animated.timing(Animation, {
                toValue: 1,
                duration: 15000,
                useNativeDriver: false,
            })
        ).start();
    }, [repeat])

    const backgroundColor = Animation.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
        outputRange: ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#1abc9c'],
    });

    const { data, doFetch: connect } = useFetch('datacourse/get_data_play', true)

    useEffect(() => {
        connect({
            idDataCourse: props.route.params.idDataCourse
        })
    }, [reconnect])

    const { doFetch } = useFetch('comment/add', true);

    const sendMsg = () => {
        setMessages([{ message: message }, ...messages]);
        doFetch({
            idTable: props.route.params.idDataCourse,
            nameTable: 'DataCourse',
            comment: message,
            type: 'comment',
        })
        setMessage('');
    };

    const sendLike = (likeColor) => {
        doFetch({
            idTable: props.route.params.idDataCourse,
            nameTable: 'DataCourse',
            type: 'like',
            likePro: likeColor
        })
    }

    return (
        <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {/* <BackgroundColors /> */}
            {
                isSet(data["data"]) && data["data"]["hls_playlist"] != 'empty' &&
                <VideoPlayer inputUrl={data["data"]["hls_playlist"]} repeat={repeat} setRepeat={setRepeat} />
            }
            <View style={styles.heartIconContainer}>
                <TouchableOpacity onPress={() => sendLike('blackHeart')} style={styles.heartIcon}>
                    <AntDesign size={RFValue(35)} name='heart' style={styles.heartIcons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setReconnect(!reconnect)} style={styles.heartIcon}>
                    <AntDesign size={RFValue(35)} name='heart' style={{ ...styles.heartIcons, color: 'red' }} />
                </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', bottom: 70, width: '80%', alignSelf: 'flex-end', height: windowHeight / 2 }}>
                <FlatList data={messages} keyExtractor={x => x.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <ChatItem {...{ item, index }} />} inverted contentContainerStyle={styles.listStyle} />
            </View>
            <CommentInput onPress={sendMsg} message={message} setMessage={setMessage} />
            <Icons />
        </Animated.View >
    )
}

function ChatItem({ item }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={[styles.chatItemCommon, styles.receive]}>
                <Text style={{ ...styles.msgtxt, color: Black, lineHeight: 25 }}>{item["message"]}</Text>
            </View>
            <View style={{ width: 50, height: 50, backgroundColor: 'rgba(239,161,238,0.69)', borderRadius: 50, margin: 5 }} />
        </View>
    )
}


export default React.memo(Live)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },
    blackContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    playerView: {
        heigth: Math.floor(windowHeight),
        width: windowWidth,
    },
    chatItemCommon: {
        marginBottom: 8,
        borderRadius: 10,
        maxWidth: '60%',
        padding: 5,
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    msgtxt: {
        padding: 5,
        // maxWidth: '80%',
        fontSize: RFValue(14),
        color: Black,
        textAlign: 'right',
        fontFamily: 'BYekan',
        // lineHeight: 25
    },
    listStyle: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    heartIcons: {
        margin: 10,
    },
    heartIconContainer: {
        position: 'absolute',
        // bottom: 0,
        bottom: 50,
        margin: 10
    },
    heartIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heartCount: {
        fontFamily: 'BYekan',
        fontSize: RFValue(16),
        color: White,
        position: 'absolute'
    }
})