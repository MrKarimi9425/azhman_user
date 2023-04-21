import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { BallIndicator } from "react-native-indicators";
import Video from "react-native-video";
import { Black, White } from "../../InitialValue/Colors";


const VideoPlayer = ({ inputUrl }) => {
    const [state, setState] = useState({
        indicator: false,
        repeat: false
    });
    const navigation = useNavigation()

    const onLoadStart = () => {
        setState(pro => ({
            ...pro,
            indicator: true,
        }));
    }

    const onLoad = () => {
        setState(pro => ({
            ...pro,
            indicator: false,
        }));
    }

    const onBuffer = ({ isBuffering }) => {
        setState(pro => ({
            ...pro,
            indicator: isBuffering ? 1 : 0
        }));
    }

    const doRepeat = () => {
        setState(prov => ({ ...prov, repeat: true, indicator: true }))
        console.log('doRepeat')
    }

    const dontRepeat = () => {
        setState(prov => ({ ...prov, repeat: false, indicator: false }))
        console.log('dontRepeat')
    }
    return (
        <>
            <Video
                source={{ uri: inputUrl }} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                repeat={true}
                onBuffer={onBuffer}
                onLoadStart={onLoadStart}
                onLoad={onLoad}
                onError={() => doRepeat()}
                onPlaybackStalled={() => {
                    console.log('stalled');
                    doRepeat()
                }}
                onPlaybackResume={() => {
                    console.log('playbackResume')
                    dontRepeat();
                }}

                onEnd={() => {
                    console.log('end')
                    doRepeat()
                }}
                resizeMode='stretch'
            />
            {
                state.indicator &&
                <BallIndicator
                    size={50}
                    color={White}
                />
            }
        </>
    );
};

export { VideoPlayer }