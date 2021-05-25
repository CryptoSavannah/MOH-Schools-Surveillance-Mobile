import React from 'react';
import { Dimensions } from "react-native";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/FontAwesome';


import { DepositStackScreen, HomeStackScreen, ProfileStackScreen, AddNewStackScreen } from "./StackNavigator";


const Tab = createMaterialBottomTabNavigator();

const TabNavigator = props => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#FFB236"
    barStyle={{ backgroundColor: '#3a3838', width: Dimensions.get("window").width + 3.5 }}
  >
    <Tab.Screen
      name="Home"
      children={() => {
        const { database } = props
        return <HomeStackScreen database={database} />
      }}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="Case"
      children={() => {
        const { database } = props
        return <DepositStackScreen database={database} />
      }}
      options={{
        tabBarLabel: 'Case',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-folder" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="AddNew"
      children={() => {
      const { database } = props
      return <AddNewStackScreen database={database}/>}}
      options={{
        tabBarLabel: 'Patient',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={28} />
        ),
      }}
    />
    <Tab.Screen
      name="School"
      children={() => {
        const { database } = props
        return <ProfileStackScreen database={database}/>}}
      options={{
        tabBarLabel: 'School',
        tabBarIcon: ({ color }) => (
          <Iconf name="institution" color={color} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

