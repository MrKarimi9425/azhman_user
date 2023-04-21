import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import { Black, Main } from '../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { removeStore } from '../../Storage/Async';
import { useNavigation } from '@react-navigation/native';
import { drawerData } from '../Common/dataArray';
import Ripple from 'react-native-material-ripple';

const CustomDrawer = props => {
    const { replace, navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/menu-bg.jpg')}
                style={styles.imageBackground}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.avatar}
                />
                <Text
                    style={styles.name}>
                    آژمان
                </Text>
            </ImageBackground>
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                {
                    drawerData.map((value, index) => <Ripple onPress={() => {
                        if (value["screen"] == 'explore') {
                            navigate('user', { screen: 'instagram', params: { screen: value["screen"] } })
                        } else {
                            navigate(value.screen)
                        }
                    }}
                        key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 10 }}>
                        <Text style={styles.text}>{value.text}</Text>
                        {
                            value.icon()
                        }
                    </Ripple>)
                }
            </View>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "خروج از حساب",
                        "آیا میخواهید از حساب فعلی خارج شوید؟",
                        [
                            {
                                text: "خیر",
                                onPress: () => {
                                    return null;
                                },
                            },
                            {
                                text: "بله همین الان!",
                                onPress: () => {
                                    removeStore('@auth_key').then(value => {
                                        if (value) {
                                            props.navigation.replace('guest', { screen: 'Login' })
                                        }
                                    })
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text
                            style={{
                                fontSize: RFValue(15),
                                fontFamily: 'BYekan',
                                marginRight: 5,
                                color: Black
                            }}>
                            خروج از حساب
                        </Text>
                        <Ionicons name="exit-outline" size={RFValue(20)} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { CustomDrawer };

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        padding: 20, justifyContent: 'flex-end', alignItems: 'flex-end'
    },
    avatar: {
        height: 80, width: 80, borderRadius: 40
    },
    name: {
        color: '#fff',
        fontSize: RFValue(18),
        fontFamily: 'BYekan',
        marginBottom: 5,
        marginRight: 10
    },
    text: {
        fontSize: RFValue(14),
        color: Black,
        fontFamily: 'BYekan',
        marginRight: 20
    }
})