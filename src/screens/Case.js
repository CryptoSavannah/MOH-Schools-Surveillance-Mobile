import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import Wizard from "react-native-wizard";

import { Dimensions, SafeAreaView, Button, View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { Checkbox, Divider } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Badge } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import PatientRecord from "./PatientRecord";
import { PATIENTS_KEY, PATIENT_KEY, CONDITIONS_KEY, CASE_KEY } from '../../env.json';

const Case = ({ navigation }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  //the wizard initial state
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  //fields initial state
  const [isNINAvailable, setIsNINAvailable] = useState(false);
  const [pname, setPName] = useState("Search Student");
  const [pID, setPID] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [idNum, setIDNum] = useState('');

  const [symptoms, setSymptoms] = useState('');
  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');
  const [patients, setPatients] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectedPatient2, setSelectedPatient2] = useState([]);

  const stdRef = useRef(null);

  var servPatients =
  {
    "status": 200,
    "data": [
      { "patient_id": 1, "fname": "Rachael", "lname": "Kembi", "nin": "TH1234", "nin_hash": "375B0072BEFC790CE0A3F6A9C2B27C75020B7A97BCCCBA52D000806E8959882A", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-27T02:16:32.544Z" },
      { "patient_id": 6, "fname": "Brian", "lname": "Aine", "nin": "TH123", "nin_hash": "375B0072BEFC790CE0A3F6A9C2B27C75020B7A97BCCCBA52D000806E895988A", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T13:59:01.826Z" },
      { "patient_id": 8, "fname": "Dee", "lname": "Obura", "nin": "TH12", "nin_hash": "375B0072BEFC790CE0A3F6A9C2B27C75020B7A97BCCCBA52D000806E895988", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T14:04:11.415Z" },
      // { "patient_id": 15, "fname": "Jane", "lname": "Doe", "nin": "${idNum}", "nin_hash": "${hash}", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T14:16:21.334Z" },
      { "patient_id": 16, "fname": "Jane", "lname": "Doe", "nin": "Mndtgff", "nin_hash": "a018e0133c9536a8233bc0cc083b24c0af8ef79615bb7ec7bbad8398506f3064", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T14:18:15.504Z" }
    ]
  };

  var servConditions = {
    "status": 200, "data": [
      { "condition_id": 2, "condition": "headache", "date_added": "2020-10-27T00:55:53.746Z" },
      { "condition_id": 3, "condition": "fever", "date_added": "2020-10-27T00:56:05.479Z" },
      { "condition_id": 4, "condition": "dysentry", "date_added": "2020-10-27T01:48:22.268Z" }
    ]
  }

  const [selectedConditions, setSelectedConditions] = useState([]);

  const fetchPatients = async () => {

    let pats = [];

    servPatients.data.map(x => {
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

    var config = {
      method: 'get',
      url: PATIENTS_KEY,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    };

    // console.log(JSON.stringify(config));

    // await axios(config)
    //   .then(res => {
    //     let ps = [];
    //     ps = res.data;

    //     let pats = [];

    //     console.log("Patients: " + JSON.stringify(ps));

    //     ps.map(x => {
    //       let date = new Date(x.dob);
    //       pats.push({
    //         id: x.patient_id,
    //         nin: x.nin,
    //         nin_hash: x.nin_hash,
    //         name: x.fname + ' ' + x.lname,
    //         dob: date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1),
    //         gender: x.gender
    //       });
    //     });
    //     setPatients(pats);
    //   })
    //   .catch((error) => {
    //     console.error("Fetching Patients: " + error);
    //   });
  };

  const fetchConditions = async () => {
    let conds = [];

    servConditions.data.map(x => {
      conds.push({
        id: x.condition_id,
        name: x.condition,
      });
    });
    setConditions(conds);


    var config = {
      method: 'get',
      url: CONDITIONS_KEY,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    };

    // console.log(JSON.stringify(config));

    // await axios(config)
    //   .then(res => {
    //     let ps = [];
    //     ps = res.data;
    //     let conds = [];
    //     console.log("Conditions: " + JSON.stringify(ps));
    //     ps.data.map(x => {
    //       conds.push({
    //         id: x.condition_id,
    //         name: x.condition,
    //       });
    //     });
    //     setConditions(conds);
    //   })
    //   .catch((error) => {
    //     console.error("Fetching Conditions: " + error);
    //   });
  };

  const loadPatient = () => {

    let the_name = patients.find(p => p.nin === idNum).name;
    setPName(the_name);
    wizard.current.next();

    // axios.get('', {
    //   patient_id: idNum,
    //   token: userToken
    // })
    //   .then(function (response) {
    //     if (response.status == 200) {
    //       // fill list of history for patient

    //     } else {
    //       Alert.alert('Error!', 'Failed to load Patient Details \n check your connection.', [
    //         { text: 'Okay' }
    //       ]);
    //     }
    //     // console.log(response.status);

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  //helper method
  const removeSpaces = (string) => {
    return string.split(' ').join('');
  };

  const saveCase = () => {
    console.log("id.." + selectedPatients.length)
    if (selectedPatients.length === 0) {
      Alert.alert("Missing Patient Id", "Please try again", [
        {
          text: "Cancel",
          onPress: () => {
            clearState();
            navigation.navigate("Home");
          },
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            clearState();
            setCurrentStep(0);
            wizard.current.currentStep = 0;
          }
        }
      ])
      return
    }

    let the_patient = selectedConditions.length > 0 ? selectedPatients[0].id : '';
    let the_conditions = selectedConditions;
    the_conditions = (the_conditions.map(x => x["id"]));
    let report_date = new Date();
    report_date = report_date.getFullYear() + "-" + report_date.getMonth() + "-" + report_date.getDate();
    let the_token = userToken;
    let the_school_id = school_id;

    //step 1. check for required fields: idNum
    if (!(removeSpaces(idNum) === "")) {

      //step 2. hash NIN
      JSHash(idNum, CONSTANTS.HashAlgorithms.sha256)
        .then(hash => {

          //step 3. send token, hashNIN, IDs of conditions, report_date
          console.log("hashNIN : " + hash);

          var data = {
            "Patient_id": `${the_patient}`,
            "conditions": `${the_conditions}`,
            "report_date": `${report_date}`,
            "school_id": `${the_school_id}`
          };

          var config = {
            method: 'post',
            url: CASE_KEY,
            headers: {
              'Authorization': `Bearer ${userToken}`
            },
            data: data
          };

          console.log("axios call config : " + JSON.stringify(config));

          if (userToken === null) {
            alert("Login to continue");
          } else {
            // axios(config)
            //   .then(function (response) {

            //     if (response.status === 201) {
            alert("Case has been Recorded");

            clearState();
            setCurrentStep(0);
            navigation.navigate("Home");
            //     } else {
            //       alert("Error failed to record Case\n Try again.")
            //       console.log(JSON.stringify(response.data));
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
          }

        })
        .catch(
          e => console.log(e)
        );


    } else {
      alert("NIN or student Name is required!");
    }
  };

  const cancel = () => {
    //clear fields, back to home
    clearState();
    setCurrentStep(0);
    navigation.navigate("Home");
  };

  const clearState = () => {

    setIsNINAvailable(false); setPName(''); setDob(''); setIDNum(''); setSymptoms('');
    setGender(''); setPID(''); setSelectedConditions([]); setSelectedPatients([]);

  };

  useEffect(() => {
    clearState()
    setCurrentStep(0);

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
      .catch(err => console.log('fetching local... ' + err));


    // if (userToken === '') {
    //   console.log("Fetching data error: token is empty"); 
    // } else {
    fetchPatients();
    fetchConditions();
    // }
  }, [userToken]);

  const searchableDrpDwn = useRef();

  function Item({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          // setSelectedConditions( selectedConditions.filter(x => x!== item));
        }}
        style={[styles.item, { alignItems: 'center', justifyContent: 'center' }]}
      >
        <Text paragraph style={{
          marginHorizontal: 1,
          alignSelf: 'center', borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#f5f5f5',
        }}>
          {item.name}</Text>
      </TouchableOpacity>
    );
  }

  //list of all views in steps
  const stepList = [
    {
      content:
        <View style={styles.container} >
          <View style={[styles.content, { paddingTop: 0 }]}>
            <View style={{ alignSelf: "center", paddingVertical: 20 }}>
              <Text style={{ fontWeight: "bold" }}>
                {"Patient Indentification".toUpperCase()}
              </Text>
            </View>
            <Divider style={{ marginBottom: 20 }} />

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Checkbox
                status={isNINAvailable ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsNINAvailable(!isNINAvailable);
                  setSelectedPatients([]);
                }}
              />
              <Text style={{ paddingTop: 10 }}>NIN Available?</Text>
            </View>

            <View style={{ flex: 1 }}>
              {!isNINAvailable ?
                <Fragment >
                  <SearchableDropdown
                    ref={stdRef}
                    onItemSelect={(item) => {
                      var items = [];
                      items.push(item);
                      // console.log(item.id)
                      setSelectedPatients(selectedPatients => items);
                      setIDNum(item.nin);
                      setPName(item.name);
                    }}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                      const items = selectedPatients.filter((sitem) => sitem.patient_id !== item.patient_id);
                      setSelectedPatients(selectedPatients => items);
                    }}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={patients}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                      {
                        placeholder: pname,
                        underlineColorAndroid: "transparent",
                        style: {
                          padding: 12,
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 5,
                        },
                        // onTextChange: text => alert(text)
                      }
                    }
                    listProps={
                      {
                        nestedScrollEnabled: true,
                      }
                    }
                  />
                </Fragment>

                :

                <View style={styles.action}>
                  <TextInput style={{ width: '100%' }} label="NIN" placeholder="Enter NIN" onChangeText={(val) => {
                    setIDNum(val);
                  }}
                    value={idNum} />
                </View>

              }
            </View>

            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={{ width: 80, marginTop: 30 }}>
                <Button rounded
                  block
                  style={styles.btn}
                  color="rgba(3, 136, 229, 1)" title="Next" onPress={() => {
                    if (pname === '' || idNum === '') {
                      alert('Enter paient Name or NIN');
                    }
                    else {
                      //check if nin exists
                      if (patients.some(patient => patient.nin === idNum)) {
                        loadPatient();
                      } else {
                        alert('Patient NIN not found. /n Try to search by name');
                      }
                    }
                  }} />
              </View>
            </View>
          </View>
          {/* <View style={{flex: 2}}></View> */}
        </View>,
    },
    {
      content:
        <View style={styles.container} >
          <View style={[styles.content, {}]}>

            <Text style={styles.headerText}>{pname !== "" ? pname : "Press Back to Select Student"}</Text>
            <Divider style={{ marginTop: 15 }} />

            {idNum !== "" ? <PatientRecord /> : null}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: "center" }}>
              <View style={{ width: 90 }}>
                <ButtonF color="rgba(3, 136, 229, 1)"
                  outline transparent onPress={() => wizard.current.prev()} >
                  <IconF name="arrow-back"></IconF>
                  <TextF >{'BACK'}</TextF>
                </ButtonF>
              </View>
              <View style={{ width: 90, justifyContent: "center" }}>
                <Button
                  rounded
                  block
                  style={styles.btn}
                  color="rgba(3, 136, 229, 1)" title="Continue" onPress={() => wizard.current.next()}
                >
                </Button>
              </View>
            </View>
          </View>
        </View>,
    },
    {
      content:
        <View style={styles.container} >
          <View style={[styles.content, { paddingTop: 0 }]}>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "30%" }}>
                <ButtonF color="rgba(3, 136, 229, 1)"
                  outline transparent onPress={() => wizard.current.prev()} >
                  <IconF name="arrow-back"></IconF>
                  {/* <TextF >{'BACK'}</TextF> */}
                </ButtonF>
              </View>

              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                  {"Patient's Conditions".toUpperCase()}
                </Text>
                <Badge value={selectedConditions.length}
                  badgeStyle={{
                    backgroundColor: "rgba(3, 136, 229, 1)",
                    borderRadius: 9,
                    height: 22,
                    minWidth: 0,
                    width: 22
                  }}></Badge>
              </View>
            </View>


            {/* conditons */}

            <FlatList
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              data={selectedConditions.length < 5 ? selectedConditions
                : [...selectedConditions, { id: "none", name: " ..." }]}
              renderItem={({ item }) =>
                <Item item={item} />}
              keyExtractor={item => (item.id.toString())}
              style={{ width: SCREEN_WIDTH + 5, flex: 1, height: '0.5%', backgroundColor: '#fff' }}
            />

            <View style={{ flex: 5 }}>
              <SearchableDropdown
                ref={searchableDrpDwn}
                multi={true}
                selectedItems={selectedConditions}
                onItemSelect={(item) => {
                  setSelectedConditions(selectedConditions => [...selectedConditions, item]);
                }}
                containerStyle={{ padding: 5 }}
                onRemoveItem={(item, index) => {
                  const items = selectedConditions.filter((sitem) => sitem.id !== item.id);
                  setSelectedConditions(selectedConditions => items);
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: "85%" }}
                items={conditions}
                // chip={true}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "Select Current Conditions",
                    underlineColorAndroid: "transparent",
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    onTextChange: text => { }
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
              />
            </View>

            {/* diagnosis */}



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
              <View style={{ width: 80 }}>
                <Button rounded
                  block
                  style={styles.btn}
                  color="grey" title="Cancel" onPress={() => { cancel() }} />

              </View>
              <View style={{ width: 80 }}>
                <Button title="Record"
                  rounded
                  block
                  style={styles.btn}
                  color="rgba(3, 136, 229, 1)"
                  onPress={() => { saveCase() }}
                >
                </Button>
              </View>
            </View>
          </View>
        </View>,
    },
  ];


  return (
    // wizard setup 
    <View style={{ justifyContent: "space-around", paddingTop: 10, backgroundColor: "#F3F6F9" }}>
      <SafeAreaView style={{}}>

        <View style={{ flexDirection: "row", margin: 18, alignSelf: "center" }}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 2,
                backgroundColor: index === currentStep ? "#fc0" : "#000",
              }}
            />
          ))}
        </View>

      </SafeAreaView>
      <View style={{}}>
        <Wizard
          ref={wizard}
          steps={stepList}
          // activeStep={0}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            // console.log("Next Step Called")

          }}
          onPrev={() => {
            // console.log("Previous Step Called")
          }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep)
          }}
        />
      </View>
    </View>
  );
};

export default Case;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    width: "100%", height: "100%",
    // marginTop: 10,
    // padding: 5,
    backgroundColor: "#F3F6F9"
  },
  action: {
    flexDirection: 'row',
    paddingTop: 15,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  action3: {
    paddingTop: 5,
  },
  btn: {
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    alignItems: 'center',
    marginTop: 15,
  },
  header: {
    // backgroundColor: '#55A7FF',
    // padding: 10,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,

  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    margin: 10,
    height: "95%",
    justifyContent: "space-around",

  },
  btnDate: {

  },
  errorMsg: {
    color: '#FF0000',
    // fontSize: 14,
  },
  headerText: {
    textAlign: 'center',
    color: "#131313",
    // textDecorationLine: 'underline',
    paddingTop: 5,
    // top: "5%",
    lineHeight: 25,
    fontSize: 18,
    fontWeight: '200',
  },
});