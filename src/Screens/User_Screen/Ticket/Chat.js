import { ActivityIndicator, FlatList, Image, ImageBackground, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Style, Header } from '../../../Components/Common/Style'
import { Audio, Document, isSet, JDateTime, Library, useFetch } from '../../../Components/Common'
import { Blue_Header } from '../../../Components/Common/Blue_Header'
import { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Black, Gray, White, Blue } from '../../../Components/InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { windowWidth } from '../../../utils/Dimensions'
import VideoPlayer from 'react-native-video-player'
import { baseUrl, imageUrl } from '../../../Components/Common/Address'
import moment from 'jalali-moment';

const Chat = (props) => {
    const { data, loading } = useFetch('ticket/preview', false, 'POST', {
        idTicket: props.route.params.idTicket
    })
    const { data: send, doFetch, loading: loadingSend } = useFetch('ticket/send-message', true)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [state, setState] = useState({
        file: "none"
    })

    useEffect(() => {
        if (send) {
            if (send.length != 0 && send["res"] != 0) {
                if (isSet(send.model)) {
                    if (isSet(send["model"]["image"])) {
                        setMessages(msg => ([{ image: send["model"]["image"], message: send["model"]["des"], date: new Date().getTime(), type: 'send' }, ...msg]))
                    } else if (isSet(send["model"]["video"])) {
                        setMessages(msg => ([{ video: send["model"]["video"], message: send["model"]["des"], date: new Date().getTime(), type: 'send' }, ...msg]))
                    } else if (isSet(send["model"]["audio"])) {
                        setMessages(msg => ([{ audio: send["model"]["audio"], message: send["model"]["des"], date: new Date().getTime(), type: 'send' }, ...msg]))
                    } else if (isSet(send["model"]["document"])) {
                        setMessages(msg => ([{ document: send["model"]["document"], message: send["model"]["des"], date: new Date().getTime(), type: 'send' }, ...msg]))
                    } else null
                } else {
                    ToastAndroid.showWithGravity(
                        "مشکلی پیش آمده دوباره امتحان کنید",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    )
                }
            }
        }

    }, [send])

    useEffect(() => {
        isSet(data["data"]) &&
            data["data"]["chats"].forEach(value => {
                if (parseInt(value["sender"]) === data["data"]["user"]) {
                    setMessages(msg => ([{ image: value["image"], video: value["video"], audio: value["audio"], document: value["document"], message: value["des"], date: value["date"], type: 'send' }, ...msg]))
                } else {
                    setMessages(msg => ([{ image: value["image"], video: value["video"], audio: value["audio"], document: value["document"], message: value["des"], date: value["date"], type: 'receiver' }, ...msg]))
                }
            })
    }, [data])

    const sendMsg = () => {
        setMessages([{ date: new Date().getTime(), type: 'send', message: message }, ...messages]);
        doFetch({
            idTicket: props.route.params.idTicket,
            des: message,
            image: "",
            video: "",
            audio: "",
            document: ""
        })
        setMessage('');
    };

    const uploadImage = () => {
        if (message !== '') {
            Library('photo').then((image) => {
                doFetch({
                    idTicket: props.route.params.idTicket,
                    des: message,
                    image: image["image"],
                    video: '',
                    audio: '',
                    document: ''
                })
            })
            setMessage('');
            setState(prov => ({ ...prov, file: prov.file === "none" ? "flex" : "none" }))
        } else {
            ToastAndroid.showWithGravity(
                "پیام نمی تواند خالی باشد ",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }

    }
    const uploadVideo = () => {
        if (message !== '') {
            Library('video').then((video) => {
                doFetch({
                    idTicket: props.route.params.idTicket,
                    des: message,
                    image: '',
                    video: video["image"],
                    audio: '',
                    document: ''
                })
            })
            setMessage('');
            setState(prov => ({ ...prov, file: prov.file === "none" ? "flex" : "none" }))
        } else {
            ToastAndroid.showWithGravity(
                "پیام نمی تواند خالی باشد ",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
    }
    const uploadAudio = () => {
        if (message !== '') {
            Audio().then(audio => {
                doFetch({
                    idTicket: props.route.params.idTicket,
                    des: message,
                    image: '',
                    video: '',
                    audio: audio["image"],
                    document: ''
                })
            })
            setMessage('');
            setState(prov => ({ ...prov, file: prov.file === "none" ? "flex" : "none" }))
        } else {
            ToastAndroid.showWithGravity(
                "پیام نمی تواند خالی باشد ",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
    }
    const uploadDocument = () => {
        if (message !== '') {
            Document().then(document => {
                console.log('document', document)
                doFetch({
                    idTicket: props.route.params.idTicket,
                    des: message,
                    image: '',
                    video: '',
                    audio: '',
                    document: document.image
                })
            })
            setMessage('');
            setState(prov => ({ ...prov, file: prov.file === "none" ? "flex" : "none" }))
        } else {
            ToastAndroid.showWithGravity(
                "پیام نمی تواند خالی باشد ",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
    }

    function ChatItem({ item }) {
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
                {
                    isSet(item["document"]) &&
                    item["document"] !== 'n/a' &&
                    showDocument(item["document"])
                }
                {
                    isSet(item["audio"]) &&
                    item["audio"] !== 'n/a' &&
                    <View style={styles.audioContainer}>
                        <VideoPlayer
                            onHideControls={() => null}
                            video={{ uri: `${baseUrl}${imageUrl}tickets/${item["audio"]}` }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>
                }
                <Text style={{ ...styles.msgtxt, color: item.type === 'send' ? White : Blue }}>{item["message"]}</Text>
                {
                    item["date"].length == 10 ?
                        <Text style={{ ...styles.msgtxt, fontSize: RFValue(10), color: item.type === 'send' ? White : Blue }}>{JDateTime(item["date"])}</Text>
                        :
                        <Text style={{ ...styles.msgtxt, fontSize: RFValue(10), color: item.type === 'send' ? White : Blue }}>{moment(item["date"]).format('jYYYY/jMM/jDD HH:mm')}</Text>
                }

            </View >
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
                    thumbnail={require('../../../assets/images/logo.png')}
                />
            </View>
        )
    }

    const showDocument = (document) => {
        return (
            <View style={styles.fileContainer}>
                <Image style={{ width: '100%', height: '100%' }} blurRadius={10} resizeMode='stretch' resizeMethod='resize' source={require('../../../assets/images/pdf.png')} />
                <Pressable onPress={() => { Linking.openURL(`${baseUrl}${imageUrl}tickets/${document}`) }} style={styles.documentShow}>
                    <Entypo name='download' size={RFValue(40)} style={{ color: Black }} />
                </Pressable>
            </View>
        )
    }


    return (
        <>
            {
                loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size={"large"} color={Blue} />
                </View>
            }
            {
                loadingSend &&
                <View style={styles.loading}>
                    <ActivityIndicator size={"large"} color={Blue} />
                </View>
            }
            <Pressable onPress={() => { setState(prov => ({ ...prov, file: "none" })) }} style={Style.screenContainer}>
                <ImageBackground source={require('../../../assets/images/chatBack.jpeg')} style={Style.screenContainer}>
                    <Blue_Header {...props} />

                    <FlatList data={messages}
                        keyExtractor={x => x.id}
                        renderItem={({ item, index }) => <ChatItem {...{ item, index }} />}
                        inverted
                        contentContainerStyle={styles.listStyle} />
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={sendMsg}
                            disabled={message.length === 0}
                        >
                            <Ionicons name={'send-sharp'} size={RFValue(25)} style={styles.sendIcon} color={message.length === 0 ? Gray : Blue} />
                        </TouchableOpacity>
                        <TextInput style={styles.input} value={message} placeholderTextColor={Gray} placeholder='پیام خود را تایپ کنید ...' onChangeText={setMessage} />
                        <TouchableOpacity onPress={() => {
                            setState(prov => ({ ...prov, file: prov.file === "none" ? "flex" : "none" }))
                        }}>
                            <Ionicons name={'attach'} size={RFValue(25)} color={Gray} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.fileModal, { display: state.file }]}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={uploadVideo} style={styles.modalSec}>
                                <Entypo name='video' style={styles.modalIcons} />
                                <Text style={styles.modalTexts}>فیلم</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={uploadAudio} style={styles.modalSec}>
                                <AntDesign name='sound' style={styles.modalIcons} />
                                <Text style={styles.modalTexts}>صدا</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={uploadImage} style={styles.modalSec}>
                                <Entypo name='images' style={styles.modalIcons} />
                                <Text style={styles.modalTexts}>تصویر</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={uploadDocument} style={styles.modalSec}>
                                <Ionicons name='document-attach-outline' style={styles.modalIcons} />
                                <Text style={styles.modalTexts}>سند</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </ImageBackground>
            </Pressable>
        </>
    )
}

export default React.memo(Chat)

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
    },
    loading: {
        position: 'absolute', top: '50%', left: '50%', marginLeft: -25, zIndex: 999, backgroundColor: White, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 200
    }
})