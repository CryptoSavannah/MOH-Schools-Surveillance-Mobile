import React, { useState, useEffect, createRef, useRef } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_API } from '../../env.json';
import { fetchReportFields } from '../model/data';

const AggregateForm = ({ route, navigation }) => {

  const [cookie, setUserCookie] = useState('');
  const [facilityID, setFacilityID] = useState('');

  const { report, begin_date, end_date } = route.params ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const [reportForm, setReportForm] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);
  const [state, setState] = useState({});

  const handleDatesChange = (varID, dateValue) => {
    setState(prevState => ({
      ...prevState,
      [varID]: dateValue
    }));
  };

  const defaultDate = new Date();
  let theDefDate = defaultDate.getFullYear() + '-' + defaultDate.getMonth() + '-' + (defaultDate.getDate());

  const [sindex, setSIndex] = useState({ varID: "", name: "" });
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [sAccordion, setSAccordion] = useState("");

  const showToDatePicker = (varID, name) => {
    setSIndex({ varID: varID, name: name })
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleToConfirm = (e) => {
    hideToDatePicker();

    var date = new Date(e);
    if (isNaN(date.getTime())) {
    }
    else {
      const theDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      handleDatesChange(sindex.varID, theDate)

      let newArr = valuesArray.filter(x => x.name !== sindex.name)
      var newEl = {
        "name": sindex.name,
        "VarID": sindex.varID,
        "value": theDate,
      }

      setValuesArray([...newArr, newEl])
    }
  };

  const getReportFields = async () => {

    let config = {
      url: BASE_API,
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: {
        "method": "getReportFields",
        "reportID": report.report_id
      }
    };
    if (report.report_id !== null) {
      axios(config)
        .then(res => {
          if (res.data.status == "500") { signOut() }
          else {
            setReportForm(res.data.data); // console.log("the report  ", res.data.data[2].data)
          }
        })
        .catch(function (error) { console.log("Report fields Error caught: " + error); });

      // fetchReportFields().then(res => {
      //   // console.log("reportForm ", res.data)
      //   setReportForm(res.data)
      // })
    }
    else {
      alert('select again')
    }
  };

  useEffect(() => {

    navigation.setOptions({
      title: report.report_name,
    });

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) { }
        else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);
          setFacilityID(usr.userid)
          getReportFields()
        }
      })
      .catch(err => console.log(err));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  }, [sindex, sAccordion])

  const onSubmit = (async () => {
    setIsLoading(true)

    console.log("valuesArray: ", valuesArray)

    let config = {
      url: BASE_API,
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      method: "submitReport",
      begin_date: begin_date,
      end_date: end_date,
      facilityID: facilityID,
      reportID: report.report_id,
      formdata: valuesArray
    };
    // console.log("config: ", config)

    await axios.post(BASE_API, { config })
      .then(function (response) {
        console.log("response: ", response)
        if (response.status === 200) {

          alert('Success!', `${report.report_name} Saved!`, [{
            text: 'Okay', onPress: () => { cancel() },
          }]);

        } else {

          console.log(response.status);
          alert(`Failed to save ${report.report_name}.\nPlease try again.`, [{
            text: 'Okay', onPress: () => { return },
          }]);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert(`Failed to save ${report.report_name}.`, error + '\nPlease try again.', [{
          text: 'Okay', onPress: () => { return },
        }]);
      }).finally(() => { setIsLoading(false) })
  })

  const cancel = () => { navigation.goBack(); };

  const getChecked = (varID) => {
    // return true
    return valuesArray.some(function(el) {
      return el.VarID === varID;
    }); 
  }

  const renderReportForm = () => {

    if (reportForm.length == 0) { return null }
    else {

      var outterArray = [];
      reportForm.forEach(field => {

        let newfield = {}
        newfield["name"] = field.Name
        newfield["label"] = field.Name
        newfield["varID"] = field.data[0].varID
        newfield["type"] = field.data[0].dataType
        newfield["fieldID"] = field.IndicatorID
        if (field.data.length == 1) {
        }
        else {
          let options = []
          field.data.forEach(option => {
            let newOption = { "label": option.dataLabel, "value": option.varID }
            options.push(newOption)
          })
          newfield["options"] = options
        }

        outterArray.push(newfield)

      })

      return renderAField(outterArray)
    }
  }

  const renderAField = (fields) => {

    return (
      <View style={{ paddingTop: 20 }}>
        {
          fields && fields.map(el => {
            switch (el.type) {
              case "textInput":
                return (
                  <View style={styles.inputView} key={el.varID}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={el.name}
                      placeholderTextColor="#003f5c"
                      name={el.name}
                      autoCorrect={false}
                      onChangeText={(text) => {

                        let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                        var newEl = {
                          "name": el.name,
                          "VarID": el.varID,
                          "value": text,
                        }

                        setValuesArray([...newArr, newEl])

                      }} />
                  </View>)
              case "numericInput":
                return (
                  <View style={styles.inputView} key={el.varID}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={el.name}
                      placeholderTextColor="#003f5c"
                      name={el.name}
                      keyboardType="numeric"
                      autoCorrect={false}
                      onChangeText={(text) => {
                        let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                        var newEl = {
                          "name": el.name,
                          "VarID": el.varID,
                          "value": text,
                        }

                        setValuesArray([...newArr, newEl])

                      }} />
                  </View>)

              case "select":
                return (
                  <View style={{ marginHorizontal: 25 }}>
                    <View style={[styles.action2, styles.pickerWrapper]} key={el.varID} >
                      <Picker style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                          let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                          var newEl = {
                            "name": el.name,
                            "VarID": itemValue.value,
                            "value": itemValue.value,
                          }

                          setValuesArray([...newArr, newEl])
                        }} itemStyle={styles.pickerItem} >
                        <Picker.Item value={null} label={`Select ${el.label}`} />
                        {
                          el.options && el.options.map((option) => {
                            return <Picker.item label={option.label} value={option} key={option.value} />
                          })
                        }
                      </Picker>
                    </View>
                  </View>)

              case "checkbox":
                return (<>
                  {el.options ?
                    <Collapse key={el.fieldID} style={{ marginHorizontal: 10, marginVertical: 5 }} isExpanded={(sAccordion === `${el.name}`)} onToggle={(s) => { setSAccordion(el.name) }}>
                      <CollapseHeader style={styles.header}>
                        <Text style={[styles.headerText, { color: 'black', marginVertical: 10 }]}>{el.name + (sAccordion !== `${el.name}` ? " " : " :")}</Text>
                        {(sAccordion !== `${el.name}`) ? <Icon name="hand-o-right" color="black" size={15} style={{ paddingTop: 16 }} /> : null}
                      </CollapseHeader>
                      <CollapseBody>
                        {el.options.map((option) => {
                          return (
                            <View style={styles.checkBoxGrp} key={option.value} >
                              <CheckBox
                                value={state[option.value] || false}
                                onValueChange={(itemValue) => {
                                  handleDatesChange(option.value, itemValue)

                                  let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                                  var newEl = {
                                    "name": option.name,
                                    "VarID": option.value,
                                    "value": itemValue,
                                  }
                                  if (itemValue) {
                                    setValuesArray([...newArr, newEl])
                                  }
                                  else {
                                    setValuesArray([...newArr])
                                  }
                                }}
                              />
                              <Text style={styles.headerText}>{option.label}</Text>

                            </View>)
                        })}
                      </CollapseBody>
                    </Collapse>
                    :
                    <View style={styles.checkBoxGrp} key={el.varID} >
                      <Text style={styles.headerText}>{el.name}</Text>
                      <CheckBox
                        value={state[el.varID] || false}
                        onValueChange={(itemValue) => {
                          handleDatesChange(el.varID, itemValue)

                          let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                          var newEl = {
                            "name": el.name,
                            "VarID": el.varID,
                            "value": el.varID,
                          }
                          if (itemValue) {
                            setValuesArray([...newArr, newEl])
                          }
                          else {
                            setValuesArray([...newArr])
                          }
                        }}
                      />
                    </View>
                  }
                </>)

              case "date":
                return (<>
                  {el.options ?
                    <Collapse key={el.fieldID} style={{ marginHorizontal: 10 }} isExpanded={(sAccordion === `${el.name}`)} onToggle={(s) => { setSAccordion(el.name) }}>
                      <CollapseHeader style={styles.header}>
                        <Text style={[styles.headerText, { color: 'black', marginVertical: 10 }]}>{el.name + (sAccordion !== `${el.name}` ? " " : " :")}</Text>
                        {(sAccordion !== `${el.name}`) ? <Icon name="hand-o-right" color="black" size={15} style={{ paddingTop: 16 }} /> : null}
                      </CollapseHeader>
                      <CollapseBody>
                        {el.options.map((option) => {
                          return (
                            <View style={[styles.action4, { flexDirection: 'row' }]} key={option.value}>
                              <TextInput style={{ fontSize: 18 }} onFocus={() => showToDatePicker(option.value, option.label)} onKeyPress={() => showToDatePicker(option.value, option.label)} label={option.label} placeholder={option.label}
                                value={`${option.label}:`}
                                showSoftInputOnFocus={false} />
                              <TextInput style={{ fontSize: 18 }} onFocus={() => showToDatePicker(option.value, option.label)} onKeyPress={() => showToDatePicker(option.value, option.label)} label={option.label} placeholder={option.label}
                                value={state[option.value] || theDefDate} />
                            </View>)
                        })}
                      </CollapseBody>
                    </Collapse>
                    :
                    <View style={[styles.action4, { flexDirection: 'row' }]} key={el.varID}>
                      <TextInput style={{ fontSize: 18 }} onFocus={() => showToDatePicker(el.varID, el.name)} onKeyPress={() => showToDatePicker(el.varID, el.name)} label={el.Name} placeholder={el.Name}
                        value={`${el.name}:`}
                        showSoftInputOnFocus={false} />
                      <TextInput style={{ fontSize: 18 }} onFocus={() => showToDatePicker(el.varID, el.name)} onKeyPress={() => showToDatePicker(el.varID, el.name)} label={el.Name} placeholder={el.Name}
                        value={state[el.varID] || theDefDate} />
                    </View>
                  }
                </>)

              default:
                return null
            }
          })
        }
      </View>
    )
  }

  //-------------------------------------------------------------------------

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>

        {(reportForm.length == 0) ?

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" animating={reportForm.length == 0} color="rgba(3, 136, 229, 1)" />
          </View>

          :
          <>
            {renderReportForm()}
            <View style={styles.btnWrapper}>
              <View style={styles.btn}>
                <Button
                  block
                  color="grey" title="Cancel" onPress={() => { cancel() }} />
              </View>
              <View style={styles.btn}>
                {!isLoading ?
                  <Button title="Save"
                    block
                    color="rgba(3, 136, 229, 1)"
                    onPress={() => { onSubmit() }}
                  />
                  :
                  <TouchableOpacity
                    style={styles.activityIndicator}
                    underlayColor='rgba(3, 136, 229, 1)'
                  >
                    <ActivityIndicator animating={isLoading} color="#fff" />
                  </TouchableOpacity>
                }
              </View>
            </View>
          </>
        }
        <DateTimePickerModal
          isVisible={isToDatePickerVisible}
          mode="date"
          onConfirm={handleToConfirm}
          onCancel={hideToDatePicker}
        />
      </ScrollView>
    </>
  );
};

export default AggregateForm;

const styles = StyleSheet.create({
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  inputView: {
    backgroundColor: '#fff',
    borderRadius: 2,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginHorizontal: 25
  },
  inputText: {
    height: 50,
    fontSize: 18
  },
  picker: {
    color: '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
    transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
  },
  pickerItem: {
    fontSize: 18
  },
  scrollViewStyle: {
    flexGrow: 1, justifyContent: 'center'
  },
  pickerWrapper: {
    height: 50, marginBottom: 20, width: '100%', alignSelf: 'center',
  },
  btnWrapper: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 30, marginBottom: 10, marginHorizontal: 20
  },
  btn: {
    width: 80, marginBottom: 10
  },
  activityIndicator: {
    alignItems: "center", padding: 10, backgroundColor: "rgba(3, 136, 229, 1)"
  },
  action4: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginBottom: 5,
    marginHorizontal: 25
  },
  headerText: {
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 5
  },
  checkBoxGrp: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  header: { flexDirection: 'row' }
});