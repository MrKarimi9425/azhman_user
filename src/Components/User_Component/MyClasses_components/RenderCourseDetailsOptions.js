import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Fontisto';
import { JDate, JTime } from '../../Common';

const RenderCourseDetailsOptions = ({ item, index, props }) => {

    console.log("------------------------", item)
    return (
        <View style={styles.optionViwBody}>
            <View style={styles.VirtopInp}>
                <Icon name="slack" size={20} color="#ffffff" />
            </View>
            <Text style={styles.optitleShort}>{item.title}</Text>
            <Text style={styles.optitleShort2}>{item.desShort}</Text>
            {/*  a row */}
            <View style={styles.ViewRows2}>
                <View style={styles.iconView}></View>
                <View style={styles.InsdieRpwView}>
                    <Text style={styles.StlViewX}>{item.type}</Text>
                    <Text style={styles.StlViewX}>نوع دوره : </Text>
                    <Icon name="paperclip" size={20} color="#ffffff" />
                </View>
            </View>
            {/*  a row */}
            <View style={styles.ViewRows2}>
                <View style={styles.iconView}></View>
                <View style={styles.InsdieRpwView}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.StlViewX}>{JDate(item.datePlay)}</Text>
                    <Text style={styles.StlViewX}>تاریخ پخش  : </Text>
                    <Icon name="clockcircleo" size={20} color="#ffffff" />
                </View>
            </View>
            {/*  a row */}
            <View style={styles.ViewRows2}>
                <View style={styles.iconView}></View>
                <View style={styles.InsdieRpwView}>

                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.StlViewX}>{JTime(item.dateStartLive)}</Text>
                    <Text style={styles.StlViewX}>شروع لایو  : </Text>
                    <Icon name="clockcircleo" size={20} color="#ffffff" />
                </View>
            </View>
            {/*  a row */}
            <View style={styles.ViewRows2}>
                <View style={styles.iconView}></View>
                <View style={styles.InsdieRpwView}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.StlViewX}>{JTime(item.dateEndLive)}</Text>
                    <Text style={styles.StlViewX}>پایان لایو  : </Text>
                    <Icon2 name="price-tag" size={20} color="#ffffff" />
                </View>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    VirtopInp: {
        width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 100, borderColor: "#ffffff",
        borderWidth: 3, backgroundColor: "#b8b8b8", alignSelf: "center", marginTop: -20
    },
    optionViwBody: { backgroundColor: "#9a9a9a", marginTop: 5, borderRadius: 20, paddingBottom: 24 },
    ViewRows2: {
        width: "90%", height: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        paddingHorizontal: 30, marginTop: 5, backgroundColor: "#868585", borderRadius: 100, alignSelf: "center"
    },
    iconView: { width: 12, height: 12, borderRadius: 100, borderWidth: 3, borderColor: "#ffffff", },
    InsdieRpwView: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    StlViewX: { fontFamily: "BYekan", fontSize: RFValue(10), color: "#ffffff", marginRight: 10, width: 80, textAlign: "right" },
    optitleShort2: {
        fontFamily: "BYekan", fontSize: 16, color: "#ffffff", alignSelf: "center", textAlign: "center",
        backgroundColor: "#868585", width: "90%", height: 40, textAlign: "center", lineHeight: 40, borderRadius: 100
    },
    optitleShort: {
        fontFamily: "BYekan", fontSize: 16, color: "#ffffff", alignSelf: "center", textAlign: "center",
        marginVertical: 10
    },
});


export default RenderCourseDetailsOptions;