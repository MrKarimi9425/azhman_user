import React, { useContext, useEffect } from 'react'
import { Style } from '../../Components/Common/Style';
import { View } from 'react-native-animatable';
import Content_EditProfile from '../../Components/User_Component/EditProfile_components/Content_EditProfile';
import { Header } from '../../Components/User_Component/EditProfile_components/Header';
import { useNavigation } from '@react-navigation/native';
import { Alert } from '../../Components/Common';
import { Context } from '../../Storage/Context';

const EditProfile = (props) => {
    const { replace, goBack } = useNavigation();
    const { alertConfig } = useContext(Context)
    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <Content_EditProfile  {...props} />
            <Alert
                title={alertConfig.title}
                message={alertConfig.message}
                onPress={alertConfig.onPress}
                type={alertConfig.type}
            />
        </View>
    )
}

export default React.memo(EditProfile)