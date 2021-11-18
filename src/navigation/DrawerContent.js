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

import { AuthContext } from '../components/context';
import logo from '../assets/logo.png';
import actuatedNormalize from '../helpers/actuatedNormalize';

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
                  size={actuatedNormalize(size)}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: actuatedNormalize(16) }}>Home</Text>)}
              onPress={() => { props.navigation.navigate('Home') }}
            />

            <DrawerItem
              activeTintColor={props.activeTintColor}
              icon={({ color, size }) => (
                <Iconf
                  name="info-circle"
                  color={props.inactiveTintColor}
                  size={actuatedNormalize(size)}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: actuatedNormalize(16) }}>How to</Text>)}
              onPress={() => { props.navigation.navigate('HowTo') }}
            />

          </Drawer.Section>

          <Drawer.Section title={
            <Text style={{ color: props.inactiveTintColor, fontSize: actuatedNormalize(16) }}>Contacts</Text>
          }>

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="web"
                  color={props.inactiveTintColor}
                  size={actuatedNormalize(size)}
                />
              )}
              label={() => (
                <Text style={{ color: props.inactiveTintColor, fontSize: actuatedNormalize(16) }}>Ministry</Text>
              )}
              onPress={() => {
                Linking
                  .openURL('https://www.health.go.ug')
                  .catch(err => console.error('An error occured', err));
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Iconf
                  name="institution"
                  color={props.inactiveTintColor}
                  size={17}
                  style={{ paddingLeft: 3 }}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: actuatedNormalize(16), paddingLeft: actuatedNormalize(2) }}>Center</Text>)}
              onPress={() => {
                props.navigation.navigate('Profile')
              }}
            />

          </Drawer.Section>

          <Drawer.Section>

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="exit-to-app"
                  color={props.inactiveTintColor}
                  size={actuatedNormalize(size)}
                />
              )}
              label={() => (<Text style={{ color: props.inactiveTintColor, fontSize: actuatedNormalize(16) }}>Sign Out</Text>)}
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
    paddingLeft: actuatedNormalize(20), marginTop: actuatedNormalize(25), marginBottom: actuatedNormalize(8), paddingLeft: '17%', paddingBottom: actuatedNormalize(20)
  },
  image: {
    width: actuatedNormalize(100), height: actuatedNormalize(100)
  },
  drawerSection: {
    marginTop: actuatedNormalize(15),
  },
});
