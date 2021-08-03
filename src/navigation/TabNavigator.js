import React from 'react';
import {Dimensions} from "react-native";

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/FontAwesome';


import {DepositStackScreen, HomeStackScreen, ProfileStackScreen, AddNewStackScreen} from "./StackNavigator";


const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="rgba(231,76,60,1)"
        barStyle={{backgroundColor: '#3a3838', width: Dimensions.get("window").width + 3.5}}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-home" color={color} size={25}/>
                ),
            }}
        />
        <Tab.Screen
            name="Case"
            component={DepositStackScreen}
            options={{
                tabBarLabel: 'Case',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-folder" color={color} size={25}/>
                ),
            }}
        />
        <Tab.Screen
            name="AddNew"
            component={AddNewStackScreen}
            options={{
                tabBarLabel: 'Patient',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-person" color={color} size={28}/>
                ),
            }}
        />
        <Tab.Screen
            name="School"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'School',
                tabBarIcon: ({color}) => (
                    <Iconf name="institution" color={color} size={20}/>
                ),
            }}
        />
    </Tab.Navigator>
);

export default TabNavigator;

