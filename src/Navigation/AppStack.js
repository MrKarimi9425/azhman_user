import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../Components/Navigation_components/CustomDrawer';
import 'react-native-gesture-handler';
import { TabNavigator } from './TabNavigator';
import { Main as mainColor } from '../Components/InitialValue/Colors';
import PurchasedCourses from '../Screens/User_Screen/PurchasedCourses';
import CoachsCourses from '../Screens/User_Screen/CoachsCourses';
import ServiceDetails from '../Screens/User_Screen/ServiceDetails';
import CoachesOfGroup from '../Screens/User_Screen/CoachesOfGroup';
import Alarm from '../Screens/User_Screen/Alarm';
import Factor from '../Screens/User_Screen/Factor';
import OfflinePayment from '../Screens/User_Screen/OfflinePayment';
import Questions from '../Screens/User_Screen/Questions';
import UserFactorList from '../Screens/User_Screen/UserFactorList';
import Live from '../Screens/User_Screen/Live';
import AboutUs from '../Screens/User_Screen/AboutUs';
import RecordedClasses from '../Screens/User_Screen/RecordedClasses';
import EditProfile from '../Screens/User_Screen/EditProfile';
import Main from '../Screens/User_Screen/Main';
import LiveStreaming from '../Screens/User_Screen/LiveStreaming';
import PlayVideo from '../Screens/User_Screen/PlayVideo';
import Add_Ticket from '../Screens/User_Screen/Ticket/Add_Ticket';
import Show_Ticket from '../Screens/User_Screen/Ticket/Show_Ticket';
import List_Ticket from '../Screens/User_Screen/Ticket/List_Ticket';
import Chat from '../Screens/User_Screen/Ticket/Chat';
import Nutrition from '../Screens/User_Screen/Nutrition';
import { myClasses_stacks } from '../Screens/User_Screen/MyClasses';
import ChannelMessage from '../Screens/User_Screen/Ticket/ChannelMessage';
import Show_Analysis from '../Screens/User_Screen/Analysis/Show_Analysis';
import Submit_Analysis from '../Screens/User_Screen/Analysis/Submit_Analysis';
import { Instagram_stack } from '../Screens/User_Screen/instagram/Instagram_stack';
import { Articles } from '../Screens/User_Screen/Articles';

const Drawer = createDrawerNavigator();

const AppStack = (props) => {
    return (
        <Drawer.Navigator initialRouteName=''
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerActiveBackgroundColor: mainColor,
            }}>
            <Drawer.Screen name={'Main'} component={Main} />
            <Drawer.Screen name={'LiveStreaming'} component={LiveStreaming} />
            <Drawer.Screen name={'OfflinePayment'} component={OfflinePayment} />
            <Drawer.Screen name={'Alarm'} component={Alarm} />
            <Drawer.Screen name={'PurchasedCourses'} component={PurchasedCourses} />
            <Drawer.Screen name={'CoachsCourses'} component={CoachsCourses} />
            <Drawer.Screen name={'ServiceDetails'} component={ServiceDetails} />
            <Drawer.Screen name={'CoachesOfGroup'} component={CoachesOfGroup} />
            <Drawer.Screen name={'Factor'} component={Factor} />
            <Drawer.Screen name={'Questions'} component={Questions} />
            <Drawer.Screen name={'UserFactorList'} component={UserFactorList} />
            <Drawer.Screen name={'Live'} component={Live} />
            <Drawer.Screen name={'AboutUs'} component={AboutUs} />
            <Drawer.Screen name={'RecordedClasses'} component={RecordedClasses} />
            <Drawer.Screen name={'EditProfile'} component={EditProfile} />
            <Drawer.Screen name={'PlayVideo'} component={PlayVideo} />
            <Drawer.Screen name={'Add_Ticket'} component={Add_Ticket} />
            <Drawer.Screen name={'Show_Ticket'} component={Show_Ticket} />
            <Drawer.Screen name={'List_Ticket'} component={List_Ticket} />
            <Drawer.Screen name={'Chat'} component={Chat} />
            <Drawer.Screen name={'ChannelMessage'} component={ChannelMessage} />
            {
                myClasses_stacks.map(stack => stack)
            }
            <Drawer.Screen name="Show_Analysis" component={Show_Analysis} />
            <Drawer.Screen name="Submit_Analysis" component={Submit_Analysis} />
            <Drawer.Screen name={'Nutrition'} component={Nutrition} />
            <Drawer.Screen name={'instagram'} component={Instagram_stack} />
            <Drawer.Screen name={'articles'} component={Articles} />
        </Drawer.Navigator>
    );
};

export { AppStack };