import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View, } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { RFValue } from 'react-native-responsive-fontsize';
import Video from 'react-native-video';
import { baseUrl, imageUrl } from '../../../Components/Common/Address';
import { Blue_Header } from '../../../Components/Common/Blue_Header';
import { Black, Blue } from '../../../Components/InitialValue/Colors';

const { width, height } = Dimensions.get('window');
const itemWidth = width / 5 * 4;
const itemHeight = height / 3 * 2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;

function Story(props) {
    const { story } = props.route.params;
    const [state, setState] = useState({
        indicator: false,
        paused: false
    })
    const [activeIndex, setActiveIndex] = useState({ current: 0, previous: null })
    const scale = useRef(new Animated.Value(0)).current;
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        animate();
    }, [])
    useEffect(() => {
        animate();
    }, [activeIndex])
    const animate = () => {
        scale.setValue(0);
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 1, bounciness: 1000 }).start();
    }
    const onScroll = (e) => {
        const x = e.nativeEvent.contentOffset.x;
        let newIndex = Math.floor((x / itemWidth) + 0.5)
        if (activeIndex.current != newIndex) {
            setActiveIndex({ current: newIndex, previous: activeIndex.current })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container} />
            <ScrollView
                horizontal
                pagingEnabled
                decelerationRate="fast"
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                snapToInterval={offset}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                    listener: onScroll
                })}>
                {story.map((story, index) => {
                    return (
                        <View key={index} >
                            <Item data={story} setState={setState} activeIndex={activeIndex} state={state} i={index} scrollX={scrollX} />
                            <Text style={styles.caption}>{story["caption"]}</Text>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {story.map((value, index) => (
                    <View key={index} style={[styles.indicator, index == activeIndex.current && { backgroundColor: '#fff' }]} />
                ))}
            </View>
        </View>
    );
}

function Item({ i, data, scrollX, setState, state, activeIndex }) {
    const scale = scrollX.interpolate({
        inputRange: [-offset + i * offset, i * offset, offset + i * offset],
        outputRange: [0.9, 1, 0.9],
    });
    let file = data["media"].split('.');
    let type = (file[file.length - 1] == 'mp4' ? 'video' : 'image')

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

    return <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
        {
            type == 'video' ?
                <>
                    <Video style={{ width: '100%', height: '100%' }}
                        repeat={true}
                        paused={i != activeIndex.current}
                        onBuffer={onBuffer}
                        poster={`${baseUrl}${imageUrl}social/${data["poster"]}`}
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
                        resizeMode={'contain'} source={{ uri: `${baseUrl}${imageUrl}social/${data["media"]}` }} />
                    {
                        state.indicator &&
                        <BallIndicator
                            size={30}
                            style={{ position: 'absolute', margin: 20 }}
                            color={Blue}
                        />
                    }
                </> :
                <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: `${baseUrl}${imageUrl}social/${data["media"]}` }} />

        }
    </Animated.View>;
}


export { Story }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        paddingHorizontal: padding,
        alignItems: 'center',
        paddingVertical: 10,
        zIndex: 1
    },
    item: {
        height: itemHeight,
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    bgColor: {
        position: 'absolute',
        height: height * 3 / 2,
        width: height * 3 / 2,
        borderRadius: height,
    },
    indicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: '#444'
    },
    caption: { maxWidth: itemWidth, color: Black, fontFamily: 'BYekan', fontSize: RFValue(12) }
});