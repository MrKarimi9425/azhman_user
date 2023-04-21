import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login_Screen from '../Screens/Guest_Screen/Login_Screen';
import SmsCode_Screen from '../Screens/Guest_Screen/SmsCode_Screen';
import SignUp_Screen from '../Screens/Guest_Screen/SignUp_Screen';
import Splash from '../Screens/Guest_Screen/Splash';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Splash'} component={Splash} />
            <Stack.Screen name={'Login'} component={Login_Screen} />
            <Stack.Screen name={'Code'} component={SmsCode_Screen} />
            <Stack.Screen name={'SignUp'} component={SignUp_Screen} />
        </Stack.Navigator>
    );
};

export { AuthStack }