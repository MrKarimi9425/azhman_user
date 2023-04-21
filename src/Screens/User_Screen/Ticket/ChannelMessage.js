import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Style, Header } from '../../../Components/Common/Style'
import { Content_Chat } from '../../../Components/User_Component/Ticket_components/Chat_components/Content_Chat'
import { isSet, useFetch } from '../../../Components/Common'
import { Content_channelMessage } from '../../../Components/User_Component/Ticket_components/Channel_components/Content_channelMessage'
import { Blue_Header } from '../../../Components/Common/Blue_Header'

const ChannelMessage = (props) => {
    const { data } = useFetch('channel/get-msg', false, 'POST', {
        id: props.route.params.idChannel
    })

    useEffect(() => {
        console.log("data", data)
    }, [data])
    
    return (
        <ImageBackground source={require('../../../assets/images/chatBack.jpeg')} style={Style.screenContainer}>
            <Blue_Header {...props} />
            {
                isSet(data) && <Content_channelMessage data={data["data"]} props={props} />
            }
        </ImageBackground>
    )
}

export default React.memo(ChannelMessage)