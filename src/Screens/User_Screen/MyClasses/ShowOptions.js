import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderCourseDetailsOptions from '../../../Components/User_Component/MyClasses_components/RenderCourseDetailsOptions';
import { useFetch } from '../../../Components/Common';



const ShowOptions = ({ navigation, route }) => {

    const [pageStates, setpageStates] = React.useState({
        data: [],
    });

    const { data } = useFetch('datacourse/list_program_one_form', false, 'POST', {
        idForm: route.params.idDataCourse
    })

    React.useEffect(() => {
        if (data.hasOwnProperty("data") && data.data.length > 0) {
            setpageStates(prevStates => ({ ...prevStates, data: data.data }));
        }
    }, [data]);


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
            {/* page starts */}
            <FlatList
                style={{ width: "90%", }}
                showsVerticalScrollIndicator={false}
                data={pageStates.data}
                ListHeaderComponent={() => <><Text style={styles.stlViewText}>لیست این دوره</Text>
                    <View style={styles.stlHt}></View></>}
                ListFooterComponent={() => <><View style={{ height: 98 }}></View></>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => <RenderCourseDetailsOptions item={item.item} key={item.index} index={item.index} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    stlHt: { width: 150, height: 3, borderRadius: 30, backgroundColor: "red", alignSelf: "center", marginBottom: 30 },
    stlViewText: { color: "#808080", fontFamily: "BYekan", fontSize: 18, marginTop: 20, alignSelf: "center" },
    MainViewCourse: { width: "100%", flex: 1, backgroundColor: "#eaeaea", alignItems: "center" },
    mainViewHead: { width: "100%", height: 70, },
    View2x: { width: "100%", height: 54, backgroundColor: "#b8b8b8", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    midLogoView: { width: 60, height: 60, borderRadius: 100, marginBottom: -30, borderColor: "#ffffff", borderWidth: 4, zIndex: 20, backgroundColor: "#b8b8b8", justifyContent: "center", alignItems: "center", },

});

export default ShowOptions;