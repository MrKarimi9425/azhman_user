import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { Context } from './src/Storage/Context';
import { AuthStack } from './src/Navigation/AuthStack';
import { createStackNavigator } from '@react-navigation/stack';
import { version } from './package.json'
import { AppStack } from './src/Navigation/AppStack';
import { Provider } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
    const [auth_key, setAuth_key] = useState(null)
    const [checkVersion, setCheckVersion] = useState({
        version: 0,
        url: null
    })
    const [appVersion] = useState(version)
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        type: '',
        title: '',
        message: '',
    })
    const value = {
        SET_KEY: value => setAuth_key(value),
        GET_KEY: auth_key,
        version: appVersion,
        checkVersion: checkVersion,
        setCheckVersion: (version, url) => {
            setCheckVersion({
                version: version,
                url: url
            })
        },
        alertConfig: alertConfig,
        openAlert: (type, title, message) => {
            setAlertConfig({
                visible: true,
                type: type,
                title: title,
                message: message,
            })
        },
        closeAlert: () => {
            setAlertConfig({
                visible: false,
            })
        }
    }

    return (
        <Provider>
            <Context.Provider value={value}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='' screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='guest' component={AuthStack} />
                        <Stack.Screen name='user' component={AppStack} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Context.Provider>
        </Provider>
    )
}

export default React.memo(App);
