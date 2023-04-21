import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Storage/Context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Alert, Header, isSet, JDate, JDateTime, JTime, Style, useFetch } from '../../../Components/Common'
import Content_LIstTicket from '../../../Components/User_Component/Ticket_components/ListTicket_components/Content_LIstTicket'
import { RFValue } from 'react-native-responsive-fontsize'
import { Black, Blue, Gray, Green, White } from '../../../Components/InitialValue/Colors'
import { Search } from '../../../Components/User_Component/Ticket_components/ListTicket_components/Search'
import { Courses, Online } from '../../../Components/Common/dataArray'
import { SearchedData } from '../../../Components/User_Component/Ticket_components/ListTicket_components/SearchedData'
import { CurrentTicket } from '../../../Components/User_Component/Ticket_components/ListTicket_components/CurrentTicket'
import { windowWidth } from '../../../utils/Dimensions'
import ChannelList from '../../../Components/User_Component/Ticket_components/Channel_components/ChannelList'
import { Blue_Header } from '../../../Components/Common/Blue_Header'
import { baseUrl, imageUrl } from '../../../Components/Common/Address'
import moment from 'jalali-moment'
import { Badge } from 'react-native-paper'

const List_Ticket = (props) => {
    const { alertConfig } = useContext(Context)
    const { data, doFetch, loading } = useFetch('ticket/coaches')
    const { data: add, doFetch: addTecket } = useFetch('ticket/add', true)
    const navigation = useNavigation();

    const [state, setState] = useState({
        tickets: [],
        tab: 'coach',
        msgShow: false,
        search: '',
        filteredDataSource: [],
        coaches: []
    })

    useEffect(() => {
        isSet(data["data"]) && setState(prov => ({ ...prov, coaches: data["data"]["result"], tickets: data["data"]["tickets"], msgShow: data["data"]["tickets"] ? false : true }))
    }, [data])


    useEffect(() => {
        if (add.length != 0) {
            add["data"] && navigation.replace('user', { screen: 'Chat', params: { idTicket: add.data } })
        }
    }, [add])


    const searchFilterFunction = (text) => {
        if (text) {
            const newData = state.coaches.filter(function (item) {
                let fullName = `${item.name} ${item.lName}`.toUpperCase();
                const filterUserName = item.userName ?
                    item.userName.toUpperCase() :
                    "".toUpperCase();
                const filter = fullName
                    ? fullName.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return filter.indexOf(textData) > -1 || filterUserName.indexOf(textData) > -1;
            });
            setState(prov => ({ ...prov, search: text, filteredDataSource: newData }))
        } else {
            setState(prov => ({ ...prov, search: text, filteredDataSource: prov.coaches }))
        }
    };

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => addTecket({ idCoach: item.idUser })} style={styles.searchView}>
                <View style={styles.searchFullName}>
                    <Text style={{ ...styles.userName, fontSize: RFValue(10) }}>نام کاربری : {item.userName}</Text>
                    <Text style={styles.userName}>{`${item.name} ${item.lName}`}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Image resizeMode='cover' source={{ uri: `${baseUrl}${imageUrl}profile/${item.img}` }} style={styles.image} />
                </View>
            </TouchableOpacity>

        );
    };



    return (
        <>
            <Blue_Header {...props} />
            <Search searchFilterFunction={searchFilterFunction} search={state.search} />
            {
                state.search ?
                    <>
                        <FlatList
                            data={state.filteredDataSource}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={ItemView}
                        />
                    </> :
                    loading ?
                        <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%' }} size={'large'} color={Blue} />
                        :
                        <FlatList
                            data={state.tickets}
                            ListHeaderComponent={() => {
                                return (
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity onPress={() => setState(prov => ({ ...prov, tickets: data["data"]["channels"], msgShow: data["data"]["channels"] ? false : true, tab: 'channel' }))} style={{ ...styles.button, backgroundColor: state.tab == 'channel' ? Blue : White }}>
                                            <Text style={{ ...styles.buttonText, color: state.tab == 'coach' ? Blue : White }}>کانال</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setState(prov => ({ ...prov, tickets: data["data"]["tickets"], msgShow: data["data"]["tickets"] ? false : true, tab: 'coach' }))} style={{ ...styles.button, backgroundColor: state.tab == 'coach' ? Blue : White }}>
                                            <Text style={{ ...styles.buttonText, color: state.tab == 'channel' ? Blue : White }}>مربی</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            ListFooterComponent={() => {
                                return (
                                    <Text style={[styles.texrIye, { display: state.msgShow ? "flex" : "none" }]}>موردی وجود ندارد</Text>
                                )
                            }}
                            renderItem={({ item }) => {
                                let image = item["receiver"] && item["receiver"]["img"];
                                let date = moment.utc(moment.unix(item["dateUpdate"])).locale("fa").startOf('seconds').fromNow();
                                return (
                                    <TouchableOpacity onPress={() => {
                                        if (state.tab === 'channel') {
                                            navigation.replace('user', { screen: 'ChannelMessage', params: { idChannel: item.id } })
                                        } else {
                                            navigation.replace('user', { screen: 'Chat', params: { idTicket: item.id } })
                                        }
                                    }} style={styles.ticketView}>
                                        <View style={styles.ticketLeft}>
                                            <Text style={styles.date}>{date}</Text>
                                            <View>
                                                {state.tab == 'coach' && <Badge style={styles.notSeen} visible={item["new_chats"] && item["new_chats"].length > 0}>{item["new_chats"].length}</Badge>}
                                            </View>
                                        </View>
                                        <View style={styles.ticketMiddle}>
                                            {item["title"] && state.tab == 'coach' ? <Text style={styles.userName}>{item["title"]}</Text> :
                                                <Text style={styles.userName}>{item["name"]}</Text>}
                                            {item["last_chat"] && <Text numberOfLines={1} style={styles.massage}>{item["last_chat"]["des"]}</Text>}
                                        </View>
                                        <View style={styles.avatarContainer}>
                                            <Image source={{ uri: `${baseUrl}${imageUrl}profile/${image}` }} style={styles.image} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
            }
        </>
    )
}

export default React.memo(List_Ticket)

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(20),
        fontFamily: 'BYekan',
        color: Blue,
        textAlign: 'center',
        margin: 10
    },
    userName: { fontSize: RFValue(12), fontFamily: 'BYekan', color: Black, textAlign: 'right' },
    massage: { fontSize: RFValue(12), fontFamily: 'BYekan', color: Gray, },
    des: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Gray,
        margin: 10
    },
    loadingCard: {
        backgroundColor: 'rgba(238,238,238,0.78)',
        borderRadius: 15,
        margin: 10,
    },
    image: {
        height: '100%',
        width: '100%'
    },
    date: { fontSize: RFValue(10), fontFamily: 'BYekan', color: Gray, },
    notSeen: { fontSize: RFValue(20), fontFamily: 'BYekan', color: White, backgroundColor: 'green' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
    button: { flex: 1, margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 5, elevation: 5 },
    buttonText: { fontFamily: 'BYekan', color: White, fontSize: RFValue(12) },
    searchView: { flexDirection: 'row', elevation: 5, margin: 5, backgroundColor: White },
    searchFullName: { flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' },
    avatarContainer: { backgroundColor: Blue, width: 70, height: 70, borderRadius: 200, margin: 8, overflow: 'hidden' },
    ticketView: { flexDirection: 'row', elevation: 5, backgroundColor: 'white', margin: 5 },
    ticketLeft: { flex: 2, alignItems: 'center', justifyContent: 'space-evenly' },
    ticketMiddle: { flex: 5, justifyContent: 'space-evenly', paddingRight: 10 }

})