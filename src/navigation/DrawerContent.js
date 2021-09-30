import React from 'react';
import { View, StyleSheet, Linking, Text, Image } from 'react-native';
import {
  Avatar,
  Drawer,
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconf from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../components/context';
import logo from '../assets/logo.png';


export function DrawerContent(props) {

  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>

          <Drawer.Section style={styles.drawerSection}>
            <View style={[styles.userInfoSection]}>
              <Image
                source={logo}
                backgroundColor={'#4d505b'}
                style={styles.image}
              />
            </View>
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>

            <DrawerItem
              activeTintColor={props.activeTintColor}
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={props.inactiveTintColor}
                  size={size}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: 16 }}>Home</Text>)}
              onPress={() => { props.navigation.navigate('Home') }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Iconi
                  name="ios-folder-open-outline"
                  color={props.inactiveTintColor}
                  size={size}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: 16 }}> Covid Case </Text>)}
              onPress={() => {
                let theDefDate = (new Date()).getFullYear() + '-' + (new Date()).getMonth() + '-' + ((new Date()).getDate());
                props.navigation.navigate("NewAggregate", { report: { "report_name": "Covid 19 Surveillance", "report_id": 10 }, begin_date: theDefDate, end_date: theDefDate })
              }}
            />

            <DrawerItem
              activeTintColor={props.activeTintColor}
              icon={({ color, size }) => (
                <Iconi
                  name="ios-person-add-outline"
                  color={props.inactiveTintColor}
                  size={size}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: 16 }}> New Patient </Text>)}
              onPress={() => { props.navigation.navigate('AddNew') }}
            />

          </Drawer.Section>

          <Drawer.Section title={
            <Text style={{ color: props.inactiveTintColor, fontSize: 16 }}> Contacts </Text>
          }>

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="web"
                  color={props.inactiveTintColor}
                  size={size}
                />
              )}
              label={() => (
                <Text style={{ color: props.inactiveTintColor, fontSize: 16 }}>  Ministry </Text>
              )}
              onPress={() => {
                Linking
                  .openURL('https://www.health.go.ug')
                  .catch(err => console.error('An error occured', err));
              }}
            />

          </Drawer.Section>

          <Drawer.Section>

            <DrawerItem
              icon={({ color, size }) => (
                <Iconf
                  name="institution"
                  color={props.inactiveTintColor}
                  size={17}
                />
              )}
              label={() => ( <Text style={{ color: props.inactiveTintColor, fontSize: 16 }}> School </Text> )}
              onPress={() => {
                props.navigation.navigate('Profile')
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="exit-to-app"
                  color={props.inactiveTintColor}
                  size={size}
                />
              )}
              label={() => ( <Text style={{ color: props.inactiveTintColor, fontSize: 16 }}> Sign Out  </Text> )}
              onPress={() => {
                signOut()
              }}
            />

          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#4d505b'
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20, marginTop: 15, marginBottom: 20, paddingLeft: '17%'
  },
  image: {
    width: 100, height: 100
  },
  drawerSection: {
    marginTop: 15,
  },
});
