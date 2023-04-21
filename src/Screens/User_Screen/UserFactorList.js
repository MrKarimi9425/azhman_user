import { ScrollView, View } from 'react-native'
import React, { useContext } from 'react';
import Content_userFactorList from '../../Components/User_Component/UserFactorList_component/Content_userFactorList'
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native';
import { Alert, Header, Style } from '../../Components/Common';

const UserFactorList = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <Content_userFactorList {...props} />
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
        </View>
    )
}


export default React.memo(UserFactorList)