// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Case from "../screens/Case";
import CaseForm from "../screens/CaseForm";
import AddNew from "../screens/AddNew";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { TouchableOpacity } from "react-native";
import { Block, Text } from "../components";
import PendingCases from "../screens/PendingCases";
// import ResultScreen from "../screens/Results";
// import FilterScreen from "../screens/FilterScreen";
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#3a3838',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    },
    safeAreaInsets: { top: 0, bottom: 0 }
  }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{
      title: 'Overview',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.openDrawer()} />
      ),
      headerRight: () => (
        <Icon2.Button name="dots-vertical" size={25} backgroundColor="#3a3838"
          onPress={() =>
            //  {return(<View><Text>oooo</Text></View>);}
            navigation.navigate("FilterOptions")
          } />)
    }} />
    {/* <Stack.Screen name="Case" component={Case} options={{
      title: 'Record Case',
      headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.goBack()} style={{ paddingLeft: 20 }} />
      ),
    }} /> */}

    <Stack.Screen name="Case" component={Case}
    // component={() => (
    //   <Case 
    //   patient={navigation.state.params.patient} 
    //   navigation={navigation} />
    // )} 
    options={{
      // title: navigation.state.params.patient.name,
      headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.goBack()} style={{ paddingLeft: 20 }} />
      ),
    }} />

    <Stack.Screen name="NewCase" component={CaseForm}
    // component={() => (
    //   <CaseForm navigation={navigation} />
    // )} 
    options={{
      title: 'New Case',
      headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.goBack()} style={{ paddingLeft: 20 }} />
      ),
    }} />

    <Stack.Screen name="EditCase" component={CaseForm}
    // component={() => (
    //   <CaseForm 
    //   patient={navigation.state.params.patient} 
    //   navigation={navigation} />
    // )}
     options={{
      // title: `Edit "${navigation.state.params.patient.name}"`,
      headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.goBack()} style={{ paddingLeft: 20 }} />
      ),
    }} />

    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.openDrawer()} />
      ),
      headerShown: false,
    }} />
    <Stack.Screen name="AddNew" component={AddNew} options={{
      title: 'Add Patient',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.openDrawer()} />
      )
    }} />
    {/* <Stack.Screen name="Pending" component={PendingCases} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                    onPress={() => navigation.openDrawer()} />
            ),
        }} /> */}
    {/* <Stack.Screen name="ResultScreen" component={ResultScreen} options={{
            title: 'Case Record',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
                    onPress={() => navigation.openDrawer()} />
            ),
        }} /> */}
    {/* <Stack.Screen name="FilterOptions" component={FilterScreen} options={{
            title: 'Select Period',
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#3a3838"
                    onPress={() => navigation.goBack()} style={{paddingLeft: 20}}/>
            ),
        }} /> */}
  </Stack.Navigator>
);

const DepositStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#3a3838',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    },
    safeAreaInsets: { top: 0, bottom: 0 }
  }}>

  </Stack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#3a3838',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    },
    safeAreaInsets: { top: 0, bottom: 0 }
  }}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      headerShown: false,
    }} />
  </Stack.Navigator>
);

const AddNewStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#3a3838',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    },
    safeAreaInsets: { top: 0, bottom: 0 }
  }}>
    <Stack.Screen name="AddNew" component={AddNew} options={{
      title: 'Add Patient',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.openDrawer()} />
      )
    }} />
  </Stack.Navigator>
);

const DownloadStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#3a3838',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    },
    safeAreaInsets: { top: 0, bottom: 0 }
  }}>
    <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={{
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#3a3838"
          onPress={() => navigation.openDrawer()} />
      ),
      headerShown: false,
    }} />
  </Stack.Navigator>
);

export { HomeStackScreen, DepositStackScreen, ProfileStackScreen, DownloadStackScreen, AddNewStackScreen };