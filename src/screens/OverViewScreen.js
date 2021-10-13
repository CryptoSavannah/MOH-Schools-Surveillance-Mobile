import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import axios from "axios";
import { BASE_API } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../components/context";
import { ScrollView } from "react-native-gesture-handler";
import { formatTheDateLabel, defaultDate, formatTheDateText } from "../helpers/helpers";

const OverViewScreen = ({ route, navigation }) => {

  const { signOut } = React.useContext(AuthContext);

  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [cookie, setUserCookie] = useState('');
  const [toDate, setToDate] = useState(defaultDate);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(defaultDate);
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [priorityReport, setPriorityReport] = useState(null);

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleToConfirm = (e) => {
    hideToDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setToDate(defaultDate)
    }
    else {
      setToDate(date)
    }
  };

  const showFromDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
  };

  const handleFromConfirm = (e) => {
    hideFromDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setFromDate(defaultDate)
    }
    else {
      setFromDate(date)
    }
  };

  useEffect(() => {
    getReportList();

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) { }
        else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);
          navigation.setOptions({ title: usr.display_name });
        }
      })
      .catch(err => console.log(err));

  }, [selectedReport, priorityReport, fromDate, toDate]);

  const getReportList = async () => {

    axios({
      url: BASE_API,
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: {
        "method": "getReports"
      }
    })
      .then(res => {
        if (res.data.status == "500") { signOut() }
        else {
          setReports(res.data.data);
          let thepR = null;
          thepR = reports.find(x => x.priority == "1");
          setPriorityReport(thepR)
        }
      })
      .catch(function (error) {
        console.log("Report list Error caught: " + error);
        AsyncStorage.clear().then(() => { signOut() });
      });
  };

  const renderReportList = () => {
    return reports && reports.map((report) => {
      return <Picker.item label={report.report_name} value={report} key={report.report_id} />
    })
  }

  const renderPriorityReport = () => {
    return priorityReport && (<TouchableOpacity
      activeOpacity={.5}
      onPress={() =>
        navigation.navigate("NewAggregate", { report: priorityReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
      }
      style={{ backgroundColor: "#F39C12", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 }}
    >
      <Text style={{ color: "white", fontSize: 17 }}>{(priorityReport.report_name).toUpperCase()}</Text>
    </TouchableOpacity>)
  }

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <ScrollView style={{ backgroundColor: '#ffffff', padding: 20 }}>
        <View style={{ width: "100%", marginTop: 40, alignSelf: 'center' }}>
          {reports && (renderPriorityReport())}
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 35, paddingBottom: 5 }}>Other Reports</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View>
              <TextInput style={[styles.action, { fontWeight: 'bold' }]} onFocus={showFromDatePicker} onKeyPress={showFromDatePicker} label="From Date" placeholder="From Date"
                value={`From:`}
                showSoftInputOnFocus={false} />
              <TextInput style={[styles.action, { fontWeight: 'bold' }]}
                onFocus={showToDatePicker} onKeyPress={showToDatePicker} label="To Date" placeholder="To Date"
                value={`To:`}
                showSoftInputOnFocus={false} />

            </View>
            <View style={{ width: Dimensions.get('window').width }}>
              <TextInput style={styles.action} onFocus={showFromDatePicker} onKeyPress={showFromDatePicker} label="From Date" placeholder="From Date"
                value={fromDate == '' ? '' : formatTheDateLabel(fromDate)
                } />
              <TextInput style={styles.action}
                onFocus={showToDatePicker} onKeyPress={showToDatePicker} label="To Date" placeholder="To Date"
                value={toDate == '' ? '' : formatTheDateLabel(toDate)} />
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isFromDatePickerVisible}
            mode="date"
            date={fromDate}
            onConfirm={handleFromConfirm}
            onCancel={hideFromDatePicker}
          />

          <DateTimePickerModal
            isVisible={isToDatePickerVisible}
            mode="date"
            date={toDate}
            onConfirm={handleToConfirm}
            onCancel={hideToDatePicker}
          />

          <View style={[styles.action2, { height: 50, marginVertical: 25, width: '100%', alignSelf: 'center' }]} >
            <Picker style={{
              color: selectedReport === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
              transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
            }}
              onValueChange={(itemValue, itemIndex) => setSelectedReport(itemValue)} itemStyle={{ fontSize: 18 }} >
              <Picker.Item value={null} label="Select Report" />
              {renderReportList()}
            </Picker>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginVertical: 55 }}>
              <TouchableOpacity
                activeOpacity={.5}
                disabled={(selectedReport === null)}
                onPress={() =>
                  navigation.navigate("NewAggregate", { report: selectedReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                }
                style={(selectedReport === null) ? styles.inActiveBtn : styles.activeBtn}
              >
                <Text style={{ color: "white" }}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OverViewScreen;

const styles = StyleSheet.create({
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  action: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    fontSize: 17,
    paddingTop: 20
  },
  activeBtn: { backgroundColor: "rgba(3, 136, 229, 1)", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 },
  inActiveBtn: { backgroundColor: "grey", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 }
});
