import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, FlatList, Linking, ActivityIndicator } from "react-native";
import { Courses } from "../../Common/dataArray";
import { Black, Blue, Gray, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { baseUrl, imageUrl } from '../../Common/Address';
import { useNavigation } from '@react-navigation/native';
import { isSet, JDate, useFetch } from '../../Common';

const Card_Articles = (props) => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [item, setItem] = useState([])
    const [itemLength, setItemLength] = useState(0)
    const { data, doFetch } = useFetch('guest/all-blogs')

    let page = 0;
    let count = 2;

    useEffect(() => {
        if (isSet(data)) {
            setItemLength(data["data"]["blogs"].length)
            setItem([...item, ...data["data"]["blogs"].slice(page, count)]);
        }
    }, [data])

    const fetch_data = () => {
        if (item.length < itemLength) {
            page = count;
            count = count + 2;
            setItem([...item, ...data["data"]["blogs"].slice(page, count)]);
        }
    }

    return (
        <View style={styles.container}>
            {
                isSet(data) ?
                    isSet(data["data"]["blogs"]) ?
                        <FlatList data={item} renderItem={({ item }) => {
                            return (
                                <Ripple onPress={() =>
                                    Linking.openURL(`https://azhman.online/site/article-view?id=${item["id"]}&title=${item["title"]}`)
                                } style={{ ...styles.card, height: width }}>
                                    <View style={styles.section1}>
                                        <Image style={styles.image}
                                            resizeMode={'cover'}
                                            resizeMethod={'resize'}
                                            source={{ uri: `${baseUrl}${imageUrl}articles/${item["banner"]}` }} />
                                    </View>
                                    <View style={styles.section2}>
                                        <Text style={[styles.text, styles.catText]}>{item['cat']["title"]}</Text>
                                        <Text style={[styles.text, styles.title]}>{item["title"]}</Text>
                                        <Text style={[styles.text, styles.modify_date]}>{JDate(item["modify_date"])}</Text>
                                        <Text style={[styles.text, styles.introduction]}>{item["introduction"]}</Text>
                                        <Text style={[styles.text, styles.otherText]}>ادامه مطلب</Text>
                                    </View>
                                </Ripple>
                            )
                        }}
                            keyExtractor={(item, index) => item.title + index}
                            ListEmptyComponent={() => Courses.map(() => <View style={{ ...styles.loadingCard, height: width }} />)}
                            onEndReached={() => fetch_data()}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => {
                                if (item.length < itemLength) {
                                    return (
                                        <ActivityIndicator color="green" size="large" />
                                    )
                                } else return null

                            }}
                        />
                        : <EmptyPage text={data["msg"]} />
                    : <FlatList data={Courses} renderItem={() => <View style={{ ...styles.loadingCard, height: 300 }} />} />
            }

        </View>
    )
}

export { Card_Articles };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: White,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        margin: 20,

    },
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    section1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#2095F2',
        overflow: 'hidden',
    },
    section2: {
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontFamily: 'BYekan',
        margin: 3
    },
    catText: {
        color: Blue,
        fontSize: RFValue(12)
    },
    title: {
        color: Black,
        fontSize: RFValue(16)
    },
    modify_date: {
        color: Gray,
        fontSize: RFValue(11)
    },
    introduction: {
        color: Gray,
        fontSize: RFValue(12),
        lineHeight: 25
    },
    otherText: {
        color: Blue,
        fontSize: RFValue(14),
    },
})