import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OverViewScreen from "../screens/OverViewScreen";
import AggregateForm from "../screens/AggregateForm";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import HowToUse from "../screens/HowToUse";

const Stack = createStackNavigator();

const HomeStackScreen = ({ route, navigation }) => (

  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#0388E5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    },
    headerTitleAlign: 'center',
    safeAreaInsets: { top: 0, bottom: 0 }
  }}>

    <Stack.Screen name="Home" component={OverViewScreen} options={{
      title: '',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#0388E5"
          onPress={() => navigation.openDrawer()} />
      ),
    }} />
    <Stack.Screen name="HowTo" component={HowToUse} options={{
      title: 'How to guide',
      headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#0388E5"
          onPress={() => navigation.goBack()} style={{ paddingLeft: 20 }} />
      ),
    }} />
    <Stack.Screen name="NewAggregate" component={AggregateForm}
    options={{
      title: "Record Summary",
      headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#0388E5"
          onPress={() => navigation.goBack()} style={{ paddingLeft: 20 }} />
      ),
    }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#0388E5"
          onPress={() => navigation.openDrawer()} />
      ),
      headerShown: false,
    }} />

  </Stack.Navigator>
);

export { HomeStackScreen };