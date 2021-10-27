import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';


import axios from "axios";
import { BASE_API } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../components/context";
import { ScrollView } from "react-native-gesture-handler";
import { formatTheDateLabel, defaultDate, formatTheDateText } from "../helpers/helpers";

import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const OverViewScreen = (props) => {
  const [selectedStep, setSelectedStep] = useState('');

  const { signOut } = React.useContext(AuthContext);

  const [selectedReport, setSelectedReport] = useState(null);
  const { start_guide } = props.route.params ?? {};
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

  const mountedRef = useRef(true);

  const fetchReportList = useCallback(async () => {

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
        if (!mountedRef.current) return null;

        if (res.data.status == "500") { signOut() }
        else {
          setReports(res.data.data);

          let thepR = null;
          thepR = res.data.data.find(x => x.priority == "1");
          setPriorityReport(thepR)
        }
      })
      .catch(function (error) {
        console.log("Report list Error caught: " + error);
        AsyncStorage.clear().then(() => { signOut() });
      });

  }, [mountedRef]);

  useEffect(() => {

    if (start_guide && start_guide === "start") {
      setSelectedStep('firstUniqueKey')
      props.copilotEvents.on('stepChange', handleStepChange);
      props.copilotEvents.on('stop', handleStop);
      props.start();
    } else {
      setSelectedStep('')
    }

    fetchReportList();

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) { }
        else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);
          props.navigation.setOptions({ title: usr.display_name });
        }
      })
      .catch(err => console.log(err));

    return () => {
      mountedRef.current = false;
      props.copilotEvents.off('stepChange');
      props.copilotEvents.off('stop', handleStop);
    };

  }, [selectedReport, priorityReport, fromDate, toDate, fetchReportList, start_guide]);

  const handleStepChange = (step) => {
    setSelectedStep(step.name)
  };

  const handleStop = (step) => {
    props.navigation.setParams({start_guide: null})
  };

  const WalkthroughableText = walkthroughable(Text);

  const renderReportList = () => {
    return reports && reports.map((report) => {
      return <Picker.item label={report.report_name} value={report} key={report.report_id} />
    })
  }

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />

      {selectedStep != "" ? <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', padding: 20 }}>
        <View style={{ marginTop: 40 }}>
          <CopilotStep
            text="This is the period over which the report is made."
            order={1}
            name="firstUniqueKey">
            <WalkthroughableText style={[styles.title, { paddingBottom: selectedStep == 'firstUniqueKey' ? 70 : 0 }]}>
              Reporting Period
            </WalkthroughableText>
          </CopilotStep>
          <CopilotStep
            text="Edit these dates according to your reporting period."
            order={2}
            name="SecondUniqueKey">
            <WalkthroughableText style={{ flexDirection: 'row', paddingBottom: selectedStep == 'SecondUniqueKey' ? 70 : 0 }}>
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
            </WalkthroughableText>
          </CopilotStep>

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
          {priorityReport && (
            <CopilotStep text={`This is the priority report.\n\nThis button takes you directly to the form.`} order={3} name="thirdUniqueKey">
              <WalkthroughableText style={{ paddingBottom: selectedStep == 'thirdUniqueKey' ? 70 : 0, marginTop: 60, marginBottom: 50, alignSelf: 'center' }}>
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() =>
                    props.navigation.navigate("NewAggregate", { report: priorityReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                  }
                  style={{
                    backgroundColor: "#F39C12", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3,
                    width: (Dimensions.get('screen').width - 40)
                  }}
                >
                  <Text style={{ color: "white", fontSize: 17 }}>{(priorityReport.report_name).toUpperCase()}</Text>
                </TouchableOpacity>
              </WalkthroughableText>
            </CopilotStep>)}

          <CopilotStep
            text="This is a dropdown list of other reports that can be recorded."
            order={4}
            name="fourthUniqueKey">
            <WalkthroughableText style={{ paddingBottom: selectedStep == 'fourthUniqueKey' ? 70 : 0 }}>
              <Text style={{ fontSize: 20 }}>Other reports:</Text>
              <View style={[styles.action2, { height: 50, marginVertical: 15, width: (Dimensions.get('screen').width - 40), alignSelf: 'center' }]} >
                <Picker style={{
                  color: selectedReport === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
                  transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
                }}
                  onValueChange={(itemValue, itemIndex) => setSelectedReport(itemValue)} itemStyle={{ fontSize: 18 }} >
                  <Picker.Item value={null} label="Select Report" />
                  {renderReportList()}
                </Picker>
              </View>
            </WalkthroughableText>
          </CopilotStep>

          <View style={{ marginVertical: 55 }}>
            <CopilotStep
              text={`Prepare the information needed to fill in your report.\nPress 'Next' to continue to the form.`}
              order={5}
              name="fifththUniqueKey">
              <WalkthroughableText style={{ paddingBottom: selectedStep == 'fifththUniqueKey' ? 70 : 0 }}>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ width: 80 }}>
                    <TouchableOpacity
                      activeOpacity={.5}
                      disabled={(selectedReport === null)}
                      onPress={() =>
                        props.navigation.navigate("NewAggregate", { report: selectedReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                      }
                      style={(selectedReport === null) ? styles.inActiveBtn : styles.activeBtn}
                    >
                      <Text style={{ color: "white" }}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </WalkthroughableText>
            </CopilotStep>
          </View>
        </View>
      </ScrollView>
        :
        <ScrollView style={{ backgroundColor: '#ffffff', padding: 20 }}>

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 30, paddingBottom: 5 }}>Reporting Period</Text>

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

            <View style={{ width: "100%", marginTop: 60, marginBottom: 50, alignSelf: 'center' }}>
              {priorityReport && (<TouchableOpacity
                activeOpacity={.5}
                onPress={() =>
                  props.navigation.navigate("NewAggregate", { report: priorityReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                }
                style={{ backgroundColor: "#F39C12", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 }}
              >
                <Text style={{ color: "white", fontSize: 17 }}>{(priorityReport.report_name).toUpperCase()}</Text>
              </TouchableOpacity>)}
            </View>

            <Text style={{ fontSize: 20 }}>Other reports:</Text>

            <View style={[styles.action2, { height: 50, marginVertical: 15, width: '100%', alignSelf: 'center' }]} >
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
                    props.navigation.navigate("NewAggregate", { report: selectedReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                  }
                  style={(selectedReport === null) ? styles.inActiveBtn : styles.activeBtn}
                >
                  <Text style={{ color: "white" }}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      }
    </>
  );
};

export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(OverViewScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 40,
    backgroundColor: '#ffffff', padding: 20
  },
  title: {
    fontSize: 30,
    paddingBottom: 5
    // paddingBottom: 35
    // textAlign: 'center',
    // margin: 20,
  },
  action: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    fontSize: 17,
    paddingTop: 20
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  activeBtn: { backgroundColor: "rgba(3, 136, 229, 1)", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 },
  inActiveBtn: { backgroundColor: "grey", alignItems: "center", padding: 10, borderRadius: 4, elevation: 3 },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});