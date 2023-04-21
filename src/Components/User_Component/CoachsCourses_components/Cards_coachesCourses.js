import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions, FlatList } from "react-native";
import { Courses } from "../../Common/dataArray";
import { Black, Blue, White } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { baseUrl, imageUrl } from '../../Common/Address';
import { useNavigation } from '@react-navigation/native';
import { CourseItem } from '../../InitialValue/CourseItem';
import { useFetch, isSet, JDate, EmptyPage } from '../../Common';

const Cards_coachesCourses = (props) => {
    const { replace } = useNavigation();
    let cItem = new CourseItem();
    const { width, height } = useWindowDimensions();

    const { data, doFetch } = useFetch('course/list_course', false, 'POST', {
        idCatService: props.route.params.idCatService,
        idCoach: props.route.params.idCoach
    })

    let image = [];

    return (
        <View style={styles.container}>
            {
                isSet(data) ?
                    isSet(data["data"]) ?
                        <FlatList data={data["data"]} renderItem={({ item }) => {
                            item.image.forEach(item => {
                                image.push(item.name)
                            });
                            return (
                                <Ripple onPress={() =>
                                    replace('user', { screen: 'ServiceDetails', params: { idCourse: item["id"], goBack: props.route.name } })
                                } style={styles.card}>
                                    <View style={styles.section1}>

                                        {
                                            item.image != 'empty' ?
                                                <Image style={styles.image}
                                                    resizeMode={'cover'}
                                                    resizeMethod={'resize'}
                                                    source={{ uri: `${baseUrl}${imageUrl}course/${image[0]}` }} /> :
                                                <Image style={styles.image}
                                                    resizeMode={'contain'}
                                                    source={require('../../../assets/images/avatar.png')} />
                                        }
                                    </View>
                                    <View style={styles.section2}>
                                        <Text style={styles.titleText}>{item.name} {item.title}</Text>
                                        <Text style={styles.descriptoin}>
                                            {item.desShort}
                                        </Text>

                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{item.fewDays} روز</Text>
                                            <Text style={{ ...styles.otherText }}>مدت استفاده :</Text>
                                        </View>

                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{cItem.typeCourse(item.typeCourse)}</Text>
                                            <Text style={{ ...styles.otherText }}>نوع برگزاری دوره :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{cItem.isOnline(item.isOnline)}</Text>
                                            <Text style={{ ...styles.otherText }}>نحوه ارائه :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{cItem.type(item.type)}</Text>
                                            <Text style={{ ...styles.otherText }}>نوع دوره :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{JDate(item.registrStart)}</Text>
                                            <Text style={{ ...styles.otherText }}>تاریخ شروع ثبت نام :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{JDate(item.registrEnd)}</Text>
                                            <Text style={{ ...styles.otherText }}>تاریخ اتمام ثبت نام :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{JDate(item.dateStart)}</Text>
                                            <Text style={{ ...styles.otherText }}>تاریخ شروع دوره :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={{ ...styles.otherText }}>{JDate(item.dateEnd)}</Text>
                                            <Text style={{ ...styles.otherText }}>تاریخ اتمام دوره :</Text>
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <View>
                                                <Text style={{ ...styles.otherText, color: 'red', textDecorationLine: 'line-through' }}>{item.price} تومان</Text>
                                                <Text style={{ ...styles.otherText, color: 'green' }}>{item.priceDiscounted} تومان</Text>
                                            </View>
                                            <Text style={{ ...styles.otherText }}>قیمت :</Text>
                                        </View>

                                    </View>
                                </Ripple>
                            )
                        }}
                            keyExtractor={(item, index) => item.id + index}
                            ListEmptyComponent={() => Courses.map(() => <View style={{ ...styles.loadingCard, height: width }} />)}
                        />
                        : <EmptyPage text={data["msg"]} />
                    : <FlatList data={Courses} renderItem={() => <View style={{ ...styles.loadingCard, height: 300 }} />} />
            }

        </View>
    )
}

export default React.memo(Cards_coachesCourses);

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
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
        margin: 20,
        padding: 10
    },
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    section1: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#2095F2',
        overflow: 'hidden',
        height: 150,
        borderRadius: 20
    },
    section2: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // height:'80%'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleText: {
        fontSize: RFValue(16),
        fontFamily: 'BYekan',
        color: Black,
        color: Blue,
        margin: 10
    },
    descriptoin: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: `rgba(228, 228, 228,0.5)`,
        padding: 5,
        fontFamily: 'BYekan',
        fontSize: RFValue(12)
    },
    otherText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: Black
    }
})