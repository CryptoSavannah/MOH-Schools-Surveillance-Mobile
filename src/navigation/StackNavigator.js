// ./navigation/StackNavigator.js

import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import CaseSteps from "../screens/wizard/CaseSteps";
import ProfileScreen from "../screens/profile/ProfileScreen";
import {TouchableOpacity} from "react-native";
import {Block, Text} from "../components";
import PendingCases from "../screens/PendingCases";
const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const HomeStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            ),
            headerRight: () => (
                <TouchableOpacity><Icon notification /></TouchableOpacity>
            )
        }}/>
        <Stack.Screen name="Pending" component={PendingCases} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            ),
            // headerShown: false,
        }}/>
    </Stack.Navigator>
);

const DepositStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <Stack.Screen name="CaseSteps" component={CaseSteps} options={{
            title: 'Case record',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            )
        }}/>
    </Stack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#3a3838',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            ),
            headerShown: false,
        }}/>
    </Stack.Navigator>
);

export {HomeStackScreen, DepositStackScreen, ProfileStackScreen};
