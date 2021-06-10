import React from 'react';
import { View, StyleSheet, Linking, Image } from 'react-native';
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

import { AuthContext } from '../components/context';
import logo from '../assets/logo.png';
// import aggregation from '../assets/logo.png';
import aggregation from '../assets/aggregation.png';


export function DrawerContent(props) {

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: '#eec971' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <View style={styles.userInfoSection}>
              <View style={{ marginTop: 15 }}>
                <View style={{ paddingLeft: '10%' }}>
                  <Avatar.Image
                    source={logo}
                    size={100}
                    backgroundColor={'#dacdc9'}
                    style={{ borderRadius: 50 }}
                  />
                </View>
                <View style={{ marginLeft: '15%', flexDirection: 'column' }}>
                  <Title style={styles.title}>U004</Title>
                  <Caption style={styles.caption}>Wakiso</Caption>
                </View>
              </View>
            </View>
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home')
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                // <Icon
                //   name="folder-outline"
                //   color={color}
                //   size={size}
                // />
                <Image source={aggregation} color={color}  style={{width: size, height: size}}/>
              )}
              label="Record Summary"
              onPress={() => {
                props.navigation.navigate('NewAggregate')
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="folder-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Enter Case"
              onPress={() => {
                props.navigation.navigate('NewCase')
              }}
            />

          </Drawer.Section>
          <Drawer.Section title="Contacts">
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="web"
                  color={color}
                  size={size}
                />
              )}
              label="Ministry"
              onPress={() => {
                Linking
                  .openURL('https://www.health.go.ug')
                  .catch(err => console.error('An error occured', err));
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Iconf
              name="institution"
              color={color}
              size={17}
            />
          )}
          label="School"
          onPress={() => {
            props.navigation.navigate('School')
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => {
            signOut()
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    // backgroundColor: '#eec971'
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
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#3a3838',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
