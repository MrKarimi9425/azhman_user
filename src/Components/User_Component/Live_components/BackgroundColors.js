import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";

const BackgroundColors = () => {
    const [Animation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.loop(
            Animated.timing(Animation, {
                toValue: 1,
                duration: 15000,
                useNativeDriver: false,
            })
        ).start();
    }, [])

    const backgroundColor = Animation.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
        outputRange: ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#1abc9c'],
    });

    return (
        <Animated.View style={[styles.backgroundContainer, { backgroundColor: backgroundColor }]}>
            <View style={styles.wrapperCenterTitle}>
                <Text style={styles.titleText}>
                    لطفا در این صفحه بمانید و تا شروع شدن کلاس منتظر بمانید
                </Text>
            </View>
        </Animated.View>
    );
};

export { BackgroundColors }

const styles = StyleSheet.create({
    backgroundContainer: {
        width: windowWidth,
        height: windowHeight
    },
    wrapperCenterTitle: {
        flex: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '400',
    },
})