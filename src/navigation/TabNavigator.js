import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {DepositStackScreen, HomeStackScreen, ProfileStackScreen} from "./StackNavigator";


const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#eec971"
        barStyle={{backgroundColor: '#3a3838'}}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-home" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="CaseSteps"
            component={DepositStackScreen}
            options={{
                tabBarLabel: 'Enter Case',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-journal" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="School"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-person" color={color} size={26}/>
                ),
            }}
        />
    </Tab.Navigator>
);

export default TabNavigator;

