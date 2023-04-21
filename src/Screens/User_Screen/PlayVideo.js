import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { isSet } from '../../Components/Common'
import { useNavigation } from '@react-navigation/native'
import { windowHeight, windowWidth } from '../../utils/Dimensions'
import Video from 'react-native-video'
import { Black, Blue, Gray, White, WhiteSmoke } from '../../Components/InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize';
import { BallIndicator } from 'react-native-indicators'


const PlayVideo = (props) => {

    const { height } = useWindowDimensions();
    const { navigate, replace } = useNavigation();
    const [opacity, setOpacity] = useState({
        indicator: false,
        button: 0
    })


    const onLoadStart = () => {
        setOpacity(pro => ({
            ...pro,
            indicator: true,
            button: 0
        }));
    }

    const onLoad = () => {
        setOpacity(pro => ({
            ...pro,
            indicator: false,
            button: 1
        }));
    }

    const onBuffer = ({ isBuffering }) => {
        setOpacity(pro => ({
            ...pro,
            indicator: isBuffering ? 1 : 0
        }));
    }

    return (
        <View style={{ flex: 1 }}>
            {
                isSet(props.route.params.url) ?
                    <>
                        <Video
                            source={{ uri: props.route.params.url }}
                            resizeMode='stretch'
                            poster='https://azhman.online/upload/catService/1_catService.jpg'
                            posterResizeMode='stretch'
                            disableDisconnectError={true}
                            controls={true}
                            onBuffer={onBuffer}
                            onLoadStart={onLoadStart}
                            onLoad={onLoad}
                            style={styles.backgroundVideo}
                        />
                        {
                            opacity.indicator &&
                            <BallIndicator
                                size={50}
                                color={Blue}
                            />
                        }
                        <Text
                            style={[styles.backButton, { opacity: opacity.button }]}
                            onPress={() => { replace('user', { screen: 'LiveStreaming' }) }}
                        >لیست کلاس های ذخیره شده</Text>
                    </>
                    :
                    <ImageBackground source={require('../../assets/images/webinar.jpg')} resizeMode='stretch' resizeMethod='resize' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'BYekan', fontSize: RFValue(25), color: Black, backgroundColor: WhiteSmoke, width: '100%', textAlign: 'center' }}>
                            ویدیویی وجود ندارد
                        </Text>
                    </ImageBackground>
            }

        </View>
    )
}

export default React.memo(PlayVideo)

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    backButton: {
        position: 'absolute', backgroundColor: Blue, margin: 10, borderRadius: 20, padding: 15,
        color: White, fontSize: RFValue(12)
    },
    activityIndicator: {
        position: 'absolute'
    }
})