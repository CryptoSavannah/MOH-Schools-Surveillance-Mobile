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
import Iconm from "react-native-vector-icons/MaterialCommunityIcons";
import morganisms from '../assets/morganisms.png';
import axios from "axios";
import { DASH_LABEL_KEY, GRAPH_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import MenuCard2 from '../components/MenuCard2';
import { fetchPatients, fetchConditions } from '../model/data';
import { Card } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Iconf from 'react-native-vector-icons/Ionicons';
import aggregation from '../assets/aggregation2.png';
import realm, {
  getAllPatients
} from "../database/database";
import { Picker } from '@react-native-picker/picker';

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
  // const [patients, setPatients] = useState(getAllPatients());
  const [conditions, setConditions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedReport, setSelectedReport] = useState('');

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

    setData(menulist)

  }, [])

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <SafeAreaView >
        <ScrollView style={{backgroundColor: '#fff'}}>
          <Text style={styles.headingStyle}>{"Surveillance Actions:"}</Text>
          <View style={{ width: 120, marginBottom: 40 }}>
            <Button
              rounded
              block
              // style={styles.btn}
              color="#4d505b" title="Covid" onPress={() => goToFinish()}>
              <Text>0388E5</Text>
            </Button>
          </View>

          <View style={[styles.action2, { height: 50, marginVertical: 5, width: '100%', alignSelf: 'center' }]} >
            <Picker style={{
              color: selectedReport === '' ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
              transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
            }}
              selectedValue={selectedReport}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedReport(itemValue);
              }} itemStyle={{ fontSize: 18 }} >
              <Picker.Item value="" label="Select Report" />
              {/* {conditions.map(x => {
                <Picker.Item value={x.id} label={x.name} key={x.id}/>
              })
              } */}
              <Picker.Item value="1" label="WASH" />
              <Picker.Item value="11" label="Registry" />
              <Picker.Item value="12" label="Covid" />
            </Picker>
          </View>
        </ScrollView>
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
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  card: {
    flex: 1,
    justifyContent: "space-around"
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20
  },
});
