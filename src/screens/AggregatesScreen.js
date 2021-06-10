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

const AggregatesScreen = ({ route, navigation }) => {

  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');
 
  useEffect(() => {

  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={{paddingTop: 20, left: 10}}>
         <Text style={{fontSize: 18}}> List of Entries</Text>
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
    backgroundColor: 'orange',
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
