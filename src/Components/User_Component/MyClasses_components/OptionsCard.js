import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Courses } from '../../Common/dataArray'
import Ripple from 'react-native-material-ripple'
import { Black, Blue, White } from '../../InitialValue/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { windowWidth } from '../../../utils/Dimensions'

const OptionsCard = () => {
    return (
        <View style={styles.container}>
            {
                Courses.map((value, index) => {
                    return (
                        <Ripple key={index}
                        style={{ ...styles.card, width: '40%', height: windowWidth / 2.5 }}
                        >
                            <View style={styles.section1}>
                                {/* {
                                                    value.img != 'empty' ?
                                                        <Image style={styles.image}
                                                            resizeMode={'stretch'}
                                                            resizeMethod={'resize'}
                                                            source={{ uri: `${baseUrl}${imageUrl}profile/${value.img}` }} /> :
                                                        <Image style={styles.avatar} source={require('../../../assets/images/logo.png')} />
                                                } */}
                            </View>
                            <View style={styles.section2}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={styles.titleText}>{value.name} {value.lName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <View style={styles.contentText}>
                                        <Text style={styles.otherText}>امتیاز</Text>
                                        <Text style={styles.otherText}>4/5</Text>
                                    </View>
                                    <View style={styles.contentText}>
                                        <Text style={styles.otherText}>شاگردان</Text>
                                        <Text style={styles.otherText}>150</Text>
                                    </View>
                                    <View style={styles.contentText}>
                                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.otherText}>کلاس های فعال</Text>
                                        <Text style={styles.otherText}>100</Text>
                                    </View>
                                </View>
                            </View>
                        </Ripple>
                    )
                })
            }
        </View>
    )
}

export { OptionsCard }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: White,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        margin: 10,
        padding: 5
    },
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    contentText: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    section1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        backgroundColor: '#2095F2',
        overflow: 'hidden'
    },
    section2: {
        flex: 1.1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#1690FF',
        borderRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    avatar: {
        width: 50,
        height: 50
    },
    titleText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: Blue
    },
    descriptoin: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: `rgba(228, 228, 228,0.5)`,
        padding: 5,
        fontFamily: 'BYekan',
        fontSize: RFValue(8)
    },
    sec1Text: {
        color: White,
        backgroundColor: `rgba(173, 215, 228,0.5)`,
        width: '100%',
        textAlign: 'center'
    },
    otherText: {
        fontSize: RFValue(8),
        fontFamily: 'BYekan',
        color: Black
    }
})