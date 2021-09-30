import React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";

import {HomeStackScreen} from "./StackNavigator";
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContentOptions={{
            activeTintColor: '#e91e63',
            inactiveTintColor: '#ffffff',
          }} drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={HomeStackScreen}/>

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
