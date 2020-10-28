import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import Wizard from "react-native-wizard";

import { Switch, SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { Checkbox, Divider } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Badge } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import PatientRecord from "./PatientRecord";
import { PATIENTS_KEY, PATIENT_KEY, CONDITIONS_KEY } from '../../env.json';

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
  const stdRef = useRef(null);

  var theConditions = [
    {
      id: 1,
      name: 'Fever',
    },
    {
      id: 2,
      name: 'Headache',
    },
    {
      id: 3,
      name: 'Abdominal Pain',
    },
    {
      id: 4,
      name: 'Weakness',
    },
    {
      id: 5,
      name: 'Diarrhoea',
    },
    {
      id: 6,
      name: 'Vomiting',
    },
    {
      id: 7,
      name: 'Jaundice',
    },
    {
      id: 8,
      name: 'Cough',
    },
  ];

  const [selectedConditions, setSelectedConditions] = useState([]);

  const fetchPatients = async () => {
    try {
      const resp = await axios.get(PATIENTS_KEY, {
        headers: {
          'Authorization': `Bearer Token`
        }
      });
      console.log("Patients: " + resp.data);
    } catch (err) {
      // Handle Error Here
      console.error("Fetch Patients: " + err);
    }
  };

  const fetchConditions = async () => {
    try {
      const resp = await axios.get(CONDITIONS_KEY, {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      });
      console.log("Conditions: " + resp.data);
    } catch (err) {
      // Handle Error Here
      console.error("Fetch Conditions: " + err);
    }
  };


  const fetchData = () => {
    // loading patients, conditions

    setPatients(thePatients);
    setConditions(theConditions);
    fetchPatients();

    //   axios.get('', {
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
    let the_patient = selectedPatients[0];
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
          // axios.post('', {
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
    setCurrentStep(0);
    setPatients(thePatients);
    setConditions(theConditions);

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);
          setUserToken(usr.token);
          setCenter_no(usr.center_no);
          // fetchData();
          console.log('fetching... ' + usr.token)
          fetchPatients();
          fetchConditions();
        }
      })
      .catch(err => console.log(err));
  }, []);

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

            <Text style={styles.headerText}>{pname}</Text>
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