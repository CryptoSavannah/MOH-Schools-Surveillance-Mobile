import React, { useState, useEffect, createRef, useRef } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_API } from '../../env.json';
import { defaultDate, formatTheDateLabel, formatTheDateText } from '../helpers/helpers';

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

  const [sindex, setSIndex] = useState({ fieldID: "", varID: "", name: "" });
  const [pickerDate, setPickerDate] = useState(defaultDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [sAccordion, setSAccordion] = useState("");

  const showDatePicker = (fieldID, varID, name) => {
    setSIndex({fieldID:fieldID, varID: varID, name: name })
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (e) => {
    hideDatePicker();

    var date = new Date(e);
    if (isNaN(date.getTime())) {
    }
    else {
      handleDatesChange(sindex.varID, date)

      let newArr = valuesArray.filter(x => x.name !== sindex.name)
      var newEl = {
        "name": sindex.name,
        "IndicatorID": sindex.fieldID,
        "VarID": sindex.varID,
        "value": formatTheDateText(date),
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
        "reportID": report.report_id,
        "format": "fill"
      }
    };
    if (report.report_id !== null) {
      axios(config)
        .then(res => {
          // console.log("the res  ", res)
          if (res.data.status == "500") { signOut() }
          else {
            setReportForm(res.data.data); // console.log("the report  ", res.data.data)
          }
        })
        .catch(function (error) { console.log("Report fields Error caught: " + error); });
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

    //warnings: ...
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Warning:']);

  }, [sindex, sAccordion, pickerDate])

  const onSubmit = (async () => {
    setIsLoading(true)

    // valid responses ? continue : return

    // clean response
    valuesArray.forEach(x => {
      delete x.name
    })

    const data= {
      "method": "submitForm",
      "begin_date": begin_date,
      "end_date": end_date,
      "facilityID": facilityID,
      "reportID": report.report_id,
      "formdata": valuesArray
    }

    console.log("valuesArray: ", data)
    // setIsLoading(false)
    // return

    axios({
      url: BASE_API,
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: {
        "method": "submitForm",
        "begin_date": begin_date,
        "end_date": end_date,
        "facilityID": facilityID,
        "reportID": report.report_id,
        "formdata": valuesArray
      }
    })
      .then(res => {
        console.log("response: ", res)
        if (res.status === 200) {

          alert(res.data.errorDetail, [{
            text: 'Okay', onPress: () => { },
          }]);
          cancel()

        } else {

          console.log(res.status);
          alert(res.data.errorDetail, [{
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
                  <View style={styles.inputView} key={el.fieldID}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={el.name}
                      placeholderTextColor="#000"
                      name={el.name}
                      autoCorrect={false}
                      onChangeText={(text) => {

                        let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                        var newEl = {
                          "name": el.name,
                          "IndicatorID": el.fieldID,
                          "VarID": el.varID,
                          "value": text,
                        }

                        setValuesArray([...newArr, newEl])

                      }} />
                  </View>)
              case "numericInput":
                return (
                  <View style={styles.inputView} key={el.fieldID}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={el.name}
                      placeholderTextColor="#000"
                      name={el.name}
                      keyboardType="numeric"
                      autoCorrect={false}
                      onChangeText={(text) => {
                        let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                        var newEl = {
                          "name": el.name,
                          "IndicatorID": el.fieldID,
                          "VarID": el.varID,
                          "value": text,
                        }

                        setValuesArray([...newArr, newEl])

                      }} />
                  </View>)

              case "select":
                return (
                  <View style={{ marginHorizontal: 25 }} key={el.fieldID} >
                    <View style={[styles.action2, styles.pickerWrapper]} >
                      <Picker style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                          let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                          var newEl = {
                            "name": el.name,
                            "IndicatorID": el.fieldID,
                            "VarID": itemValue.value,
                            "value": itemValue.value,
                          }

                          setValuesArray([...newArr, newEl])
                        }} itemStyle={styles.pickerItem} >
                        <Picker.Item value={null} label={`Select ${el.label}`} key={"null"} />
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
                            <TouchableOpacity style={styles.checkBoxGrp} key={option.value} onPress={() => {
                              handleDatesChange(option.value, !(state[option.value]))

                              let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                              var newEl = {
                                "name": option.name,
                                "IndicatorID": el.fieldID,
                                "VarID": option.value,
                                "value": !(state[option.value]),
                              }
                              if (!(state[option.value])) {
                                setValuesArray([...newArr, newEl])
                              }
                              else {
                                setValuesArray([...newArr])
                              }
                            }} >
                              <CheckBox
                                value={state[option.value] || false}
                                onValueChange={(itemValue) => {
                                  handleDatesChange(option.value, itemValue)

                                  let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                                  var newEl = {
                                    "name": option.name,
                                    "IndicatorID": el.fieldID,
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

                            </TouchableOpacity>)
                        })}
                      </CollapseBody>
                    </Collapse>
                    :
                    <TouchableOpacity style={styles.checkBoxGrp} key={el.varID} onPress={() => {
                      handleDatesChange(el.varID, !(state[el.varID]))

                      let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                      var newEl = {
                        "name": el.name,
                        "IndicatorID": el.fieldID,
                        "VarID": el.varID,
                        "value": !(state[el.varID]),
                      }
                      if (!(state[el.varID])) {
                        setValuesArray([...newArr, newEl])
                      }
                      else {
                        setValuesArray([...newArr])
                      }
                    }}>
                      <Text style={styles.headerText}>{el.name}</Text>
                      <CheckBox
                        value={state[el.varID] || false}
                        onValueChange={(itemValue) => {
                          handleDatesChange(el.varID, itemValue)

                          let newArr = valuesArray.filter(x => x.VarID !== el.varID)
                          var newEl = {
                            "name": el.name,
                            "IndicatorID": el.fieldID,
                            "VarID": el.varID,
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
                    </TouchableOpacity>
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
                            <TouchableOpacity style={[styles.action4, { flexDirection: 'row' }]} key={option.value} onPress={() => { setPickerDate(state[option.value]); showDatePicker(el.fieldID, option.value, option.label) }}>
                              <TextInput style={{ fontSize: 18 }} onFocus={() => { setPickerDate(state[option.value]); showDatePicker(el.fieldID, option.value, option.label) }} onKeyPress={() => { setPickerDate(state[option.value]); showDatePicker(el.fieldID, option.value, option.label) }} label={option.label} placeholder={option.label}
                                value={`${option.label}:`}
                                showSoftInputOnFocus={false} />
                              <TextInput style={{ fontSize: 18 }} onFocus={() => { setPickerDate(state[option.value]); showDatePicker(el.fieldID, option.value, option.label) }} onKeyPress={() => { setPickerDate(state[option.value]); showDatePicker(el.fieldID, option.value, option.label) }} label={option.label} placeholder={option.label}
                                value={formatTheDateLabel(state[option.value]) || formatTheDateLabel(defaultDate)} />
                            </TouchableOpacity>)
                        })}
                      </CollapseBody>
                    </Collapse>
                    :
                    <TouchableOpacity style={[styles.action4, { flexDirection: 'row' }]} key={el.varID} onPress={() => { setPickerDate(state[el.varID]); showDatePicker(el.fieldID, el.varID, el.name) }}>
                      <TextInput style={{ fontSize: 18 }} onFocus={() => { setPickerDate(state[el.varID]); showDatePicker(el.fieldID, el.varID, el.name) }} onKeyPress={() => { setPickerDate(state[el.varID]); showDatePicker(el.fieldID, el.varID, el.name) }} label={el.Name} placeholder={el.Name}
                        value={`${el.name}:`}
                        showSoftInputOnFocus={false} />
                      <TextInput style={{ fontSize: 18 }} onFocus={() => { setPickerDate(state[el.varID]); showDatePicker(el.fieldID, el.varID, el.name) }} onKeyPress={() => { setPickerDate(state[el.varID]); showDatePicker(el.fieldID, el.varID, el.name) }} label={el.Name} placeholder={el.Name}
                        value={formatTheDateLabel(state[el.varID]) || formatTheDateLabel(defaultDate)} />
                    </TouchableOpacity>
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
          isVisible={isDatePickerVisible}
          mode="date"
          date={pickerDate}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
    flexGrow: 1
  },
  pickerWrapper: {
    height: 50, marginBottom: 20, width: '100%', alignSelf: 'center',
  },
  btnWrapper: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 30, marginBottom: 10, marginHorizontal: 25
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