import { Dimensions, StyleSheet } from "react-native";
import { Black, Blue, White } from "../InitialValue/Colors";
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const Style = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'B Titr',
        fontSize: RFValue(14),
        color: Black
    },
    screenContainer: {
        backgroundColor: White,
        flex: 1,
    },
    menu: {
        button: {
            width: width / 7,
            height: width / 7,
            elevation: 5,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        },
        text: {
            fontSize: RFValue(12),
            fontWeight: 'bold',
            margin: 5,
            color: Black
        },
        btnContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        container: {
            flexDirection: 'row',
            paddingHorizontal: 30,
            justifyContent: 'center',
            marginVertical: 10
        },
    },
    buttons: {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 15,
            elevation: 10
        },
        button: {
            borderRadius: 5,
            elevation: 5,
            backgroundColor: White,
            paddingHorizontal: 20,
        },
        text: {
            fontFamily: 'B Titr',
            fontSize: RFValue(12)
        }
    },
    instagram: {
        row: { flexDirection: 'row', width: '100%' },
        rowWrap: { flexWrap: 'wrap' },
        flex: { flex: 1 },
        item1: { height: width / 3, width: width / 3, padding: 2 },
        item2: { height: width / 3 * 2, width: width / 3 * 2, padding: 3 },
        index: { color: '#fff', fontSize: 20, position: 'absolute', bottom: 5, right: 5 },
    },
    input: {

    },
    guest: {
        contentContainer: {
            backgroundColor: White,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            position: 'absolute',
            bottom: 0
        },
        perssable: {
            // paddingVertical: 5,
            // paddingHorizontal: 10,
            backgroundColor: Blue,
            borderRadius: 10,
            width: '55%',
            justifyContent: 'center',
            alignItems: 'center',
            // marginVertical: 20
        },
        pressableText: {
            color: White,
            fontSize: RFValue(20),
            fontFamily: 'BYekan',
        },
    }
})

export {Style}