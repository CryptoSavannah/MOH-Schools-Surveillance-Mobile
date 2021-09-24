import React, { useState, useEffect } from "react";
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
import { fetchReportList } from '../model/data';
import { Card } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Iconf from 'react-native-vector-icons/Ionicons';
import aggregation from '../assets/aggregation2.png';
import realm, {
  getAllPatients
} from "../database/database";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NextButton from '../components/NextButton';

const OverViewScreen = ({ route, navigation }) => {

  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [cookie, setUserCookie] = useState('');
  const [toDate, setToDate] = useState('');
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
    setToDate('');
  };

  const handleToConfirm = (e) => {
    hideToDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setToDate('')
    }
    else {
      //format date
      setToDate(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate()))

    }

  };


  const [fromDate, setFromDate] = useState('');

  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);

  const showFromDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
    setFromDate('');
  };

  const handleFromConfirm = (e) => {
    hideFromDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setFromDate('')
    }
    else {
      //format date
      setFromDate(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate()))

    }

  };

  useEffect(() => {
    getReportList();

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);
          // fetchData();
          console.log('fetching... ' + usr.cookie);
        }
      })
      .catch(err => console.log(err));

    // global.window.addEventListener('mousemove', () => {});

    // returned function will be called on component unmount 
    return () => {
      // window.removeEventListener('mousemove', () => {})
      // setSelectedReport('');
    }

  }, []);

  const getReportList = async () => {

    let rprts = [];
    axios({
      url: ***REMOVED***,
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: { 
        "method": "getReports"
      }
    })
      .then(res => {
        console.log(res.data)
        if(res.data.status == "500"){
          AsyncStorage.clear().then(() => navigation.navigate("SignInScreen"))
        }else{
          setReports(res.data.data);
        }
      })
      .catch(function (error) {
        console.log("Report list Error caught: " + error);
        
      });
  };

  const renderReportList = () => {
    return reports.map((report) => {
      return <Picker.item label={report.report_name} value={report} key={report.report_id} />
    })
  }

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <SafeAreaView style={{ backgroundColor: '#ffffff', padding: 10, flex: 1, justifyContent: 'space-around' }}>
        <View style={{ width: '80%', alignSelf: 'center' }}>
          <View style={{ width: "100%", marginTop: 15 }}>
            <TouchableOpacity
              activeOpacity={.5}
              onPress={() => navigation.navigate("CovidView")}
              style={{ backgroundColor: "#F39C12", alignItems: "center", padding: 20, borderRadius: 4, elevation: 3 }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>COVID</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
          <View style={{ width: '40%' }}>
            <View style={styles.action}>
              <TextInput style={{ fontSize: 16 }} onFocus={showFromDatePicker} onKeyPress={showFromDatePicker} label="Date of Birth" placeholder="From Date:"
                value={fromDate == '' ? '' : `From:  ${fromDate}`}
                showSoftInputOnFocus={false} />
            </View>
            <DateTimePickerModal
              isVisible={isFromDatePickerVisible}
              mode="date"
              onConfirm={handleFromConfirm}
              onCancel={hideFromDatePicker}
            />
          </View>
          <View style={{ width: '40%' }}>
            <View style={styles.action}>
              <TextInput style={{ fontSize: 16 }}
                onFocus={showToDatePicker} onKeyPress={showToDatePicker} label="To Date" placeholder="To Date:"
                value={toDate == '' ? '' : `To:  ${toDate}`}
                showSoftInputOnFocus={false} />
            </View>
            <DateTimePickerModal
              isVisible={isToDatePickerVisible}
              mode="date"
              onConfirm={handleToConfirm}
              onCancel={hideToDatePicker}
            />
          </View>
        </View>

        <View style={[styles.action2, { height: 50, marginVertical: 5, width: '100%', alignSelf: 'center' }]} >
          <Picker style={{
            color: selectedReport === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
            transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
          }}
            selectedValue={selectedReport}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedReport(itemValue)
            }} itemStyle={{ fontSize: 18 }} >
            <Picker.Item value={null} label="Select Report" />
            {renderReportList()}
          </Picker>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ width: 80, marginTop: 15 }}>
            <TouchableOpacity
              activeOpacity={.5}
              disabled={(selectedReport === null)}
              onPress={() => navigation.navigate("NewAggregate", { report: selectedReport })}
              style={(selectedReport === null) ? styles.inActiveBtn : styles.activeBtn}
            >
              <Text style={{ color: "white" }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 5,
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  action: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  activeBtn: { backgroundColor: "rgba(3, 136, 229, 1)", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 },
  inActiveBtn: { backgroundColor: "grey", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 }
});
