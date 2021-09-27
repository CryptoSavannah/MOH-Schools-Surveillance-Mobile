import React, { useEffect } from 'react';
import { View, StyleSheet, Linking, Image, Text } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
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
// import aggregation from '../assets/logo.png';
import aggregation from '../assets/aggregation2.png';


export function DrawerContent(props) {

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  // useEffect(() => {
  //   console.log('drawer props: ', props)
  // })

  return (
    <View style={{ flex: 1, backgroundColor: '#4d505b' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.userInfoSection}>
              <View style={{ marginTop: 15, marginBottom: 20 }}>
                <View style={{ paddingLeft: '10%' }}>
                  <Avatar.Image
                    source={logo}
                    size={100}
                    backgroundColor={'#4d505b'}
                    style={{ borderRadius: 0 }}
                  />
                </View>
                {/* <View style={{ marginLeft: '15%', flexDirection: 'column' }}>
                  <Title style={[styles.title, {color: props.inactiveTintColor}]}>U004</Title>
                  <Caption style={[styles.caption, {color: props.inactiveTintColor}]}>Wakiso</Caption>
                </View> */}
              </View>
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
              label={() => (
                <Text style={{ color: props.inactiveTintColor }}>
                  Home
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('Home')
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Image source={aggregation} style={{ width: size, height: size }} />
              )}
              label={() => (
                <Text style={{ color: props.inactiveTintColor }}>
                  Report
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('NewAggregate')
              }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <Iconi
                  name="ios-folder-open-outline"
                  color={props.inactiveTintColor}
                  size={size}
                />
              )}
              label={() => (
                <Text style={{ color: props.inactiveTintColor }}>
                  Covid Case
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('NewCase')
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
              label={() => (
                <Text style={{ color: props.inactiveTintColor }}>
                  New Patient
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('AddNew')
              }}
            />

          </Drawer.Section>
          <Drawer.Section title={
            <Text style={{ color: props.inactiveTintColor }}>
              Contacts
            </Text>
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
                <Text style={{ color: props.inactiveTintColor }}>
                  Ministry
                </Text>
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
              label={() => (
                <Text style={{ color: props.inactiveTintColor }}>
                  School
                </Text>
              )}
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
              label={() => (
                <Text style={{ color: props.inactiveTintColor }}>
                  Sign Out
                </Text>
              )}
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
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    // marginTop: 3,
    // fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
