import { View, StyleSheet, Text, FlatList } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RenderCourseDetails from '../../../Components/User_Component/MyClasses_components/RenderCourseDetails';
import { useFetch } from '../../../Components/Common';



const MyClasses = ({ route, navigation }) => {
    const [pageStates, setPageStates] = React.useState({
        courseActive: [],
        courseOld: [],
        courseFuture: [],
        courseRequest: [],
        flatMessage: "",
        data: [],
        status: "active",
        msgShow: false,
    });
    //  func which is using to send data to server
    const { data } = useFetch('course/list_course_user')

    // we get data from server using useffect and Connect JS file provided in core page
    React.useEffect(() => {
        if (data.hasOwnProperty("data") && data.data.hasOwnProperty("courseActive")) {
            setPageStates(prevStates => ({
                ...prevStates, courseActive: data.data.courseActive, courseOld: data.data.courseOld,
                courseFuture: data.data.courseFuture, courseRequest: data.data.courseRequest, data: data.data.courseActive
            }));
        }

    }, [data])
    // Screen View
    return (
        <View style={styles.MainViewCourse}>
            {/* Page top Header  */}
            <View style={styles.mainViewHead}>
                <View style={styles.View2x}>
                    <View style={styles.midLogoView}>
                        <Icon color={"red"} size={24} name={"home"} style={styles.headerLogoX} />
                    </View>
                </View>
            </View>
            {/* page Starts Here */}

            <FlatList
                style={{ width: "90%", }}
                showsVerticalScrollIndicator={false}
                data={pageStates.data}
                ListHeaderComponent={() => <>
                    <View style={styles.stlRowStop}>
                        <TouchableOpacity style={[styles.stlTouch, { marginRight: 20 }]} onPress={() => { setPageStates(prevStates => ({ ...prevStates, data: prevStates.courseOld, msgShow: prevStates.courseOld.length ? false : true, status: "old" })) }}>
                            <Icon2 name="tagso" size={30} color="#ffffff" />
                            <Text style={[styles.textInsoxeBox, { color: pageStates.status === "old" ? "red" : "#ffffff" }]}>دوره های گذشته</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.stlTouch} onPress={() => { setPageStates(prevStates => ({ ...prevStates, data: prevStates.courseActive, msgShow: prevStates.courseActive.length ? false : true, status: "active" })) }}>
                            <Icon2 name="staro" size={30} color="#ffffff" />
                            <Text style={[styles.textInsoxeBox, { color: pageStates.status === "active" ? "red" : "#ffffff" }]}>دوره های فعال</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stlRowStop}>
                        <TouchableOpacity style={[styles.stlTouch, { marginRight: 20 }]} onPress={() => { setPageStates(prevStates => ({ ...prevStates, data: prevStates.courseFuture, msgShow: prevStates.courseFuture.length ? false : true, status: "future" })) }}>
                            <Icon2 name="database" size={30} color="#ffffff" />
                            <Text style={[styles.textInsoxeBox, { color: pageStates.status === "future" ? "red" : "#ffffff" }]}>دوره های آینده</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.stlTouch}
                            onPress={() => { setPageStates(prevStates => ({ ...prevStates, data: prevStates.courseRequest, msgShow: prevStates.courseRequest.length ? false : true, status: "request" })) }}>
                            <Icon2 name="flag" size={30} color="#ffffff" />
                            <Text style={[styles.textInsoxeBox, { color: pageStates.status === "request" ? "red" : "#ffffff" }]}>دوره های درخواستی</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textStl}>دوره ها</Text><View style={styles.hrView}></View></>}
                ListFooterComponent={() => <Text style={[styles.texrIye, { display: pageStates.msgShow ? "flex" : "none" }]}>موردی وجود ندارد</Text>
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => <RenderCourseDetails item={item.item} key={item.index} index={item.index} navigation={navigation} />}
            />
        </View>
    )
}

//  screen Styles
const styles = StyleSheet.create({
    hrView: { width: 150, height: 3, borderRadius: 20, backgroundColor: "red", alignSelf: "center", marginBottom: 20 },
    textStl: { fontFamily: "BYekan", fontSize: 22, color: "#808080", alignSelf: "center", marginTop: 20 },
    texrIye: { fontSize: 16, fontFamily: "BYekan", color: "#808080", alignSelf: "center", marginTop: 30 },
    textInsoxeBox: { fontFamily: "BYekan", fontSize: 14, color: "#ffffff", marginTop: 7, },
    stlTouch: { width: 150, height: 100, justifyContent: "center", alignItems: "center", borderRadius: 14, backgroundColor: "#b8b8b8", },
    stlRowStop: { width: "100%", marginTop: 15, flexDirection: "row", justifyContent: "center", alignItems: "center", },
    MainViewCourse: { width: "100%", flex: 1, backgroundColor: "#ffffff", alignItems: "center" },
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
// File exporetd 
export default MyClasses;