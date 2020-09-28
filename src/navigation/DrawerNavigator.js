import React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";

import TabNavigator from "./TabNavigator";
import {DrawerContent} from './DrawerContent';
import DownloadScreen from "../screens/Download";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={TabNavigator}/>
            <Drawer.Screen name="DownloadScreen" component={DownloadScreen}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
