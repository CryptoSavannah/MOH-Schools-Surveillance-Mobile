import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';

import { BASE_API } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "../components/context";
import { ScrollView } from "react-native-gesture-handler";
import { formatTheDateLabel, defaultDate, formatTheDateText } from "../helpers/helpers";

import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import actuatedNormalize from "../helpers/actuatedNormalize";
import RNFetchBlob from 'rn-fetch-blob';

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

    RNFetchBlob.config({
      trusty: true
    })
      .fetch('POST', BASE_API, {
        'Content-Type': 'application/json'
      },
        JSON.stringify({
          cookie: cookie,
          method: "getReports"
        })
      )
      .then(res => {
        // console.log('overview res:', res.data)
        let obj = JSON.parse(res.data)
        if (!mountedRef.current) return null;

        if (obj.status == "500") { signOut() }
        else {
          setReports(obj.data);

          let thepR = null;
          thepR = obj.data.find(x => x.priority == "1");
          setPriorityReport(thepR)
        }
      })
      .catch(function (error) {
        // console.log("Report list Error caught: " + error);
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
      .catch(err => {
        // console.log(err)
      });

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
    props.navigation.setParams({ start_guide: null })
  };

  const WalkthroughableText = walkthroughable(Text);

  const renderReportList = () => {
    return reports && reports.map((report) => {
      return <Picker.item label={report.report_name} value={report} key={report.report_id} />
    })
  }

  const proceedToForm = async (reportt) => {
    if (reportt.report_id !== null) {

      RNFetchBlob.config({
        trusty : true
      })
      .fetch('POST', BASE_API, {
        'Content-Type': 'application/json'
      },
      JSON.stringify({
        cookie: cookie,
        method: "getReportFields",
        reportID: reportt.report_id,
        format: "fill"
      })
      )
      .then(res => {
        // console.log('Report fields res:', res)
        let obj = JSON.parse(res.data)
        // console.log('Report fields res.data:', res.data)

        try {
          if (obj.status == "500") { signOut() }
          else if(obj.status == "400" && obj.errorCode == "400"){
            alert('Form not available.');
          }
          else {
            props.navigation.navigate("NewAggregate", { report: reportt, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
          }
        } catch (error) {
          alert('Fields Error\n' + res)
          return
        }

      })
      .catch(function (error) { console.log("Report fields Error caught: " + error); });
    }
    else {
      alert('select again')
    }
  };

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />

      {selectedStep != "" ? <ScrollView contentContainerStyle={{ backgroundColor: '#ffffff', padding: actuatedNormalize(20) }}>
        <View style={{ marginTop: actuatedNormalize(40) }}>
          <CopilotStep
            text="This is the period over which the report is made."
            order={1}
            name="firstUniqueKey">
            <WalkthroughableText style={[styles.title, { paddingBottom: selectedStep == 'firstUniqueKey' ? actuatedNormalize(70) : 0 }]}>
              Reporting Period
            </WalkthroughableText>
          </CopilotStep>
          <CopilotStep
            text="Edit these dates according to your reporting period."
            order={2}
            name="SecondUniqueKey">
            <WalkthroughableText style={{ flexDirection: 'row', paddingBottom: selectedStep == 'SecondUniqueKey' ? actuatedNormalize(70) : 0 }}>
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
              <WalkthroughableText style={{ paddingBottom: selectedStep == 'thirdUniqueKey' ? actuatedNormalize(70) : 0, marginTop: actuatedNormalize(60), marginBottom: actuatedNormalize(50), alignSelf: 'center' }}>
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => { 
                    // props.navigation.navigate("NewAggregate", { report: priorityReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                  }}
                  style={{
                    backgroundColor: "#F39C12", alignItems: "center", padding: actuatedNormalize(10), borderRadius: 4, elevation: 3,
                    width: (Dimensions.get('screen').width - actuatedNormalize(40))
                  }}
                >
                  <Text style={{ color: "white", fontSize: actuatedNormalize(17) }}>{(priorityReport.report_name).toUpperCase()}</Text>
                </TouchableOpacity>
              </WalkthroughableText>
            </CopilotStep>)}

          <CopilotStep
            text="This is a dropdown list of other reports that can be recorded."
            order={4}
            name="fourthUniqueKey">
            <WalkthroughableText style={{ paddingBottom: selectedStep == 'fourthUniqueKey' ? actuatedNormalize(70) : 0 }}>
              <Text style={{ fontSize: actuatedNormalize(20) }}>Other reports:</Text>
              <View style={[styles.action2, { height: actuatedNormalize(50), marginVertical: actuatedNormalize(15), width: (Dimensions.get('screen').width - actuatedNormalize(40)), alignSelf: 'center' }]} >
                <Picker style={{
                  color: selectedReport === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: actuatedNormalize(18), fontWeight: '100',
                  transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
                }}
                  onValueChange={(itemValue, itemIndex) => setSelectedReport(itemValue)} itemStyle={{ fontSize: actuatedNormalize(18) }} >
                  <Picker.Item value={null} label="Select Report" />
                  {renderReportList()}
                </Picker>
              </View>
            </WalkthroughableText>
          </CopilotStep>

          <View style={{ marginVertical: actuatedNormalize(55) }}>
            <CopilotStep
              text={`Prepare the information needed to fill in your report.\nPress 'Next' to continue to the form.`}
              order={5}
              name="fifththUniqueKey">
              <WalkthroughableText style={{ paddingBottom: selectedStep == 'fifththUniqueKey' ? actuatedNormalize(70) : 0, alignSelf: 'flex-end' }}>
                <View style={{ width: actuatedNormalize(80) }}>
                  <TouchableOpacity
                    activeOpacity={.5}
                    disabled={(selectedReport === null)}
                    onPress={() =>{
                      // props.navigation.navigate("NewAggregate", { report: selectedReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                    }}
                    style={(selectedReport === null) ? styles.inActiveBtn : styles.activeBtn}
                  >
                    <Text style={{ color: "white" }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </WalkthroughableText>
            </CopilotStep>
          </View>
        </View>
      </ScrollView>
        :
        <ScrollView style={{ backgroundColor: '#ffffff', padding: actuatedNormalize(20) }}>

          <View style={{ marginTop: actuatedNormalize(40) }}>
            <Text style={{ fontSize: actuatedNormalize(30), paddingBottom: actuatedNormalize(5) }}>Reporting Period</Text>

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

            <View style={{ width: "100%", marginTop: actuatedNormalize(60), marginBottom: actuatedNormalize(50), alignSelf: 'center' }}>
              {priorityReport && (<TouchableOpacity
                activeOpacity={.5}
                onPress={() => { proceedToForm(priorityReport)
                  // props.navigation.navigate("NewAggregate", { report: priorityReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                }}
                style={{ backgroundColor: "#F39C12", alignItems: "center", padding: actuatedNormalize(10), borderRadius: 4, elevation: 3 }}
              >
                <Text style={{ color: "white", fontSize: actuatedNormalize(17) }}>{(priorityReport.report_name).toUpperCase()}</Text>
              </TouchableOpacity>)}
            </View>

            <Text style={{ fontSize: actuatedNormalize(20) }}>Other reports:</Text>

            <View style={[styles.action2, { height: actuatedNormalize(50), marginVertical: actuatedNormalize(15), width: '100%', alignSelf: 'center' }]} >
              <Picker style={{
                color: selectedReport === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: actuatedNormalize(18), fontWeight: '100',
                transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
              }}
                onValueChange={(itemValue, itemIndex) => setSelectedReport(itemValue)} itemStyle={{ fontSize: actuatedNormalize(18) }} >
                <Picker.Item value={null} label="Select Report" />
                {renderReportList()}
              </Picker>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={{ width: actuatedNormalize(80), marginVertical: actuatedNormalize(55) }}>
                <TouchableOpacity
                  activeOpacity={.5}
                  disabled={(selectedReport === null)}
                  onPress={() =>{ proceedToForm(selectedReport)
                    // props.navigation.navigate("NewAggregate", { report: selectedReport, begin_date: formatTheDateText(fromDate), end_date: formatTheDateText(toDate) })
                  }}
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
  animated: true,
  overlay: 'svg',
})(OverViewScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    backgroundColor: '#ffffff', padding: actuatedNormalize(20)
  },
  title: {
    fontSize: actuatedNormalize(30),
    paddingBottom: actuatedNormalize(5)
  },
  action: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    fontSize: actuatedNormalize(17),
    paddingTop: actuatedNormalize(20)
  },
  action2: {
    paddingTop: actuatedNormalize(5),
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  activeBtn: { backgroundColor: "rgba(3, 136, 229, 1)", alignItems: "center", padding: actuatedNormalize(10), borderRadius: 4, elevation: 3 },
  inActiveBtn: { backgroundColor: "grey", alignItems: "center", padding: actuatedNormalize(10), borderRadius: 4, elevation: 3 },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: actuatedNormalize(20),
    alignItems: 'center',
    paddingHorizontal: actuatedNormalize(40),
  },
});