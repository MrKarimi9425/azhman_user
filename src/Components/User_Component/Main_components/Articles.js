import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Courses } from "../../Common/dataArray";
import { Black, Blue, Gray, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { useFetch } from '../../Common';
import { baseUrl, imageUrl } from '../../Common/Address';
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react';

const Articles = (props) => {
    const width = 320;
    const navigation = useNavigation()

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={{ ...styles.other }} onPress={() => navigation.replace('user', { screen: 'articles' })}>نمایش همه</Text>
                <Text style={{ ...styles.title }}>جدیدترین مقالات آژمان</Text>
            </View>
            <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
                {
                    typeof props["data"] !== 'undefined' ?
                    "blogs" in props["data"] &&
                        props['data']["blogs"].map((value, index) => {
                            return (
                                <View
                                    key={index} style={{ ...styles.card, width: width / 1.5, height: width / 1.3 }}>
                                    <View style={styles.section1}>
                                        {
                                            value.img != 'empty' ?
                                                <Image style={styles.image}
                                                    resizeMode={'stretch'}
                                                    resizeMethod={'resize'}
                                                    source={{ uri: `${baseUrl}${imageUrl}articles/${value.banner}` }} /> :
                                                <Image style={styles.avatar} source={require('../../../assets/images/logo.png')} />
                                        }
                                    </View>
                                    <View style={styles.section2}>
                                        <Text style={styles.articleTitle}>{value["title"]}</Text>
                                        <Text style={styles.introduction} numberOfLines={2}>{value['introduction']}</Text>
                                        <Text onPress={() => Linking.openURL(`https://azhman.online/site/article-view?id=${value["id"]}&title=${value["title"]}`)} style={{ ...styles.introduction, fontSize: RFValue(14), margin: 5, color: Blue }}>ادامه مطلب ...</Text>
                                    </View>

                                </View>
                            )
                        })
                        : Courses.map((value, index) => {
                            return (
                                <View key={index} style={{ ...styles.loadingCard, width: width / 2, height: width / 1.5 }} />
                            )
                        })
                }
            </ScrollView>
        </>
    )
}

export { Articles }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: White,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        margin: 10,
    },
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    line: {
        backgroundColor: Black,
        height: 0.5,
        width: '50%',
        alignSelf: 'center',
        margin: 10
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(16),
        color: Black,
        marginTop: 25
    },
    other: {
        fontFamily: 'BYekan',
        fontSize: RFValue(14),
        color: Gray,
        marginTop: 25
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    section1: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#2095F2',
        overflow: 'hidden'
    },
    section2: {
        padding: 10
    },
    articleTitle: {
        fontFamily: 'BYekan',
        fontSize: RFValue(16),
        color: Black,
    },
    introduction: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Gray,
    },
    image: {
        width: '100%',
        height: '100%'
    },
})