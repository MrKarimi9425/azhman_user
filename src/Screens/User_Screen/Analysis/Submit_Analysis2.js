import React from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/Entypo';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons';
import { BallIndicator } from 'react-native-indicators';
// import {Picker} from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFetch } from '../../../Components/Common';


const Submit_Analysis = ({ navigation, route }) => {
    const { doFetch } = useFetch('analyzepro/add')

    const sendImageToServer = (body, side) => {
        if (side === "left") {
            setPageStates(prevStates => ({ ...prevStates, LoadingImageLeft: "flex", imageIsUploading: true }));
        } else if (side === "front") {
            setPageStates(prevStates => ({ ...prevStates, LoadingImageFront: "flex", imageIsUploading: true }));
        } else if (side === "right") {
            setPageStates(prevStates => ({ ...prevStates, LoadingImageRight: "flex", imageIsUploading: true }));
        } else if (side === "back") {
            setPageStates(prevStates => ({ ...prevStates, LoadingImageBack: "flex", imageIsUploading: true }));
        } else if (side === "other") {
            setPageStates(prevStates => ({ ...prevStates, LoadingImageOther: "flex", imageIsUploading: true }));
        }

        const setImageName = () => {
            if (side === "left") {
                setPageStates(prevStates => ({ ...prevStates, ImageLeftName: data.data.name, LoadingImageLeft: "none", imageLeftTick: "flex", imageIsUploading: false }));
            } else if (side === "front") {
                setPageStates(prevStates => ({ ...prevStates, ImageFrontName: data.data.name, LoadingImageFront: "none", imageFrontTick: "flex", imageIsUploading: false }));
            } else if (side === "right") {
                setPageStates(prevStates => ({ ...prevStates, ImageRightName: data.data.name, LoadingImageRight: "none", imageRightTick: "flex", imageIsUploading: false }));
            } else if (side === "back") {
                setPageStates(prevStates => ({ ...prevStates, ImageBackName: data.data.name, LoadingImageBack: "none", imageBackTick: "flex", imageIsUploading: false }));
            } else if (side === "other") {
                setPageStates(prevStates => ({ ...prevStates, ImageOtherName: data.data.name, LoadingImageOther: "none", imageOtherTick: "flex", imageIsUploading: false }));
            }

        };
    }

    const [pageStates, setPageStates] = React.useState({
        errorPlace: "",
        ErrorMessage: "",
        isLoading: "none",
        height: "",
        weight: "",
        age: "",
        aroundWrist: "",
        waist: "",
        aroundArm: "",
        aroundRhigh: "",
        aroundNeck: "",
        des: "",
        gender: "",
        genderKey: "",
        activityRate: "",
        activityRateKey: "",
        imageFrontTick: "none",
        imageLeftTick: "none",
        imageRightTick: "none",
        imageBackTick: "none",
        imageOtherTick: "none",
        LoadingImageLeft: "none",
        LoadingImageFront: "none",
        LoadingImageRight: "none",
        LoadingImageBack: "none",
        LoadingImageOther: "none",
        ImageLeftName: "",
        ImageFrontName: "",
        ImageRightName: "",
        ImageBackName: "",
        ImageOtherName: "",
        imageIsUploading: false
    });

    const PressSubmiteBtnAnalize = async () => {
        if (pageStates.age === "") {
            setPageStates(prevStates => ({ ...prevStates, errorPlace: "age", ErrorMessage: "لطفا سن خور را وارد کنید" }));
        } else if (pageStates.weight === "") {
            setPageStates(prevStates => ({ ...prevStates, errorPlace: "weight", ErrorMessage: "لطفا وزن خود را وارد کنید" }));
        } else if (pageStates.height === "") {
            setPageStates(prevStates => ({ ...prevStates, errorPlace: "height", ErrorMessage: "لطفا قد خود را وارد کنید" }));
        } else if (pageStates.genderKey === "") {
            setPageStates(prevStates => ({ ...prevStates, errorPlace: "gender", ErrorMessage: "لطفا جنسیت خود را مشخض کنید" }));
        } else {
            setPageStates(prevStates => ({ ...prevStates, errorPlace: "", ErrorMessage: "", isLoading: "flex" }));
            SendPRequest("analyzepro/add", {
                height: pageStates.height,
                weight: pageStates.weight,
                age: pageStates.weight,
                gender: pageStates.genderKey,
                activityRate: pageStates.activityRateKey,
                aroundWrist: pageStates.aroundWrist,
                waist: pageStates.waist,
                aroundArm: pageStates.aroundArm,
                aroundRhigh: pageStates.aroundRhigh,
                photoOpposite: pageStates.ImageFrontName,
                photoBack: pageStates.ImageBackName,
                photoRight: pageStates.ImageBackName,
                photoLeft: pageStates.ImageLeftName,
                file: pageStates.ImageOtherName,
                neck: pageStates.aroundNeck,
                des: pageStates.des
            }
                , await AsyncStorage.getItem("auth_key")).then(data => {
                    console.log("data from server : ", data);
                    setPageStates(prevStates => ({ ...prevStates, isLoading: "none" }));
                    if (data.hasOwnProperty("data") && data.data.hasOwnProperty("active")) {
                        navigation.navigate("ShowAnalize");
                    } else {
                        console.log("Error from server", data);
                    }
                });
        }
    };


    const openImageGalleryLeft = () => {
        launchImageLibrary({ mediaType: "photo", }, res => {
            console.log("gallerty res : ", res);
            if (res.hasOwnProperty("assets")) {
                sendImageToServer(res.assets, "left");
            }
        });
    }
    const openImageGalleryFront = () => {
        launchImageLibrary({ mediaType: "photo", }, res => {
            console.log("gallerty res : ", res);
            if (res.hasOwnProperty("assets")) {
                sendImageToServer(res.assets, "front");
            }
        });
    }
    const openImageGalleryRight = () => {
        launchImageLibrary({ mediaType: "photo", }, res => {
            console.log("gallerty res : ", res);
            if (res.hasOwnProperty("assets")) {
                sendImageToServer(res.assets, "right");
            }
        });
    }
    const openImageGalleryBack = () => {
        launchImageLibrary({ mediaType: "photo", }, res => {
            console.log("gallerty res : ", res);
            if (res.hasOwnProperty("assets")) {
                sendImageToServer(res.assets, "back");
            }
        });
    }
    const openImageGalleryOther = () => {
        launchImageLibrary({ mediaType: "photo", }, res => {
            console.log("gallerty res : ", res);
            if (res.hasOwnProperty("assets")) {
                sendImageToServer(res.assets, "other");
            }
        });
    }
    return (
        <View style={styles.MainViewCourse}>
            {/* Page top Header  */}
            <View style={styles.mainViewHead}>
                <View style={styles.View2x}>
                    <View style={styles.midLogoView}>
                        <Icon color={"red"} size={24} name={"customerservice"} style={styles.headerLogoX} />
                    </View>
                </View>
            </View>

            {/* page Starts */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.StlViewScroll}>
                <View style={styles.VieInsideScroll}>
                    <Text style={styles.TextHead}>آنالیز</Text>
                    <View style={styles.viewHr}></View>

                    {/* input weight */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "weight" ? "red" : "#e24b4b", marginTop: 50 }]}>
                        <TextInput
                            value={pageStates.weight}
                            onChangeText={(weight) => setPageStates(prevState => ({ ...prevState, weight }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"وزن"}
                            style={styles.inp}
                        />
                        <Icon7 name="weight-lifter" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>
                    {/* height  */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "height" ? "red" : "#e24b4b" }]}>
                        <TextInput
                            value={pageStates.height}
                            onChangeText={(height) => setPageStates(prevState => ({ ...prevState, height }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"قد"}
                            style={styles.inp}
                        />
                        <Icon3 name="arrow-resize" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>
                    {/* age  */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "age" ? "red" : "#e24b4b" }]}>
                        <TextInput
                            value={pageStates.age}
                            onChangeText={(age) => setPageStates(prevState => ({ ...prevState, age }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"سن"}
                            style={styles.inp}
                        />
                        <Icon3 name="magento" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>

                    {/* Gender */}
                    <TouchableOpacity style={[styles.AllInputSpan2, { borderColor: pageStates.errorPlace === "gender" ? "red" : "#e24b4b" }]}
                        onPress={() => openGender()}>
                        <Text style={styles.textInPS}>{pageStates.gender}</Text>
                        <View style={styles.itemViewx}>
                            <Text style={styles.textInPS}>جنیست</Text>
                            <Icon name="sharealt" size={18} color="#ffffff" style={styles.inpIcon} />
                        </View>
                    </TouchableOpacity>
                    {/* <Picker
                style={{display:"none"}}
                ref={GenderRef}
                onValueChange={(itemValue, itemIndex) =>{
                    console.log("did selected 1 : ", itemValue,itemIndex);
                    if(itemIndex===1){
                        setPageStates(prevStates=>({...prevStates,gender:itemValue,genderKey:"mail"}));
                    }else if(itemIndex===2){
                        setPageStates(prevStates=>({...prevStates,gender:itemValue,genderKey:"femail"}));
                    }else if(itemIndex===3){
                        setPageStates(prevStates=>({...prevStates,gender:itemValue,genderKey:"bisexual"}));
                    }
                }}>
                    <Picker.Item label="جنیست" value="" />
                    <Picker.Item label="مرد" value="مرد" />
                    <Picker.Item label="زن" value="زن" />
                    <Picker.Item label="دوجنسیتی" value="دوجنسیتی" />
              </Picker> */}

                    {/* activityrate */}
                    <TouchableOpacity style={[styles.AllInputSpan2, { borderColor: pageStates.errorPlace === "activityRate" ? "red" : "#b8b8b8" }]}
                        onPress={() => openActivityRate()}>
                        <Text style={styles.textInPS}>{pageStates.activityRate}</Text>
                        <View style={styles.itemViewx}>
                            <Text style={styles.textInPS}>مدت زمان ورزش در روز</Text>
                            <Icon name="sharealt" size={18} color="#ffffff" style={styles.inpIcon} />
                        </View>
                    </TouchableOpacity>
                    {/* <Picker
                style={{display:"none"}}
                ref={ActivityRateRef}
                onValueChange={(itemValue, itemIndex) =>{
                    console.log("did selected 1 : ", itemValue,itemIndex);
                    if(itemIndex>0){
                        let RateKey = "";
                        if(itemIndex===1){
                            RateKey = "halfHoursDay";
                        }else if(itemIndex===2){
                            RateKey = "oneHoursDay";
                        }else if(itemIndex===3){
                            RateKey = "twoHoursDay";
                        }else if(itemIndex===4){
                            RateKey = "halfHoursTowDay";
                        }else if(itemIndex===5){
                            RateKey = "oneHoursTowDay";
                        }else if(itemIndex===6){
                            RateKey = "twoHoursTowDay";
                        }else if(itemIndex===7){
                            RateKey = "halfHoursWeek";
                        }else if(itemIndex===8){
                            RateKey = "oneHoursWeek";
                        }else if(itemIndex===9){
                            RateKey = "twoHoursWeek";
                        }
                        setPageStates(prevStates=>({...prevStates,activityRate:itemValue,activityRateKey:RateKey}));
                    }
                }}>
                    <Picker.Item label="انتخاب کنید" value="" />
                    <Picker.Item label="نیم ساعت در روز" value="نیم ساعت در روز" />
                    <Picker.Item label="یک ساعت در روز" value="یک ساعت در روز" />
                    <Picker.Item label="دو ساعت در روز" value="دو ساعت در روز" />
                    <Picker.Item label="نیم ساعت هر دو روز" value="نیم ساعت هر دو روز" />
                    <Picker.Item label="یک ساعت هر دو روز" value="یک ساعت هر دو روز" />
                    <Picker.Item label="دو ساعت هر دو روز" value="دو ساعت هر دو روز" />
                    <Picker.Item label="نیم ساعت در هفته" value="نیم ساعت در هفته" />
                    <Picker.Item label="یک ساعت در هفته" value="یک ساعت در هفته" />
                    <Picker.Item label="دو ساعت در هفته" value="دو ساعت در هفته" />
                 
              </Picker> */}


                    {/* around wrist  */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "aroundWrist" ? "red" : "#b8b8b8" }]}>
                        <TextInput
                            value={pageStates.aroundWrist}
                            onChangeText={(aroundWrist) => setPageStates(prevState => ({ ...prevState, aroundWrist }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"سایز مچ دست"}
                            style={styles.inp}
                        />
                        <Icon1 name="ios-hand-right-outline" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>

                    {/* waist  */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "waist" ? "red" : "#b8b8b8" }]}>
                        <TextInput
                            value={pageStates.waist}
                            onChangeText={(waist) => setPageStates(prevState => ({ ...prevState, waist }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"سایز کمر"}
                            style={styles.inp}
                        />
                        <Icon5 name="man" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>

                    {/* aroundArm  */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "aroundArm" ? "red" : "#b8b8b8" }]}>
                        <TextInput
                            value={pageStates.aroundArm}
                            onChangeText={(aroundArm) => setPageStates(prevState => ({ ...prevState, aroundArm }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"سایز بازو"}
                            style={styles.inp}
                        />
                        <Icon7 name="arm-flex-outline" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>

                    {/* aroundRhigh  */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "aroundRhigh" ? "red" : "#b8b8b8" }]}>
                        <TextInput
                            value={pageStates.aroundRhigh}
                            onChangeText={(aroundRhigh) => setPageStates(prevState => ({ ...prevState, aroundRhigh }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"سایز ران"}
                            style={styles.inp}
                        />
                        <Icon7 name="arm-flex-outline" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>
                    {/* input neck */}
                    <View style={[styles.AllInputSpan, { borderColor: pageStates.errorPlace === "neck" ? "red" : "#b8b8b8" }]}>
                        <TextInput
                            value={pageStates.aroundNeck}
                            onChangeText={(aroundNeck) => setPageStates(prevState => ({ ...prevState, aroundNeck }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            returnKeyType={"done"}
                            placeholder={"سایز دور گردن"}
                            style={styles.inp}
                        />
                        <Icon7 name="necklace" size={18} color="#ffffff" style={styles.inpIcon} />
                    </View>

                    {/* input des */}
                    <View style={[styles.AllInputSpan3, { borderColor: pageStates.errorPlace === "des" ? "red" : "#b8b8b8" }]}>
                        <TextInput
                            value={pageStates.des}
                            onChangeText={(des) => setPageStates(prevState => ({ ...prevState, des }))}
                            underlineColorAndroid={"transparent"}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#b8b8b8"
                            multiline={true}
                            returnKeyType={"done"}
                            placeholder={"توضیحات : "}
                            style={styles.inp3}
                        />
                        <Icon7 name="order-bool-descending-variant" size={18} color="#ffffff" style={[styles.inpIcon, { marginTop: 10 }]} />
                    </View>


                    <Text style={styles.TextHead2}>میتونی عکس هم بفرستی</Text>
                    <View style={styles.viewHr2}></View>

                    {/* images row 1  */}
                    <View style={styles.ViewImageOUTER}>
                        {/* image left */}
                        <TouchableOpacity style={styles.stlViewImage} onPress={() => openImageGalleryLeft()}>
                            <Icon7 name="human-female-dance" size={38} color="#ffffff" style={styles.iconXy} />
                            <Text style={styles.TextXu}>عکس از چپ</Text>
                            <BallIndicator size={20} color='#ffffff' style={{ display: pageStates.LoadingImageLeft }} />
                            <Icon name="checkcircle" size={25} color="#ffffff" style={{ marginTop: 3, display: pageStates.imageLeftTick }} />
                        </TouchableOpacity>
                        {/* image front */}
                        <TouchableOpacity style={[styles.stlViewImage, { marginHorizontal: 10 }]} onPress={() => openImageGalleryFront()}>
                            <Icon7 name="human-handsup" size={38} color="#ffffff" style={styles.iconXy} />
                            <Text style={styles.TextXu}>عکس از روبرو</Text>
                            <BallIndicator size={20} color='#ffffff' style={{ display: pageStates.LoadingImageFront }} />
                            <Icon name="checkcircle" size={25} color="#ffffff" style={{ marginTop: 3, display: pageStates.imageFrontTick }} />
                        </TouchableOpacity>
                        {/* image right */}
                        <TouchableOpacity style={styles.stlViewImage} onPress={() => openImageGalleryRight()}>
                            <Icon7 name="human-female-dance" size={38} color="#ffffff" style={styles.iconXy} />
                            <Text style={styles.TextXu}>عکس از راست</Text>
                            <BallIndicator size={20} color='#ffffff' style={{ display: pageStates.LoadingImageRight }} />
                            <Icon name="checkcircle" size={25} color="#ffffff" style={{ marginTop: 3, display: pageStates.imageRightTick }} />
                        </TouchableOpacity>
                    </View>
                    {/* images row 2  */}
                    <View style={styles.ViewImageOUTER}>
                        {/* image back */}
                        <TouchableOpacity style={[styles.stlViewImage, { marginRight: 10 }]} onPress={() => openImageGalleryBack()}>
                            <Icon7 name="human-handsdown" size={38} color="#ffffff" style={styles.iconXy} />
                            <Text style={styles.TextXu}>عکس از پشت</Text>
                            <BallIndicator size={20} color='#ffffff' style={{ display: pageStates.LoadingImageBack }} />
                            <Icon name="checkcircle" size={25} color="#ffffff" style={{ marginTop: 3, display: pageStates.imageBackTick }} />
                        </TouchableOpacity>

                        {/* image other */}
                        <TouchableOpacity style={styles.stlViewImage} onPress={() => openImageGalleryOther()}>
                            <Icon7 name="human-capacity-decrease" size={38} color="#ffffff" style={styles.iconXy} />
                            <Text style={styles.TextXu}>فایل دلخواه</Text>
                            <BallIndicator size={20} color='#ffffff' style={{ display: pageStates.LoadingImageOther }} />
                            <Icon name="checkcircle" size={25} color="#ffffff" style={{ marginTop: 3, display: pageStates.imageOtherTick }} />
                        </TouchableOpacity>
                    </View>




                    {/* Submite Btn */}
                    <TouchableOpacity style={[styles.loginBtn, { display: pageStates.isLoading === "none" ? "flex" : "none" }]}
                        onPress={() => PressSubmiteBtnAnalize()}>
                        <Text style={styles.textLogin}>ثبت نام</Text>
                    </TouchableOpacity>
                    {/* loading */}
                    <View style={[styles.spanViewIndi, { display: pageStates.isLoading }]}>
                        <BallIndicator size={20} color='#63788b' />
                    </View>
                    {/* error message */}
                    <Text style={styles.wrongMessage}>{pageStates.ErrorMessage}</Text>
                    <View style={styles.botViewSocialMedia}>
                        <Icon2 name="instagram" size={21} color="#ffffff" style={styles.socialmediaIcon} onPress={() => { console.log("XL", pageStates.ImageFrontName) }} />
                        <Icon3 name="whatsapp" size={21} color="#ffffff" style={styles.socialmediaIcon} onPress={() => { console.log(3) }} />
                        <Icon4 name="facebook" size={21} color="#ffffff" style={styles.socialmediaIcon} onPress={() => { console.log(3) }} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    iconXy: { marginTop: 20 },
    TextXu: { color: "#ffffff", fontSize: 14, fontFamily: "BYekan" },
    stlViewImage: {
        width: 90, height: 120, backgroundColor: "#b8b8b8", alignItems: "center",
        borderRadius: 20,
    },
    ViewImageOUTER: { width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20, },
    inpIcon: { borderRadius: 100, padding: 6, backgroundColor: "#b8b8b8", },
    textInPS: { paddingRight: 10, fontFamily: "BYekan", color: "#b8b8b8" },
    itemViewx: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
    textInPS: { paddingRight: 10, fontFamily: "BYekan", color: "#b8b8b8" },
    AllInputSpan2: {
        width: 300, height: 39, borderRadius: 100, borderWidth: 1, flexDirection: "row", marginTop: 10,
        justifyContent: "space-between", alignItems: "center", paddingHorizontal: 6, paddingLeft: 15
    },
    VieInsideScroll: { width: "100%", flex: 1, justifyContent: "center", alignItems: "center" },
    socialmediaIcon: { backgroundColor: "#2d5f64", padding: 10, borderRadius: 100, },
    botViewSocialMedia: {
        width: 300, flexDirection: "row", justifyContent: "space-around", marginBottom: 40,
        alignItems: "center", marginTop: 30, backgroundColor: "#eaeaea", padding: 4, borderRadius: 100, paddingVertical: 8
    },
    wrongMessage: { color: "red", fontFamily: "BYekan", fontSize: 14, marginTop: 10 },
    textLogin: { color: "#ffffff", fontFamily: "BYekan", fontSize: 14 },
    loginBtn: {
        width: 300, height: 36, backgroundColor: "#2d5f64", borderRadius: 100, marginTop: 40,
        flexDirection: "row", justifyContent: "center", alignItems: "center",
    },
    spanViewIndi: { width: 100, marginTop: 5, marginBottom: 20, },
    inp: {
        width: "85%", color: "#b8b8b8", paddingLeft: 10, fontSize: 14, marginTop: 4, fontFamily: "BYekan",
        textAlign: "right", paddingHorizontal: 10, marginTop: 6, height: 40,
    },
    inp3: {
        width: "85%", color: "#b8b8b8", paddingLeft: 10, fontSize: 14, marginTop: 4, fontFamily: "BYekan",
        textAlign: "right", paddingHorizontal: 10, marginTop: 6, height: 120,
    },
    AllInputSpan3: {
        width: 300, height: 140, borderRadius: 20, borderWidth: 1, flexDirection: "row", marginTop: 10,
        justifyContent: "flex-end", alignItems: "center", paddingHorizontal: 6,
    },
    AllInputSpan: {
        width: 300, height: 39, borderRadius: 100, borderWidth: 1, flexDirection: "row", marginTop: 10,
        justifyContent: "flex-end", alignItems: "center", paddingHorizontal: 6
    },
    viewHr: { width: 120, height: 3, backgroundColor: "red", borderRadius: 20, alignSelf: "center", marginTop: 5, },
    viewHr2: { width: 190, height: 3, backgroundColor: "red", borderRadius: 20, alignSelf: "center", marginTop: 5, },

    TextHead: { fontFamily: "BYekan", fontSize: 20, color: "#808080", alignSelf: "center", marginTop: 20 },
    TextHead2: { fontFamily: "BYekan", fontSize: 16, color: "#808080", alignSelf: "center", marginTop: 20 },
    StlViewScroll: { flex: 1, width: "100%" },
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

export default Submit_Analysis;