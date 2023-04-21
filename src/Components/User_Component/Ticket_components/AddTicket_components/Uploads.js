import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Black, Gray, WhiteSmoke } from '../../../InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { Library } from '../../../Common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DocumentPicker from 'react-native-document-picker'


const Uploads = ({ setFile, file }) => {
    const [loading, setLoading] = useState({
        image: false,
        video: false,
        audio: false,
        document: false
    });

    useEffect(() => {
        console.log({
            file: file
        })
    }, [file])





    const uploadImage = () => {
        setLoading({
            image: true
        })
        Library('photo').then((image) => {
            setLoading({
                image: false
            })
            setFile({
                image: image.image,
                video: file.video,
                audio: file.audio,
                document: file.document
            })
        })
    }

    const uploadVideo = () => {
        setLoading({
            video: true
        })
        Library('video').then((video) => {
            console.log('video', video)
            setFile({
                video: video.image,
                image: file.image,
                audio: file.audio,
                document: file.document
            })
            setLoading({
                video: false
            })
        })

    }

    const uploadDocument = () => {

    }

    const uploadAudio = () => {

    }

    return (
        <>
            {

            }
            <Pressable onPress={uploadImage} style={{ ...styles.upload, marginTop: 20 }}>
                {
                    !loading.image ?
                        file.image == '' ? <Ionicons name='image' size={RFValue(20)} style={styles.uploadIcon} />
                            :
                            <FontAwesome style={styles.uploadIcon} name='check' />
                        :
                        <ActivityIndicator />
                }
                {
                    file.image === '' ?
                        <Text style={styles.uploadText}>بارگزاری عکس</Text> :
                        <Text style={styles.uploadText}>عکس بارگزاری شد</Text>

                }

            </Pressable>
            <Pressable onPress={uploadVideo} style={styles.upload}>
                {
                    !loading.video ?
                        file.video == '' ? <FontAwesome5 size={RFValue(20)} name='photo-video' style={styles.uploadIcon} />
                            :
                            <FontAwesome size={RFValue(20)} style={styles.uploadIcon} name='check' />
                        :
                        <ActivityIndicator />
                }
                {
                    file.video === '' ?
                        <Text style={styles.uploadText}>بارگزاری فایل ویدئویی</Text> :
                        <Text style={styles.uploadText}>فایل ویدئو بارگزاری شد</Text>

                }


            </Pressable>
            <Pressable onPress={() => DocumentPicker.pick({ type: DocumentPicker.types.audio }).then(audio => { console.log('audio', audio) })} style={styles.upload}>
                <MaterialIcons size={RFValue(20)} name='keyboard-voice' style={styles.uploadIcon} />
                <Text style={styles.uploadText}>بارگزاری فایل صوتی</Text>
            </Pressable>
            <Pressable style={styles.upload}>
                <Ionicons name='document-attach' size={RFValue(20)} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>بارگزاری سند</Text>
            </Pressable>
        </>
    )
}

export { Uploads }

const styles = StyleSheet.create({
    upload: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 15,
        backgroundColor: WhiteSmoke,
        margin: 5,
        alignItems: 'center',
        elevation: 5
    },
    uploadText: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Black
    },
    uploadIcon: {
        color: Gray,
        fontSize: RFValue(20)
    }
})