import { ScrollView, View } from 'react-native'
import React, { useContext } from 'react';
import { Context } from '../../Storage/Context'
import { useIsFocused } from '@react-navigation/native';
import { Alert, Header, Style } from '../../Components/Common';
import Content_nutrition from '../../Components/User_Component/Nutrition_component/Content_nutrition';

const Nutrition = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={Style.screenContainer}>
            <Header {...props} />
            <ScrollView>
                <Content_nutrition {...props} />
            </ScrollView>
        </View>
    )
}


export default React.memo(Nutrition)