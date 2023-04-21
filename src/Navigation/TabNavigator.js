import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Main from '../Screens/User_Screen/Main';
import { Black, Blue, Main as mainColor, White } from '../Components/InitialValue/Colors';
import LivesToday from '../Screens/User_Screen/LivesToday';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: White },
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: 'yellow',
                backgroundColor: White
            }}>
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="home-outline" size={focused ? RFValue(25) : RFValue(20)} style={{
                                color: focused ? Blue : Black
                            }} />
                            {
                                !focused ? <Text style={{ fontFamily: 'BYekan', color: focused ? Black : Black, fontSize: RFValue(10) }}>صفحه اصلی</Text>
                                    : null
                            }
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={'LivesToday'}
                component={LivesToday}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="live-tv" size={focused ? RFValue(25) : RFValue(20)} style={{
                                color: focused ? Blue : Black
                            }} />
                            {
                                !focused ? <Text style={{ fontFamily: 'BYekan', color: focused ? Black : Black, fontSize: RFValue(10) }}>پخش های زنده امروز</Text>
                                    : null
                            }
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export { TabNavigator };