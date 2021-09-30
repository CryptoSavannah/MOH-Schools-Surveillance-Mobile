import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_API } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

const AggregateForm = ({ route, navigation }) => {

  const [cookie, setUserCookie] = useState('');
  const [facilityID, setFacilityID] = useState('');

  const { report, begin_date, end_date } = route.params ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const [reportForm, setReportForm] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);

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
          else { setReportForm(res.data.data) }
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
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  }, [])

  const onSubmit = (async () => {
    setIsLoading(true)

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
    console.log("config: ", config)

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

  const renderReportForm = () => {

    if (reportForm.length == 0) { return null }
    else {

      var outterArray = [];
      reportForm.forEach(field => {

        let newfield = {}
        newfield["name"] = field.Name
        newfield["label"] = field.Name
        newfield["varID"] = field.data[0].varID
        if (field.data.length == 1) {
          newfield["type"] = "text"
        }
        else {
          newfield["type"] = "select"
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
      <View>
        {
          fields.map(el => {
            switch (el.type) {
              case "text":
                return (
                  <View style={styles.inputView} key={el.varID}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={el.name}
                      placeholderTextColor="#003f5c"
                      name="password"
                      autoCorrect={false}
                      onChangeText={(text) => {
                        var newEl = {
                          "name": el.name,
                          "VarID": el.varID,
                          "value": text,
                        }

                        setValuesArray([...valuesArray, newEl])

                      }} />
                  </View>)

              case "select":
                return (
                  <View style={[styles.action2, styles.pickerWrapper]} key={el.varID} >
                    <Picker style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        var newEl = {
                          "name": el.name,
                          "VarID": itemValue,
                          "value": itemValue,
                        }
                        setValuesArray([...valuesArray, newEl])
                      }} itemStyle={styles.pickerItem} >
                      <Picker.Item value={null} label={`Select ${el.label}`} />
                      {
                        el.options.map((option) => {
                          return <Picker.item label={option.label} value={option} key={option.value} />
                        })
                      }
                    </Picker>
                  </View>)

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

        {(reportForm.length == 0) ? null :
          renderReportForm()
        }
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
    flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20
  },
  pickerWrapper: {
    height: 50, marginBottom: 20, width: '100%', alignSelf: 'center'
  },
  btnWrapper: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 30, marginBottom: 10
  },
  btn: {
    width: 80, marginBottom: 10
  },
  activityIndicator: {
    alignItems: "center", padding: 10, backgroundColor: "rgba(3, 136, 229, 1)"
  },
});