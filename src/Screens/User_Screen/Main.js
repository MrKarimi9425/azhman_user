import React, { useCallback, useContext, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, View, Alert as reactAlert } from "react-native";
import { Context } from '../../Storage/Context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Alert, isSet, Style, UnDoneWork, useFetch } from '../../Components/Common';
import { firstMenu, secondMunu } from '../../Components/Common/dataArray';
import { Header } from '../../Components/User_Component/Main_components/Header'
import { Banner } from '../../Components/User_Component/Main_components/Banner'
import { Menu } from '../../Components/User_Component/Main_components/Menu'
import { Menu3 } from '../../Components/User_Component/Main_components/Menu3'
import { Search } from '../../Components/User_Component/Main_components/Search'
import { Slider } from '../../Components/User_Component/Main_components/Slider'
import { CoachsBetter } from '../../Components/User_Component/Main_components/CoachsBetter';
import { Coachs } from '../../Components/User_Component/Main_components/Coachs';
import { Articles } from '../../Components/User_Component/Main_components/Articles';

const Main = (props) => {
    const { data } = useFetch('course/dashboard', false);
    const { alertConfig, openAlert } = useContext(Context);
    const { work } = UnDoneWork();
    const state = useIsFocused();

    useEffect(() => {
        if (isSet(data) && isSet(data["data"])) {
            if (data.res == 0) {
                // فرستادن به فانکشن کارهای انجام نشده
                work({
                    type: data["type"],
                    navigation: props.navigation,
                    msg: data["msg"]
                })
            }
        }
    }, [data])

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <Search />
                <Slider data={data.data} props={props} />
                <Menu data={firstMenu} />
                <CoachsBetter {...props} />
                <Banner />
                <Menu type={'secondMenu'} data={secondMunu} />
                <Coachs {...props} />
                <Articles data={data.data}/>
                <Menu3 />
                {
                    state &&
                    <Alert
                        title={alertConfig.title}
                        message={alertConfig.message}
                        onPress={alertConfig.onPress}
                        type={alertConfig.type}
                    />
                }
            </ScrollView>
        </View>
    )
}

export default React.memo(Main)