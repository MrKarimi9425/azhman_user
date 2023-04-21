import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Linking,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { isSet, useFetch } from '../../../Components/Common';
import { baseUrl, imageUrl } from '../../../Components/Common/Address';
import { Blue_Header } from '../../../Components/Common/Blue_Header';
import { Black, Blue, Gray, White } from '../../../Components/InitialValue/Colors';
import { windowWidth } from '../../../utils/Dimensions';




function Profile(props) {
    const { id } = props.route.params;
    const { data } = useFetch('social/profile', false, 'POST', {
        id: id
    });
    const navigation = useNavigation();
    const [state, setState] = useState({
        profileImage: '',
        bio: '',
        tell: '',
        idUser: 0,
        phone: '',
        website: '',
        username: '',
        name: '',
        lastName: '',
        idInstagram: '',
        posts: [],
        story: []
    })

    useEffect(() => {
        if (isSet(data)) {
            const { userName, idInstagram, img, posts, story, idUser, bio, tell, website, mobile, name, lName, } = data.data;
            setState(prov => ({ ...prov, idUser: idUser, profileImage: img, username: userName, posts: posts, lastName: lName, name: name, idInstagram: idInstagram, story: story, bio: bio, tell: tell, website: website, mobile }))
        }
    }, [data, props.navigation])


    function Photos({ posts }) {
        const imgWidth = Dimensions.get('screen').width * 0.33333;
        return (
            <View style={{}}>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}
                >
                    {posts.map((photo, index) => {
                        const file = photo["media"].split('.');
                        const type = file[file.length - 1] == 'mp4' ? 'video' : 'image';
                        return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('post', { data: photo })}>
                                {
                                    type == 'video' ?
                                        <>
                                            <Image
                                                style={{ width: imgWidth, height: imgWidth }}
                                                source={{
                                                    uri: `${baseUrl}${imageUrl}social/${photo["poster"]}`,
                                                }} />
                                            <Image
                                                source={require('../../../assets/images/play.png')}
                                                resizeMode='cover' style={{ width: 30, height: 30, margin: 5, position: 'absolute' }} />
                                        </>
                                        :
                                        <Image
                                            style={{ width: imgWidth, height: imgWidth }}
                                            source={{
                                                uri: `${baseUrl}${imageUrl}social/${photo["media"]}`,
                                            }}
                                        />
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Blue_Header {...props} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <View style={styles.coverImage} />
                    <View style={styles.profileContainer}>
                        <View>
                            {/* Profile Image */}
                            <TouchableOpacity onPress={() => state.story.length != 0 && navigation.navigate('story', { story: state.story })} style={styles.profileImageView}>
                                <Image
                                    style={[styles.profileImage, state.story.length != 0 && { elevation: 10, borderColor: 'red' }]}
                                    source={{
                                        uri: `${baseUrl}${imageUrl}profile/${state.profileImage}`
                                    }}

                                />
                            </TouchableOpacity>
                            {/* Profile Name and Bio */}
                            <View style={styles.nameAndBioView}>
                                {<Text style={styles.userFullName}>{state.username}</Text>}
                            </View>
                            <View style={styles.profileInfoContainer}>
                                <Text style={styles.name}>{`${state.name} ${state.lastName}`}</Text>
                                {isSet(state.bio) && <Text style={styles.bio}>{state.bio}</Text>}
                                <View style={styles.mobilesContainer}>
                                    <Text onPress={() => Linking.openURL(`tel:${state.mobile}`)} style={{ ...styles.mobiles, ...styles.link }}>{state.mobile} / </Text>
                                    <Text onPress={() => Linking.openURL(`tel:${state.tell}`)} style={{ ...styles.mobiles, ...styles.link }}>{state.tell}</Text>
                                </View>
                                {isSet(state.idInstagram) && state.idInstagram != 'empty' && <Text style={styles.website}> صفحه اینستاگرام : <Text style={styles.link} onPress={() => { Linking.openURL(`instagram://user?username=${state.link}`) }}>{state.idInstagram}</Text></Text>}
                                {isSet(state.website) && <Text style={styles.website}> آدرس وبسایت : <Text style={styles.link} onPress={() => { Linking.openURL(state.website) }}>{state.website}</Text></Text>}
                            </View>
                            <TouchableOpacity onPress={() => {
                                navigation.replace('user', {
                                    screen: 'CoachsCourses',
                                    params: {
                                        idCatService: 1,
                                        idCoach: state.idUser,
                                        goBack: props.route.name
                                    }
                                })
                            }} style={styles.coursesButton}>
                                <Text style={styles.coursesButtonText}>لیست دوره ها</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Profile Content */}
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.profileContentButtonsView}>
                                <TouchableOpacity
                                    style={{
                                        ...styles.showContentButton
                                    }}
                                >
                                    <Text style={styles.showContentButtonText}>پست ها</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                state.posts.length != 0 ?
                                    <Photos posts={state.posts} /> :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'BYekan', fontSize: RFValue(16), color: Black }}>پستی وجود ندارد</Text>
                                    </View>
                            }
                        </View>
                    </View>
                </>
            </ScrollView>
        </View>
    );
}

export { Profile }

const styles = StyleSheet.create({
    coverImage: { height: 250, width: '100%', backgroundColor: Blue },
    profileContainer: {
        // height: 1000,
        backgroundColor: '#fff',
        marginTop: -100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    profileImageView: { alignItems: 'center', marginTop: -50 },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,

        borderWidth: 3,
        borderColor: '#fff',
        backgroundColor: Blue
    },
    nameAndBioView: { alignItems: 'center', marginTop: 10 },
    userFullName: { fontFamily: 'BYekan', fontSize: 26, color: Black },
    countsView: { flexDirection: 'row', marginTop: 20 },
    countView: { flex: 1, alignItems: 'center' },
    countNum: { fontFamily: 'SSBold', fontSize: 20 },
    countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' },
    interactButtonsView: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    interactButton: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#4b7bec',
        margin: 5,
        borderRadius: 4,
    },
    interactButtonText: {
        fontFamily: 'SSBold',
        color: '#fff',
        fontSize: 18,
        paddingVertical: 6,
    },
    profileContentButtonsView: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: '#f1f3f6',
    },
    showContentButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#000',
    },
    showContentButtonText: {
        fontFamily: 'BYekan',
        fontSize: 18,
    },
    profileInfoContainer: { padding: 10, alignItems: 'flex-end' },
    mobilesContainer: { flexDirection: 'row' },
    bio: { fontFamily: 'BYekan', lineHeight: 25, maxWidth: windowWidth / 1.5, fontSize: RFValue(14), color: Black },
    mobiles: { fontFamily: 'BYekan', fontSize: RFValue(14), color: Black, marginTop: 10 },
    website: { fontFamily: 'BYekan', fontSize: RFValue(12), color: Black, marginTop: 10 },
    link: { textDecorationLine: 'underline', color: Blue },
    name: { fontFamily: 'BYekan', fontSize: RFValue(14), marginBottom: 10, color: Gray },
    coursesButton: { backgroundColor: Blue, margin: 10, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 15 },
    coursesButtonText: { color: White, fontFamily: 'BYekan', fontSize: RFValue(12) }
});