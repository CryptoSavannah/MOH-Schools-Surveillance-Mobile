import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions, Image,
  SafeAreaView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import Block from "../components/Block";
import Card from "../components/Card";
import Icon from "react-native-vector-icons/Fontisto";
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import * as theme from '../constants/theme';
import {
  LineChart
} from "react-native-chart-kit";
import axios from "axios";
import { DASH_LABEL_KEY, GRAPH_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import Swiper from 'react-native-swiper';
import MenuCard from '../components/MenuCard';
import MenuCard2 from '../components/MenuCard2';
import SurveyCard from '../components/SurveyCard';
import * as Animatable from 'react-native-animatable';
import { fetchPatients, fetchConditions } from '../model/data';
import { Divider } from 'react-native-elements';

const AggregatesScreen = ({ route, navigation }) => {

  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');

  useEffect(() => {

  }, []);

  const keyExtractor = (item, index) => item.id.toString();

  const renderItem = ({ item }) => (
    < View style={{ paddingVertical: 4 }}>
      {
        item.type === 'case' ?
          <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
            <Iconm
              name="folder-outline"
              color="#000"
              size={30}
              style={{ paddingRight: 15 }}
            />
            <View style={{ width: '70%'}}>
              <Text style={{ fontWeight: '400', fontSize: 18 }}>{`${item.type}`}</Text>
              <Text style={{ color: 'grey' }}>{`24644795f0cf23f7 \n date posted, time`}</Text></View>
            <TouchableOpacity><Text style={{ alignSelf: 'center' }}>{`Edit case`}</Text></TouchableOpacity></View>
          :
          <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
            <Iconm
              name="file-outline"
              color="#000"
              size={30}
              style={{ paddingRight: 15 }}
            />
            <View style={{ width: '70%'}}>
              <Text style={{ fontWeight: '400', fontSize: 18 }}>{`${item.type} record`}</Text>
              <Text style={{ color: 'grey' }}>{`date posted, time`}</Text></View>
            <TouchableOpacity><Text style={{ alignSelf: 'center' }}>{`View`}</Text></TouchableOpacity></View>
      }
    </View>
  );

  const dataList = [{ "id": 1, "type": "case" }, { "id": 2, "type": "aggregate" }]

  return (
    <>
      <View style={styles.container}>
        <View style={{ paddingTop: 10 }}>
          {/* <Text style={{ fontSize: 18, left: 10 }}> List of Entries</Text> */}

          <FlatList
            data={dataList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (<Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 10 }} />)}
          />
        </View>

      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => { navigation.navigate('NewAggregate'); }}>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Icon name="plus-a" size={25} color={'#fff'} />
        </Animatable.View>
      </TouchableOpacity>

    </>
  );
};

export default AggregatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  floatingActionButton: {
    backgroundColor: 'rgba(231,76,60,1)',
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: '25%',
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
});
