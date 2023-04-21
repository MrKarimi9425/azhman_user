import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Dimensions, FlatList, Image, Linking, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { isSet, useFetch } from "../../Common";
import { baseUrl, imageUrl } from "../../Common/Address";
// import LinearGradient from "react-native-linear-gradient";
import { Ads } from "../../Common/dataArray";
import { Pink, White } from "../../InitialValue/Colors";
const Width = Dimensions.get('window').width;

const Banner = (props) => {
    const { width, height } = useWindowDimensions();
    const { data } = useFetch('guest/home-ads');

    const [state, setState] = useState({
        data: []
    })

    useEffect(() => {
        if (isSet(data["data"])) {
            setState(prov => ({ ...props, data: data["data"]["banner"] }))
        }
    }, [data])

    return (
        <FlatList horizontal data={state.data} showsHorizontalScrollIndicator={false} pagingEnabled renderItem={({ item }) => {
            return (
                <Pressable onPress={() => Linking.openURL(item["url"])} style={{ width: width, height: width / 2, padding: 10, marginTop: 20 }}>
                    <Image resizeMode="contain"
                        resizeMethod="resize"
                        source={{ uri: `${baseUrl}${imageUrl}advertise/${item.file}` }} style={styles.image} />
                </Pressable>
            )
        }}
            keyExtractor={item => item.id}
        />
        // <Carousel
        //     data={Ads}
        //     autoplay={true}
        //     containerCustomStyle={{ marginTop: 40, }}
        //     style={{}}
        //     loop={true}
        //     autoplayDelay={10000}
        //     layout={'default'}
        //     renderItem={({ item, index }) => {
        //         return (
        //          
        //         )
        //     }}
        //     sliderWidth={width}
        //     itemWidth={width}
        // />
    )
}

export { Banner }

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
        alignSelf: 'center'
    },
})
