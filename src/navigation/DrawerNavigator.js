import React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";

import createNavigation from "./StackNav";
import {DrawerContent} from './DrawerContent';
// import DownloadScreen from "../screens/Download";
// import PatientRecord from "../screens/PatientRecord";
import { database } from '../../index' 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            {/* <Drawer.Screen name="HomeDrawer" component={TabNavigator}/> */}
            
            <Drawer.Screen name="HomeDrawer" children={() => createNavigation({database})}/>
            
            {/* <Drawer.Screen name="PatientRecord" component={PatientRecord}/> */}
            {/* <Drawer.Screen name="Download" component={DownloadScreen}/> */}

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
