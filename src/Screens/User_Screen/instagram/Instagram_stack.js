import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Explore } from './Explore';
import { Post } from './Post';
import { Profile } from './Profile';
import { Story } from './story';

const Stack = createStackNavigator();

const Instagram_stack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='post'>
            <Stack.Screen name={'explore'} component={Explore} />
            <Stack.Screen name={'post'} component={Post} />
            <Stack.Screen name={'profile'} component={Profile} />
            <Stack.Screen name={'story'} component={Story} />
        </Stack.Navigator>
    )
}

export { Instagram_stack }

const styles = StyleSheet.create({})