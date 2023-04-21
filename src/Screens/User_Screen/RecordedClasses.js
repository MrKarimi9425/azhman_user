import { ScrollView, View } from 'react-native'
import React, { useContext } from 'react';
import { Context } from '../../Storage/Context';
import { useIsFocused } from '@react-navigation/native';
import { Alert, Header, Style } from '../../Components/Common';
import Content_RecordedClasses from '../../Components/User_Component/RecordedClasses_components/Content_RecordedClasses';

const RecordedClasses = (props) => {
    const { alertConfig } = useContext(Context)
    const state = useIsFocused();

    return (
        <View style={{ ...Style.screenContainer, backgroundColor: '#F1F1F1' }}>
            <Header {...props} />
            <ScrollView>
                <Content_RecordedClasses {...props} />
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


export default React.memo(RecordedClasses)