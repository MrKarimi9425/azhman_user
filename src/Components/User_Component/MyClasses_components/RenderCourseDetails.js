import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import React from 'react';

import { SkypeIndicator } from 'react-native-indicators';
import { isSet, JDate } from '../../Common';

const RenderCourseDetails = ({ item, navigation, index, props }) => {

    const [pageStates, setPageStates] = React.useState({
        status: false,
    });

    const changeStatus = () => {
        if (pageStates.status) { setPageStates(prev => ({ ...prev, status: false })) }
        else { setPageStates(prev => ({ ...prev, status: true })) }
    }

    const RenderCourseDetails = ({ item }) => {
        const type = [
            { key: "follow", name: "پیگیری" },
            { key: "psychologyPrivate", name: "روانشناسی خصوصی" },
            { key: "psychologyPackage", name: "ارائه پکیج روانشناسی" },
            { key: "psychologyLive", name: "دوره روانشناسی پخش زنده" },
            { key: "psychiatryPrivate", name: "روانپزشکی خصوصی" },
            { key: "psychiatryPackage", name: "ارائه پکیج روانپزشکی" },
            { key: "psychiatryLive", name: "دوره روانپزشکی پخش زنده" },
            { key: "consultingPrivate", name: "مشاوره خصوصی" },
            { key: "consultingPackage", name: "ارائه پکیج مشاوره" },
            { key: "consultingLive", name: "دوره مشاوره پخش زنده" },
            { key: "process", name: "روند پیشرفت" },
            { key: "nutrition", name: "تغذیه" },
            { key: "analysisPhysical", name: "تحلیل بدنی" },
            { key: "sportsPrivate", name: "مربی خصوصی" },
            { key: "sportsProgram", name: "ارائه برنامه ورزشی" },
            { key: "sportsPackage", name: "ورزش در باشگاه" },
            { key: "sportsClub", name: "ورزش در باشگاه" },
            { key: "sportsLive", name: "ورزشی پخش زنده" },
            { key: "other", name: "موارد دیگر" },
        ];
        let typeX = type.find(i => i.key === item.type);


        return (
            <View style={styles.StlViEW} >
                <View style={styles.optionViwBody}>
                    <Text style={styles.optitleShort}>{item.title}</Text>
                    <Text style={styles.optitleShort2}>{item.desShort}</Text>
                    {/*  a row */}
                    <View style={styles.ViewRows2}>
                        <View style={styles.iconView}></View>
                        <View style={styles.InsdieRpwView}>
                            {
                                isSet(typeX) &&
                                <Text style={[styles.StlViewX, { fontSize: 10, }]}>{typeX["name"]}</Text>
                            }
                            <Text style={styles.StlViewX}>نوع دوره : </Text>
                            <Icon name="paperclip" size={20} color="#ffffff" />
                        </View>
                    </View>
                    {/*  a row */}
                    <View style={styles.ViewRows2}>
                        <View style={styles.iconView}></View>
                        <View style={styles.InsdieRpwView}>
                            <Text style={styles.StlViewX} adjustsFontSizeToFit numberOfLines={1}>{JDate(item.dateStart)}</Text>
                            <Text style={styles.StlViewX}>شروع دوره : </Text>
                            <Icon name="clockcircleo" size={20} color="#ffffff" />
                        </View>
                    </View>
                    {/*  a row */}
                    <View style={styles.ViewRows2}>
                        <View style={styles.iconView}></View>
                        <View style={styles.InsdieRpwView}>
                            <Text style={styles.StlViewX} adjustsFontSizeToFit numberOfLines={1}>{JDate(item.dateEnd)}</Text>
                            <Text style={styles.StlViewX}>پایان دوره : </Text>
                            <Icon name="clockcircleo" size={20} color="#ffffff" />
                        </View>
                    </View>
                    {/*  a row */}
                    <View style={styles.ViewRows2}>
                        <View style={styles.iconView}></View>
                        <View style={styles.InsdieRpwView}>
                            <Text style={styles.StlViewX}>{item.price}</Text>
                            <Text style={styles.StlViewX}>قیمت دوره : </Text>
                            <Icon2 name="price-tag" size={20} color="#ffffff" />
                        </View>
                    </View>
                    {/* btn */}
                    <TouchableOpacity style={styles.touchableAp}
                        onPress={() => { item.idDataCourse == 0 ? null : navigation.navigate("ShowOptions", { idDataCourse: item.idDataCourse }) }}>
                        <Text style={styles.StlText}>برسی این مورد</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    return (
        <View style={styles.MainView}>
            <TouchableOpacity style={styles.ViewHeadV} onPress={() => changeStatus()}>
                <Icon name="up" size={25} color="#ffffff" style={{ display: pageStates.status ? "none" : "flex" }} />
                <Icon name="down" size={25} color="#ffffff" style={{ display: pageStates.status ? "flex" : "none" }} />
                <View style={styles.RightHeadView}>
                    <Text style={styles.textHead}>{item.title}</Text>
                    <View style={styles.textVbynS}><Text style={styles.textNum}>{index + 1}</Text></View>
                </View>
            </TouchableOpacity>
            <View style={[styles.bodtView, { display: pageStates.status ? "flex" : "none" }]}>
                <View style={styles.TopIconBody}>
                    <Icon name="codepen" size={25} color="#ffffff" />
                </View>
                {/* short des */}
                <Text style={styles.shortDesText}>{item.title}</Text>
                {/* space hr */}
                <View style={styles.ViewHr}></View>
                {/*  des */}
                <Text style={styles.shortDesText2}>{item.desShort}</Text>
                {/*  a row */}
                <View style={styles.ViewRows}>
                    <View style={styles.iconView}></View>
                    <View style={styles.InsdieRpwView}>
                        <Text style={styles.StlViewX}>{item.typeCourse === "virtual" ? "مجازی" : "حضوری"}</Text>
                        <Text style={styles.StlViewX}> نوع برگزاری  :</Text>
                        <Icon name="notification" size={20} color="#ffffff" />
                    </View>
                </View>
                {/*  a row */}
                <View style={styles.ViewRows}>
                    <View style={styles.iconView}></View>
                    <View style={styles.InsdieRpwView}>
                        <Text style={styles.StlViewX}>{item.fewDays} روز</Text>
                        <Text style={styles.StlViewX}> مدت دوره  :</Text>
                        <Icon name="inbox" size={22} color="#ffffff" />
                    </View>
                </View>
                {/*  a row */}
                <View style={styles.ViewRows}>
                    <View style={styles.iconView}></View>
                    <View style={styles.InsdieRpwView}>
                        <Text style={styles.StlViewX} adjustsFontSizeToFit numberOfLines={1}>{JDate(item.dateStart)}</Text>
                        <Text style={styles.StlViewX}>شروع دوره : </Text>
                        <Icon name="clockcircleo" size={20} color="#ffffff" />
                    </View>
                </View>
                {/*  a row */}
                <View style={styles.ViewRows}>
                    <View style={styles.iconView}></View>
                    <View style={styles.InsdieRpwView}>
                        <Text style={styles.StlViewX} adjustsFontSizeToFit numberOfLines={1}>{JDate(item.dateEnd)}</Text>
                        <Text style={styles.StlViewX}>پایان دوره : </Text>
                        <Icon name="clockcircleo" size={20} color="#ffffff" />
                    </View>
                </View>
                {/*  a row */}
                <View style={styles.ViewRows}>
                    <View style={styles.iconView}></View>
                    <View style={styles.InsdieRpwView}>
                        <Text style={styles.StlViewX}>{item.price}</Text>
                        <Text style={styles.StlViewX}>قیمت دوره : </Text>
                        <Icon2 name="price-tag" size={20} color="#ffffff" />
                    </View>
                </View>
                {/* View Head */}

                <Text style={styles.OPTextHead}>امکانات دوره</Text>
                <View style={styles.HrView}></View>

                {/* Flat */}
                <FlatList
                    style={{ width: "100%", marginBottom: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={item.item}
                    ListHeaderComponent={() => <></>}
                    ListFooterComponent={() => <></>}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => RenderCourseDetails(item, props)}
                    ListEmptyComponent={() => <SkypeIndicator color='#a3a3a3' size={20} />}
                />
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    HrView: { width: 150, height: 3, backgroundColor: "red", borderRadius: 20, alignSelf: "center", marginBottom: 10 },
    touchableAp: {
        width: "90%", height: 40, backgroundColor: "#696969", borderRadius: 100, justifyContent: "center", alignItems: "center",
        borderWidth: 1, borderColor: "#ffffff", marginTop: 10, alignSelf: "center"
    },
    StlText: { fontFamily: "BYekan", color: "#ffffff", fontSize: 15, },
    ViewHr: { width: 150, height: 3, borderRadius: 30, backgroundColor: "#ffffff", alignSelf: "center", marginBottom: 30 },
    textNum: { color: "#ffffff", },
    optitleShort2: {
        fontFamily: "BYekan", fontSize: 16, color: "#ffffff", alignSelf: "center", textAlign: "center",
        backgroundColor: "#868585", width: "90%", height: 40, textAlign: "center", lineHeight: 40, borderRadius: 100
    },
    optitleShort: { fontFamily: "BYekan", fontSize: 16, color: "#ffffff", alignSelf: "center", textAlign: "center", marginVertical: 10 },
    optionViwBody: { backgroundColor: "#9a9a9a", marginTop: 5, borderRadius: 20, paddingBottom: 14 },
    OPTextHead: { fontFamily: "BYekan", fontSize: 18, color: "#ffffff", alignSelf: "center", marginTop: 20 },
    StlViEW: { width: "90%", alignSelf: "center", marginTop: 8 },
    shortDesText2: {
        fontFamily: "BYekan", fontSize: 16, color: "#ffffff", textAlign: "center", alignSelf: "center",
        width: "80%", marginBottom: 20
    },
    shortDesText: { fontFamily: "BYekan", fontSize: 20, color: "#ffffff", textAlign: "center", alignSelf: "center", marginTop: 10 },
    iconView: { width: 12, height: 12, borderRadius: 100, borderWidth: 3, borderColor: "#ffffff", },
    InsdieRpwView: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    StlViewX: { fontFamily: "BYekan", fontSize: 14, color: "#ffffff", marginRight: 10, width: 80, textAlign: "right", },
    MainView: { width: "100%", marginTop: 20, overflow: "hidden", },
    ViewHeadV: {
        width: "100%", height: 45, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "#b0b0b0", borderRadius: 100, paddingHorizontal: 15
    },
    RightHeadView: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    textHead: { fontFamily: "BYekan", fontSize: 18, color: "#ffffff", marginRight: 10, },
    textVbynS: {
        width: 30, height: 30, justifyContent: "center", alignItems: "center", borderRadius: 100, borderWidth: 1,
        borderColor: "#ffffff"
    },
    bodtView: { width: "100%", backgroundColor: "#b8b8b8", marginTop: 30, borderRadius: 30 },
    TopIconBody: {
        width: 50, height: 50, borderRadius: 100, borderWidth: 4, borderColor: "#ffffff", alignSelf: "center",
        marginTop: -20, backgroundColor: "#b8b8b8", justifyContent: "center", alignItems: "center"
    },
    ViewRows: {
        width: "90%", height: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        paddingHorizontal: 30, marginTop: 5, backgroundColor: "#b0b0b0", borderRadius: 100, alignSelf: "center"
    },
    ViewRows2: {
        width: "90%", height: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        paddingHorizontal: 30, marginTop: 5, backgroundColor: "#868585", borderRadius: 100, alignSelf: "center"
    },
});

export default RenderCourseDetails;