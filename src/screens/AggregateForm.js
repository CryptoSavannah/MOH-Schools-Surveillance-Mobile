import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { REPORT_LIST_KEY, REPORT_FIELDS_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { Checkbox as CheckboxP, List as ListP, TextInput } from 'react-native-paper';

const AggregateForm = ({ route, navigation }) => {

  const [cookie, setUserCookie] = useState('');
  const [facilityID, setFacilityID] = useState('');

  const { report, begin_date, end_date } = route.params ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const [reportFieldNames, setReportFieldNames] = useState({});
  const [reportForm, setReportForm] = useState([]);
  const [fieldArray, setFieldArray] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);

  const getReportFields = async () => {

    let config = {
      url: REPORT_FIELDS_KEY,
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
          if (res.data.status == "500") {
            signOut()
          } else {
            setReportForm(res.data.data)
            var df = {}
            let rf = (res.data.data)
            rf.forEach(x => {
              let field = x.Name
              df[field] = ''
            })

            setReportFieldNames(df)

          }
        })
        .catch(function (error) {
          console.log("Report fields Error caught: " + error);

        });
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
        if (user === null) {

        } else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);
          setFacilityID(usr.userid)
          getReportFields()
          console.log('fetching... ' + usr.cookie);
        }
      })
      .catch(err => console.log(err));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  }, [])

  const onSubmit = (async () => {
    setIsLoading(true)
    // console.log(valuesArray);

    // setTimeout(() => {
    //   setIsLoading(false)
    //   alert(`${report.report_name}Saved!`);
    //   cancel()
    // }, 1000);

    let config = {
      url: REPORT_FIELDS_KEY,
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

    await axios.post(REPORT_FIELDS_KEY, {
      config,
    })
      .then(function (response) {
        console.log("response: ", response)
        if (response.status === 200) {

          alert('Success!', `${report.report_name} Saved!`, [{
            text: 'Okay', onPress: () => {
              cancel()
            },
          }]);

        } else {

          console.log(response.status);
          alert(`Failed to save ${report.report_name}.\nPlease try again.`, [{
            text: 'Okay', onPress: () => {
              return
            },
          }]);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert(`Failed to save ${report.report_name}.`, error + '\nPlease try again.', [{
          text: 'Okay', onPress: () => {
            return
          },
        }]);
        // cancel()
      }).finally(() => { setIsLoading(false) })
  })

  const cancel = () => {
    //clear fields, back to home
    // clearState();
    // navigation.navigate('Home');
    navigation.goBack();
  };

  const renderReportForm = () => {

    if (reportForm.length == 0) {

      return null
    } else {

      // console.log(" .....jjdjd...")
      // console.log(reportForm)

      // let newForm = {}
      var outterArray = [];
      reportForm.forEach(field => {
        let newfield = {}
        newfield["name"] = field.Name
        newfield["label"] = field.Name
        newfield["varID"] = field.data[0].varID

        // console.log("the varID is: ", field.data[0].varID)
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
          // console.log("the options are: ", options)
          newfield["options"] = options
        }

        outterArray.push(newfield)

        // console.log(outterArray)

      })
      // console.log("final form: ")
      // console.log(outterArray)

      return renderAField(outterArray)
      // return reports.map((report) => {
      //   return <Picker.item label={report.report_name} value={report} key={report.report_id} />
      // })
    }
  }

  const renderAField = (fields) => {

    return (
      <View>
        {
          fields.map(el => {
            // console.log("el options ", el.options)
            switch (el.type) {
              case "text":
                return <View style={styles.inputView} key={el.varID}>
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
                      // console.log("the varID is: ", el.varID)

                      setValuesArray([...valuesArray, newEl])

                    }} />
                </View>
              case "select":
                return (
                  <View style={[styles.action2, { height: 50, marginBottom: 20, width: '100%', alignSelf: 'center' }]} key={el.varID} >
                    <Picker style={{
                      color: el.value === null ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
                      transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
                    }}
                      onValueChange={(itemValue, itemIndex) => {
                        var newEl = {
                          "name": el.name,
                          "VarID": itemValue,
                          "value": itemValue,
                        }
                        setValuesArray([...valuesArray, newEl])
                      }} itemStyle={{ fontSize: 18 }} >
                      <Picker.Item value={null} label={`Select ${el.label}`} />
                      {
                        // console.log("el.options: ..", el.options);
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}>

        {(reportForm.length == 0) ? null :
          renderReportForm()
        }
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          paddingTop: 30, marginBottom: 10
        }}>
          <View style={{ width: 80, marginBottom: 10 }}>
            <Button rounded
              block
              style={styles.btn}
              color="grey" title="Cancel" onPress={() => { cancel() }} />

          </View>
          <View style={{ width: 80, marginBottom: 10 }}>
            {!isLoading ? <Button title="Save"
              rounded
              block
              style={styles.btn}
              color="rgba(3, 136, 229, 1)"
              onPress={() => { onSubmit() }}
            >
            </Button>
              :
              <TouchableOpacity
                style={[, styles.btn, { alignItems: "center", padding: 10, backgroundColor: "rgba(3, 136, 229, 1)" }]}
                underlayColor='rgba(3, 136, 229, 1)'
              >
                <ActivityIndicator animating={isLoading} color="#fff" />
              </TouchableOpacity>}
          </View>
        </View>
      </ScrollView>
    </>
  );

};

export default AggregateForm;

const styles = StyleSheet.create({
  textSize: {
    fontSize: 20
  },
  action: {
    // flexDirection: 'row',
    // width: '50%',
    // paddingTop: 15,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    // paddingBottom: 10,
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  action3: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginBottom: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    flexDirection: 'row'
  },
  inputView: {
    // width: '80%',
    backgroundColor: '#fff',
    borderRadius: 2,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    // padding: 20,
  },
  inputText: {
    height: 50,
  },
  headerText: {
    // textAlign: 'center',
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: '500',
    // borderColor: 'grey',
    // borderBottomWidth: 1,
    paddingBottom: 5
  },
  content2: {
    marginBottom: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 18,
    marginRight: 8,
  },
});