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

const Case = ({ navigation }) => {

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
  const [userToken, setUserToken] = useState(null);
  const [center_no, setCenter_no] = useState('');
  const [patients, setPatients] = useState('');
  const [conditions, setConditions] = useState('');

  //static data
  var thePatients = [
    {
      id: 1,
      nin: '1',
      name: 'Gary Matovu',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 2,
      nin: '2',
      name: 'Yona Babu',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 3,
      nin: '3',
      name: 'Charity Ankunda',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 4,
      nin: '4',
      name: 'React Native',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 5,
      nin: '5',
      name: 'Andera Delphine',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 6,
      nin: '6',
      name: 'Anna Nakayi',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 7,
      nin: '7',
      name: 'Peter Ochaya',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 8,
      nin: '8',
      name: 'Ana kenrik',
      dob: '03/07/2002',
      gender: 'Male'
    },
  ];

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

  const fetchData = () => {
    // loading patients, conditions

    setPatients(thePatients);
    setConditions(theConditions);

    //   axios.get('https://mc2.cryptosavannah.com/auth/get_otp', {
    //     Schoolnumber: center_no,
    //     token: userToken
    //   })
    //     .then(function (response) {
    //       if (response.status == 200) {
    //         setPatients(response.data.patients);
    //         setConditions(response.data.conditions);

    //       } else {
    //         Alert.alert('Error!', 'Failed to load Data \n check your connection.', [
    //           { text: 'Okay' }
    //         ]);
    //       }
    //       // console.log(response.status);

    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });


  }

  const loadPatient = () => {

    let the_name = patients.find(p => p.nin === idNum).name;
    setPName(the_name);
    wizard.current.next();

    // axios.get('https://mc2.cryptosavannah.com/auth/get_otp', {
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
    let report_date = new Date();
    let the_token = userToken;
    // school_id

    console.log("Patient : " + JSON.stringify(the_patient.id));
    console.log("conditions : " + JSON.stringify(the_conditions));
    console.log("report_date : " + report_date.toString());
    console.log("the_token : " + the_token);

    //step 1. check for required fields: idNum
    if (!(removeSpaces(idNum) === "")) {

      //step 2. hash NIN
      JSHash(idNum, CONSTANTS.HashAlgorithms.sha256)
        .then(hash => {

          //step 3. send token, hashNIN, IDs of conditions, report_date
          console.log("hashNIN : " + hash);
          // axios.post('https://mc2.cryptosavannah.com/auth/verify', {
          //   token: the_token,
          //   Patient_id: the_patient,
          //   hashNIN: hash,
          //   condition_ids: the_conditions,
          //   report_date: report_date
          // })
          //   .then(function (response) {
          //     console.log(JSON.stringify(response));
          //     if (response.data.status == 200) {

          //       //step 4. display response, update home screen + back to home screen
          //       alert("Case has been Recorded");

          //       cancel();

          //     } else {
          //       alert('Error! Case Not Recorded. \n Try Again.', [
          //         { text: 'Okay' }
          //       ]);
          //       console.log("Recording Error : " + response.error);
          //     }
          //     // console.log(response.status);

          //   })
          //   .catch(function (error) {
          //     alert('Error! Case Not Recorded. \n Try Again.', [
          //       { text: 'Okay' }
          //     ]);
          //     console.log("Recording Error : " + error);

          //   });

          //step 4. display response, update home screen + back to home screen
          alert("Case has been Recorded");

          cancel();

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
                      const items = selectedPatients.filter((sitem) => sitem.id !== item.id);
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
                  color="#FFB236" title="Next" onPress={() => {
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

            <PatientRecord />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: "center" }}>
              <View style={{ width: 90 }}>
                <ButtonF color="#FFB236"
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
                  color="#FFB236" title="Continue" onPress={() => wizard.current.next()}
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
                <ButtonF color="#FFB236"
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
                    backgroundColor: "#FFB236",
                    borderRadius: 9,
                    height: 22,
                    minWidth: 0,
                    width: 22
                  }}></Badge>
              </View>
            </View>


            {/* conditons */}

            <View style={{ flex: 2 }}>
              <SearchableDropdown
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
                  color="red" title="Cancel" onPress={() => { cancel() }} />

              </View>
              <View style={{ width: 80 }}>
                <Button title="Save"
                  rounded
                  block
                  style={styles.btn}
                  color="#FFB236"
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