import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gray, White } from '../../InitialValue/Colors'
import { useNavigation } from '@react-navigation/native'

const Icons = ({ viewer }) => {
    const [fadeAnimation] = useState(new Animated.Value(0))
    const { replace } = useNavigation();
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [])
    return (
        <View style={{ position: 'absolute', top: 0, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => replace('user',{screen:'LiveStreaming'})} style={styles.iconContainer}>
                <Image
                    style={styles.icon}
                    source={require('../../../assets/images/close.png')}
                    tintColor="white"
                />
            </TouchableOpacity>
            <View style={styles.rightIcons}>
                <Animated.View style={{ opacity: fadeAnimation }}>
                    <Image
                        resizeMode={'contain'}
                        resizeMethod={'resize'}
                        source={require('../../../assets/images/ico_live.png')}
                    />
                </Animated.View>

            </View>
        </View>
    )
}

export default Icons

const styles = StyleSheet.create({
    iconContainer: {
        margin: 20
    },
    icon: {
        width: 30,
        height: 30,
    },

    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },

})