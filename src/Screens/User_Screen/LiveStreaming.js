import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react';
import { Context } from '../../Storage/Context';
import { useIsFocused } from '@react-navigation/native';
import { Alert, Header, Style, useFetch } from '../../Components/Common';
import { RFValue } from 'react-native-responsive-fontsize';
import { Black, Blue, White } from '../../Components/InitialValue/Colors';
import Ripple from 'react-native-material-ripple';
import Content_LiveStreaming from '../../Components/User_Component/LiveStreaming_components/Content_LiveStreaming';

const LiveStreaming = (props) => {
    const { alertConfig } = useContext(Context)
    const [tabEnable, setTabEnable] = useState('LivesToday')
    const state = useIsFocused();
    const { data: LivesToday } = useFetch('datacourse/live_program_user', false)
    const { data: Recorded } = useFetch('datacourse/live_program_user_before', false)

    return (
        <View style={{ ...Style.screenContainer, backgroundColor: '#F1F1F1' }}>
            <Header {...props} />
            <View style={styles.tabsContainer}>
                <Ripple onPress={() => setTabEnable('Recorded')} style={{ ...styles.tab, backgroundColor: tabEnable == 'Recorded' ? Blue : White }}>
                    <Text style={{ ...styles.tabText, color: tabEnable != 'Recorded' ? Blue : White }}>لیست کلاس های ضبط شده</Text>
                </Ripple>
                <Ripple onPress={() => setTabEnable('LivesToday')} style={{ ...styles.tab, backgroundColor: tabEnable == 'LivesToday' ? Blue : White }}>
                    <Text style={{ ...styles.tabText, color: tabEnable != 'LivesToday' ? Blue : White }}>لیست پخش زنده امروز</Text>
                </Ripple>
            </View>
            <ScrollView>
                {
                    tabEnable == 'LivesToday' ?
                        <Content_LiveStreaming data={LivesToday} props={props} />
                        :
                        <Content_LiveStreaming data={Recorded} props={props} />
                }
            </ScrollView>
            {
                state &&
                <Alert
                    title={alertConfig.title}
                    message={alertConfig.message}
                    onPress={alertConfig.onPress}
                    type={alertConfig.type}
                />
            }
        </View >
    )
}
const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    tab: {
        padding: 10,
        backgroundColor: 'red',
        width: '48%',
        // margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderRadius: 10
    },
    tabText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: Black
    }
})

export default React.memo(LiveStreaming)