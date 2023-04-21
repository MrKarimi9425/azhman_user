const { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, FlatList } = require("react-native")
import React, { useContext, useEffect } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import { VictoryChart, VictoryTheme, VictoryPie, VictoryLine, } from "victory-native";
import { Alert, isSet, JDate, useFetch } from '../../../Components/Common';
import { RFValue } from 'react-native-responsive-fontsize'
import { Context } from '../../../Storage/Context';

const Show_Analysis = ({ navigation }) => {
    const { data } = useFetch('analyzepro/analyze')
    const { openAlert, alertConfig } = useContext(Context)
    
    useEffect(() => {
        if (isSet(data)) {
            openAlert('warning', 'توجه', 'کاربر محترم تجزیه و تحلیل آنالیز بدنی را به مربی و کارشناس خود بسپارید و تحت هیچ شرایطی از این داده ها استفاده غیر تخصصی نکنید')
            console.log("server data : ", data["data"]["analyzeLast"]);
            if (data["res"] == 1) {
                if (isSet(data["data"]["analyze"])) {
                    let weightCat = data.data.analyze.map((item, index) => (index + 1) + "");
                    let weightData = [{ x: 0, y: 0 }];
                    weightData = weightData.concat(data.data.analyze.map((item, index) => ({ x: (index + 1), y: Number(item.weight) })));
                    let days = data.data.analyze.map((item) => JDate(item.date));

                    let waistCat = data.data.analyze.map((item, index) => (index + 1) + "");
                    let waistData = [{ x: 0, y: 0 }];
                    waistData = waistData.concat(data.data.analyze.map((item, index) => ({ x: (index + 1), y: Number(item.waist) })));

                    let bfpCat = data.data.analyze.map((item, index) => (index + 1) + "");
                    let bfpData = [{ x: 0, y: 0 }];
                    bfpData = bfpData.concat(data.data.analyze.map((item, index) => ({ x: (index + 1), y: Number(item.bfp) })));

                    let fmAdditionCat = data.data.analyze.map((item, index) => (index + 1) + "");
                    let fmAdditionData = [{ x: 0, y: 0 }];
                    fmAdditionData = fmAdditionData.concat(data.data.analyze.map((item, index) => ({ x: (index + 1), y: Number(item.fmAddition) })));

                    let fatData = [{ x: "", y: Number(data.data.analyzeLast.lm) }, { x: "", y: Number(data.data.analyzeLast.fmAddition) },
                    { x: "", y: Number(data.data.analyzeLast.fmAllowed) }, {
                        x: "", y: Number(data.data.analyzeLast.fm)
                    }];

                    let bmiChangerColor = "purple"
                    if (Math.floor(data.data.analyzeLast.bmi) < 32) {
                        bmiChangerColor = "green";
                    } else if (Math.floor(data.data.analyzeLast.bmi) < 38) {
                        bmiChangerColor = "yellow";
                    } else if (Math.floor(data.data.analyzeLast.bmi) > 38) {
                        bmiChangerColor = "red";
                    }
                    setPageStates(prevStates => ({
                        ...prevStates, data: data.data.analyze, dataLength: data.data.analyze.length,
                        analyzeLast: data.data.analyzeLast, weightCat, weightData,
                        fromDate: JDate(data.data.analyze[0].date),
                        toDate: JDate(data.data.analyze[(data.data.analyze.length - 1)].date),
                        days, waistCat, waistData, bfpCat, bfpData, fmAdditionCat, fmAdditionData, fatData,
                        bmrPerDay: data.data.analyzeLast.bmr, activity: data.data.activity,
                        bmi: data.data.analyzeLast.bmi, bmiColor: bmiChangerColor,
                    }));
                } else {
                    navigation.navigate('user', { screen: 'Submit_Analysis' })
                }
            }
        }
    }, [data])

    const [pageStates, setPageStates] = React.useState({
        analyze: [],
        analyzeLast: {},
        dataLength: 0,
        days: [],

        weightData: [],
        weightCat: [],

        waistData: [],
        waistCat: [],

        bfpData: [],
        bfpCat: [],

        fmAdditionData: [],
        fmAdditionCat: [],

        fatData: [],

        fromDate: "",
        toDate: "",

        bmrPerDay: "",
        activity: [],

        bmi: 36.2,
        bmiColor: "purple",
    });


    return (
        <View style={styles.stlMainView}>
            <StatusBar barStyle="light-content" backgroundColor="#eaeaea" />
            {/* header */}
            <View style={styles.mainViewHead}>
                <View style={styles.View2x}>
                    <View style={styles.midLogoView}>
                        <Icon3 color={"red"} size={24} name={"linechart"} style={styles.headerLogoX} />
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.stlScrolView} >
                <View style={styles.StlViewSin}>
                    {/* page starts */}
                    <TouchableOpacity style={styles.BTnPage} onPress={() => { navigation.navigate('user', { screen: 'Submit_Analysis' }) }}>
                        <Text style={styles.EndBTn}>ثبت اطلاعات بدن</Text>
                    </TouchableOpacity>
                    {/* page label */}
                    <Text style={styles.TextHead}>اطلاعات بدنی کاربر</Text>
                    <View style={styles.ViewHR}></View>
                    {/* head speech */}
                    <View style={styles.StlViewData}>
                        {/* item 1 */}
                        <View style={styles.Itemx1}>
                            <View style={styles.iconSpan}><Icon2 color={"#b8b8b8"} size={23} name={"date"} /></View>
                            <Text style={styles.stlTextx1}>تعداد روزها</Text>
                            <View style={styles.VirwHER}></View>
                            <Text style={styles.stlTextx1}>{pageStates.dataLength} روز </Text>
                        </View>
                        {/* item 2 */}
                        <View style={styles.Itemx1}>
                            <View style={styles.iconSpan}><Icon3 color={"#b8b8b8"} size={23} name={"sharealt"} /></View>
                            <Text style={styles.stlTextx1}> از تاریخ</Text>
                            <View style={styles.VirwHER}></View>
                            <Text style={styles.stlTextx1}>{pageStates.fromDate}</Text>
                        </View>

                        {/* item 3 */}
                        <View style={styles.Itemx1}>
                            <View style={styles.iconSpan}><Icon3 color={"#b8b8b8"} size={23} name={"flag"} /></View>
                            <Text style={styles.stlTextx1}> تا تاریخ</Text>
                            <View style={styles.VirwHER}></View>
                            <Text style={styles.stlTextx1}>{pageStates.toDate}</Text>
                        </View>

                    </View>

                    {/* ----- part 1 - weight */}
                    <View style={styles.ViewlBel}>
                        <Text style={styles.textTitle}>نمودار وزن</Text>
                        <View style={styles.ViewHrE}>
                            <Icon1 color={"#b8b8b8"} size={23} name={"weight-lifter"} />
                        </View>

                    </View>

                    <VictoryChart theme={VictoryTheme.material} >
                        <VictoryLine
                            categories={{ x: pageStates.weightCat }}
                            style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc" } }}
                            labels={({ datum }) => datum.y}
                            data={pageStates.weightData}
                        />
                    </VictoryChart>


                    {/* ----- part 5 - fat */}
                    <View style={styles.ViewlBel}>
                        <Text style={styles.textTitle}> نمودار وزن اضافه  </Text>
                        <View style={styles.ViewHrE}>
                            <Icon3 color={"#b8b8b8"} size={20} name={"dotchart"} />
                        </View>
                    </View>
                    {/* colors */}
                    <View style={styles.stlViewSS}>
                        {/* item color */}
                        <View style={styles.StlViewsse}>
                            <Text style={styles.StlViewwS}>بدن بدون چربی</Text>

                            <View style={[styles.SpanOFColor, { backgroundColor: "tomato" }]}>
                                <Icon3 name="staro" size={25} color="#ffffff" />
                            </View>
                        </View>
                        {/* item color */}
                        <View style={styles.StlViewsse}>
                            <Text style={styles.StlViewwS}>چربی اضافه</Text>

                            <View style={[styles.SpanOFColor, { backgroundColor: "purple" }]}>
                                <Icon3 name="sharealt" size={25} color="#ffffff" />
                            </View>
                        </View>

                    </View>
                    {/* colors */}
                    <View style={styles.stlViewSS}>
                        {/* item color */}
                        <View style={styles.StlViewsse}>
                            <Text style={styles.StlViewwS}>چربی مجاز</Text>

                            <View style={[styles.SpanOFColor, { backgroundColor: "gold" }]}>
                                <Icon3 name="Safety" size={25} color="#ffffff" />
                            </View>
                        </View>
                        {/* item color */}
                        <View style={styles.StlViewsse}>
                            <Text style={styles.StlViewwS}>کل چربی بدن</Text>

                            <View style={[styles.SpanOFColor, { backgroundColor: "cyan" }]}>
                                <Icon3 name="tagso" size={25} color="#ffffff" />
                            </View>
                        </View>

                    </View>
                    {
                        console.log(pageStates.fatData)
                    }
                    <VictoryPie
                        labels={({ datum }) => ""}
                        cornerRadius={({ datum }) => 15}
                        colorScale={["tomato", "purple", "gold", "cyan"]}
                        data={pageStates.fatData}
                    />





                    {/* ----- part 2 - weight */}
                    <View style={styles.ViewlBel}>
                        <Text style={styles.textTitle}>نمودار دور کمر</Text>
                        <View style={styles.ViewHrE}>
                            <Icon4 color={"#b8b8b8"} size={23} name={"body"} />
                        </View>

                    </View>
                    <VictoryChart theme={VictoryTheme.material} >
                        <VictoryLine
                            categories={{ x: pageStates.waistCat }}
                            style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc" } }}
                            labels={({ datum }) => datum.y}
                            data={pageStates.waistData}
                        />
                    </VictoryChart>


                    {/* BMR PER DAy */}
                    <View style={[styles.stlBMR]}>
                        <Text style={styles.TextxL}>انرژی مورد نیاز در روز</Text>
                        <View style={styles.ViewHr11}></View>
                        <Text style={styles.TextxL}>بدن شما برای ماندن در این وزن روزانه به {pageStates.bmrPerDay}  کیلو کالری نیاز دارد</Text>
                    </View>
                    {/* ----- part 3 - bfp */}
                    <View style={styles.ViewlBel}>
                        <Text style={styles.textTitle}> درصد چربی </Text>
                        <View style={styles.ViewHrE}>
                            <Icon5 color={"#b8b8b8"} size={23} name={"child-care"} />
                        </View>

                    </View>
                    <VictoryChart theme={VictoryTheme.material} >
                        <VictoryLine
                            categories={{ x: pageStates.bfpCat }}
                            style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc" } }}
                            labels={({ datum }) => datum.y}
                            data={pageStates.bfpData}
                        />
                    </VictoryChart>
                    {/* Check bmi or bmr wjat */}
                    <View style={[styles.stlBMR2, { backgroundColor: pageStates.bmiColor }]}>
                        <Text style={styles.textBMI}>درصد چاقی شما {pageStates.bmi}  میباشد</Text>
                    </View>
                    {/* ----- part 4 - fmAddition */}
                    <View style={styles.ViewlBel}>
                        <Text style={styles.textTitle}> نمودار وزن اضافه  </Text>
                        <View style={styles.ViewHrE}>
                            <Icon5 color={"#b8b8b8"} size={23} name={"child-care"} />
                        </View>

                    </View>
                    <VictoryChart theme={VictoryTheme.material} >
                        <VictoryLine
                            categories={{ x: pageStates.fmAdditionCat }}
                            style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc" } }}
                            labels={({ datum }) => datum.y}
                            data={pageStates.fmAdditionData}
                        />
                    </VictoryChart>

                    {/* ----- part 6 - suggestion */}
                    <View style={styles.ViewlBel}>
                        <Text style={styles.textTitle}> توصیه های مربی شما  </Text>
                        <View style={styles.ViewHrE}>
                            <Icon3 color={"#b8b8b8"} size={23} name={"dingding"} />
                        </View>
                    </View>



                    {pageStates.activity.map((item, index) => {
                        return <View style={styles.stlViee} key={index}>
                            <View style={styles.HeadView} >
                                <Text style={styles.Textjs}>{item.title}</Text>
                                <View style={styles.IconView}><Text style={styles.icontext}>{index + 1}</Text></View>
                            </View>
                            <Text style={styles.Textsxs}>{item.des}</Text>
                        </View>
                    })}



                </View>
            </ScrollView>
            <Alert
                title={alertConfig.title}
                message={alertConfig.message}
                onPress={alertConfig.onPress}
                type={alertConfig.type}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textBMI: { color: "#ffffff", fontFamily: "BYekan", fontSize: 14, },
    EndBTn: { fontFamily: "BYekan", color: "#ffffff", fontSize: 15 },
    BTnPage: {
        width: "90%", height: 45, justifyContent: "center", alignItems: "center", backgroundColor: "#8951de", borderRadius: 50,
        marginVertical: 50,
    },
    Textjs: { color: "#ffffff", fontFamily: "BYekan", fontSize: 14, marginRight: 10 },
    Textsxs: { fontFamily: "BYekan", fontSize: 14, color: "#808080", padding: 20 },
    icontext: { color: "#808080" },
    IconView: {
        width: 30, height: 30, justifyContent: "center", alignItems: "center", marginHorizontal: 5, borderRadius: 100,
        backgroundColor: "#ffffff"
    },
    HeadView: {
        width: "100%", height: 45, flexDirection: "row", justifyContent: "flex-end", alignItems: "center",
        backgroundColor: "#b8b8b8", paddingHorizontal: 10
    },
    stlViee: { width: "85%", backgroundColor: "red", alignSelf: "center", marginTop: 20, backgroundColor: "#eaeaea", borderRadius: 20, overflow: "hidden" },
    TextCoj2: { fontSize: 18, color: "#808080", fontFamily: "BYekan", marginBottom: 100, marginTop: 20 },
    ViewHr11: { width: "70%", height: 3, backgroundColor: "#ff0000", marginTop: 3, marginBottom: 4, borderRadius: 30, },
    TextxL: { color: "#ffffff", fontSize: 17, fontFamily: "BYekan", textAlign: "center" },
    stlBMR2: {
        width: "90%", height: 60, borderRadius: 20, backgroundColor: "#b8b8b8", marginTop: 20, justifyContent: "center",
        alignItems: "center", padding: 10
    },
    stlBMR: {
        width: "90%", height: 100, borderRadius: 30, backgroundColor: "#b8b8b8", marginTop: 20, justifyContent: "center",
        alignItems: "center", padding: 10
    },
    SpanOFColor: {
        width: 35, height: 35, borderRadius: 50, justifyContent: "center", alignItems: "center",
        backgroundColor: "#ffffff",
    },
    StlViewwS: { color: "#808080", fontFamily: "BYekan", fontSize: 14, marginRight: 10 },
    StlViewsse: {
        width: "48%", height: 50, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", backgroundColor: "#eaeaea", borderRadius: 10,
        paddingHorizontal: 10
    },
    stlViewSS: { width: "90%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 20 },
    StlVieew: { width: 100, height: 30, borderRadius: 30, backgroundColor: "#b8b8b8", },
    StlViewXE: { width: "90%", justifyContent: "center", alignItems: "center" },
    VirwHER: { width: 80, height: 2, backgroundColor: "#ff0000", marginTop: 3, },
    stlTextx1: { color: "#ffffff", fontSize: 13, fontFamily: "BYekan", marginTop: 8 },
    iconSpan: { width: 50, height: 50, backgroundColor: "#ffffff", borderRadius: 50, marginTop: 15, justifyContent: "center", alignItems: "center", },
    Itemx1: { width: 100, height: 150, backgroundColor: "#b8b8b8", borderRadius: 20, justifyContent: "flex-start", alignItems: "center", },
    StlViewData: { width: "90%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 30 },
    textTitle: { color: "#ffffff", fontSize: 18, fontFamily: "BYekan", marginRight: 10, },
    ViewHrE: { padding: 4, backgroundColor: "#ffffff", borderRadius: 50 },
    ViewlBel: {
        width: "94%", height: 40, backgroundColor: "#b8b8b8", flexDirection: "row", paddingHorizontal: 10, borderRadius: 30,
        justifyContent: "flex-end", marginTop: 35, alignItems: "center"
    },
    ViewHR: { width: 190, height: 3, backgroundColor: "red", borderRadius: 30, marginTop: 5, },
    TextHead: { fontFamily: "BYekan", fontSize: 20, color: "#808080", marginTop: 20 },
    StlViewSin: { width: "100%", flex: 1, justifyContent: "center", alignItems: "center", },
    stlScrolView: { width: "100%", flex: 1 },
    stlMainView: { width: "100%", flex: 1, backgroundColor: "#ffffff" },
    mainViewHead: { width: "100%", height: 70, },
    View2x: {
        width: "100%", height: 54, backgroundColor: "#eaeaea", flexDirection: "row", justifyContent: "space-around",
        alignItems: "center", borderBottomLeftRadius: 30, borderBottomRightRadius: 30
    },
    midLogoView: {
        width: 60, height: 60, borderRadius: 100, marginBottom: -30, borderColor: "#ffffff", borderWidth: 4, zIndex: 20,
        backgroundColor: "#eaeaea", justifyContent: "center", alignItems: "center",
    },
});
export default Show_Analysis;