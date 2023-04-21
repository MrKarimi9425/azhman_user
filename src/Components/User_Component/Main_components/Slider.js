import { Animated, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { slider } from '../../Common/dataArray'
import { baseUrl, imageUrl } from "../../Common/Address";
import { RFValue } from "react-native-responsive-fontsize";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";
import { isSet } from "../../Common";

let flatList;

function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0,
        scrolled = 0;

    setInterval(function () {
        scrolled++;
        if (scrolled < numberOfData) scrollValue = scrollValue + width;
        else {
            scrollValue = 0;
            scrolled = 0;
        }

        flatList.scrollToOffset({ animated: true, offset: scrollValue });
    }, 3000);
}

const Slider = ({ data, props }) => {
    const { width, height } = useWindowDimensions()
    const { replace } = useNavigation();
    const itemWidht = (width / 3) * 2;
    const padding = (width - itemWidht) / 2;
    const offset = itemWidht;
    const scrollX = useRef(new Animated.Value(0)).current;


    const Item = ({ data, i, scrollX, loading = true }) => {
        const scale = scrollX.interpolate({
            inputRange: [-offset + i * offset, i * offset, offset + i * offset],
            outputRange: [0.75, 1, 0.75]
        })
        return <Animated.View style={{ ...styles.item, transform: [{ scale }], height: width, width: itemWidht }}>
            {
                loading ?
                    <Image resizeMode="stretch" source={data.img} style={styles.image} /> :
                    <Ripple style={styles.imageContainer} onPress={() => {
                        replace('user',
                            {
                                screen: 'CoachesOfGroup',
                                params: {
                                    idCatService: data.id,
                                    goBack: props.route.name
                                }
                            })
                    }}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {data.title}
                            </Text>
                        </View>
                        <Image resizeMode="cover"
                            resizeMethod="resize"
                            source={{ uri: `${baseUrl}${imageUrl}catService/${data.image}` }} style={styles.image} />
                    </Ripple>
            }
        </Animated.View>
    }

    return (
        <>
            {
                <ScrollView
                    horizontal
                    pagingEnabled
                    decelerationRate={"fast"}
                    contentContainerStyle={{ ...styles.scrollView, paddingHorizontal: padding }}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={offset}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })}
                >
                    {
                        typeof data != 'undefined' && data["catService"] != null ?
                            data["catService"].map((value, index) => {
                                return (
                                    <Item key={index} data={value} loading={false} i={index} scrollX={scrollX} />
                                )
                            }) :
                            slider.map((value, index) => {
                                return (
                                    <Item key={index} data={value} i={index} scrollX={scrollX} />
                                )
                            })
                    }
                </ScrollView>
            }
        </>
    )
};

const styles = StyleSheet.create({
    container: { marginTop: 30, },
    image: { width: '100%', height: '100%', },
    scrollView: { alignItems: 'center', paddingTop: 30 },
    item: { borderRadius: 20, overflow: 'hidden' },
    imageContainer: { position: "relative", justifyContent: 'center', },
    titleContainer: { backgroundColor: 'rgba(235,235,235,0.78)', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 999, },
    title: { fontFamily: 'BYekan', fontSize: RFValue(25), color: 'rgba(78,78,78,0.78)', margin: 10 }
})

export { Slider }