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
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import Block from "../components/Block";
// import Card from "../components/Card";
import Icon from "react-native-vector-icons/Fontisto";
import Iconm from "react-native-vector-icons/MaterialCommunityIcons";
import morganisms from '../assets/morganisms.png';
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
import { Card, Divider } from 'react-native-elements';
import { Cache } from "react-native-cache";
import ActionButton from 'react-native-action-button';
import Iconf from 'react-native-vector-icons/Ionicons';
import aggregation from '../assets/aggregation2.png';

const OverViewScreen = ({ route, navigation }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const { fromDate } = route.params ?? {};
  const { toDate } = route.params ?? {};
  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');
  const [case_stats, setCase_Stats] = useState('');
  const [summaries_stats, setSummaries_Stats] = useState('');

  const [defaultDate, setDefaultDate] = useState('');

  const [patients, setPatients] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('...starting...: ');
    var date = new Date()
    setDefaultDate(date.getDate() + '/' + date.getMonth() + '/' + (date.getFullYear()))
    if (typeof fromDate !== 'undefined') {
      console.log("fromDate: " + fromDate)
    }

    if (typeof toDate !== 'undefined') {
      console.log("toDate: " + toDate)
    }
    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);
          setUserToken(usr.token);
          setCenter_no(usr.center_no);
          setSchool_id(usr.school_id);
          // fetchData();
          console.log('fetching... ' + usr.school_id);
        }
      })
      .catch(err => console.log(err));

    AsyncStorage.getItem('case_stats')
      .then(the_case_stats => {
        if (the_case_stats !== null && !isNaN(the_case_stats)) {
          setCase_Stats(the_case_stats);
        }
      })
    // .catch(err => console.log(`case_stats error just: `, err));

    AsyncStorage.getItem('summaries_stats')
      .then(the_summaries_stats => {
        if (the_summaries_stats !== null && !isNaN(the_summaries_stats)) {
          setSummaries_Stats(the_summaries_stats);
        }
      })
    // .catch(err => console.log(`summaries_stats error just: `, err));

    console.log('case_stats: ', case_stats)
    if (userToken === '') {

    } else {
      // loadConditions();
      // loadCases();
    }
  }, [userToken, fromDate, toDate, summaries_stats, case_stats]);


  useEffect(() => {

    fetchPatients().then(res => {
      // console.log(res)
      let pats = [];

      res.data.map(x => {
        let date = new Date(x.dob);
        pats.push({
          id: x.patient_id,
          nin: x.nin,
          nin_hash: x.nin_hash,
          name: x.fname + ' ' + x.lname,
          dob: date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1),
          gender: x.gender
        });
      });

      setPatients(pats);

    })

    fetchConditions().then(res => {
      // console.log(res)
      let conds = [];

      res.data.map(x => {
        conds.push({
          id: x.condition_id,
          name: x.condition,
        });
      });

      setConditions(conds)

    })

    const menulist = [
      { id: 1, title: 'Recent Cases', color: '#FF4500', page: 'CasesScreen', items: conditions.slice(0, 5), length: conditions.length },
      { id: 2, title: 'Recent Patients', color: '#FF4500', page: 'PatientsScreen', items: patients, length: patients.length },
    ];

    // const menulist = [
    //   { id: 1, title: 'Recent Cases', color: '#FF4500', page: 'CasesScreen' },
    //   { id: 2, title: 'Recent Patients', color: '#FF4500', page: 'PatientsScreen' },
    // ];

    setData(menulist)

    // makeRemoteRequest()

    // const source = axios.CancelToken.source()
    // setUrl(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`);


    // let mounted = true;

    // const loadData = async () => {
    //   const response = await axios.get(url)

    //     if (mounted && url !== '') {
    //       console.log(response.results)
    //       setData(page === 1 ? response.results : [...data, ...response.results])
    //     }
    // }
    // loadData();


    // const fetchUsers = async () => {
    //   try {
    //     await axios.get(url, {
    //       cancelToken: source.token,
    //     }).then(res => {
    //       console.log(' first Res2: \n')
    //       console.log(res.json().results)
    //       res.json()})
    //     .then(res => {
    //       console.log(res)
    //       setData(page === 1 ? res.results : [...data, ...res.results])
    //       setError(res.error || null);
    //       setIsLoading(false)
    //       setFullData(res.results)
    //     })
    //     .catch(error => {
    //       setError(false);
    //       setIsLoading(false)
    //     })
    //     // ...
    //   } catch (error) {
    //     if (axios.isCancel(error)) {
    //     } else {
    //       throw error
    //     }
    //   }
    // }

    // fetchUsers()

    // return () => {
    //   source.cancel()
    // }
  }, [])


  const openMenu = (pageName) => {
    // opening survey screen
    // console.log('Navigating: '+pageName)
    // navigation.navigate(pageName);
    alert(pageName)
  };

  const slides = [
    { id: 1, title: 'Option 1', url: require('../assets/logo.png') },
    { id: 2, title: 'Option 2', url: require('../assets/logo.png') },
    // { id: 3, title: 'Option 3', url: require('../assets/logo.png') },
    // { id: 4, title: 'Option 4', url: require('../assets/logo.png') },
    // { id: 5, title: 'Option 5', url: require('../assets/logo.png') },
  ];

  const [banners, setBanners] = useState(slides);

  return (
    <>
      <StatusBar backgroundColor='rgba(0,0,0,0.8)' barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { position: 'relative', justifyContent: 'center' }]}>
          <View style={{ justifyContent: 'space-around', position: 'absolute', zIndex: 90, backgroundColor: 'rgba(0,0,0,0.8)', width: '100%', height: '100%', paddingTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', paddingTop: 10, width: '80%' }}>
              <Iconm size={30} name="view-dashboard" color={'#fff'} />
              <Text style={{ fontSize: 20, fontWeight: '500', color: '#fff', paddingLeft: 10 }}>OverView</Text>
            </View>
            <Image source={morganisms} color={'#fff'} style={{ width: 100, height: 100, alignSelf: 'center', paddingBottom: 10 }} />
          </View>
        </View>
        <View style={[styles.footer, { backgroundColor: '#ebebeb', }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <Card containerStyle={styles.card}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 30, paddingRight: 15 }}>{summaries_stats === '' ? 10 : `${summaries_stats}`}</Text>
                  <View style={{ width: '60%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 18 }}>{`Summaries`}</Text>
                    <Text style={{ color: 'grey' }}>{defaultDate}</Text></View>
                  <TouchableOpacity><Text style={[styles.notes, { alignSelf: 'center' }]}>{`View More`}</Text></TouchableOpacity></View>
              </Card>
              <Card containerStyle={styles.card}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 30, paddingRight: 15 }}>{case_stats === '' ? 6 : `${case_stats}`}</Text>
                  <View style={{ width: '60%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 18 }}>{`Covid Cases`}</Text>
                    <Text style={{ color: 'grey' }}>{defaultDate}</Text></View>
                  <TouchableOpacity><Text style={[styles.notes, { alignSelf: 'center' }]}>{`View More`}</Text></TouchableOpacity></View>
              </Card>
            </ScrollView>
            <FlatList
              data={data}
              numColumns={1}
              keyExtractor={(item) => {
                return item.id.toString();
              }}
              renderItem={({ item }) => {
                return (
                  item.title === 'Recent Cases' ?
                    null
                    :
                    <MenuCard2
                      menutab={item}
                      onOpen={() => openMenu(item.page)}
                      navigation={navigation}
                    />
                );
              }} />
          </SafeAreaView>
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="+ Covid Case"
            onPress={() => { navigation.navigate('NewCase'); }}>
            <Iconf
              name="md-folder-open"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Record Summary"
            onPress={() => { navigation.navigate('NewAggregate'); }}>
            <Image source={aggregation} style={{ width: 26, height: 26 }} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Add Patient"
            onPress={() => { navigation.navigate('AddNew'); }}>
            <Iconf
              name="md-person-add"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
      </SafeAreaView>
    </>
  );
};

export default OverViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 5,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
    zIndex: 999
  },
});
