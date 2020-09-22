// ./navigation/StackNavigator.js

import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import AddNew from "../screens/AddNew";
import ProfileScreen from "../screens/profile/ProfileScreen";
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
            title: 'Schools Survailance',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                             onPress={() => navigation.openDrawer()}/>
            )
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
        <Stack.Screen name="AddNew" component={AddNew} options={{
            title: 'New student\'s record',
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
