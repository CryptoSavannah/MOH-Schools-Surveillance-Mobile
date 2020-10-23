import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import Wizard from "react-native-wizard";

import { Switch, SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { Checkbox, Divider } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Badge } from "react-native-elements";

const Case = ({ navigation }) => {

  //the wizard initial state
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  //fields initial state
  const [isNINAvailable, setIsNINAvailable] = useState(false);
  const [pname, setPName] = useState('');
  const [pID, setPID] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [idNum, setIDNum] = useState('');

  const [symptoms, setSymptoms] = useState('');

  //static data
  var patients = [
    {
      id: 1,
      nin: 'MF262002HYHSHJ5',
      name: 'Gary Matovu',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 2,
      nin: 'MF262002HYHSHJ5',
      name: 'Yona Babu',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 3,
      nin: 'MF262002HYHSHJ5',
      name: 'Charity Ankunda',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 4,
      nin: 'MF262002HYHSHJ5',
      name: 'React Native',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 5,
      nin: 'MF262002HYHSHJ5',
      name: 'Andera Delphine',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 6,
      nin: 'MF262002HYHSHJ5',
      name: 'Anna Nakayi',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 7,
      nin: 'MF262002HYHSHJ5',
      name: 'Peter Ochaya',
      dob: '03/07/2002',
      gender: 'Male'
    },
    {
      id: 8,
      nin: 'MF262002HYHSHJ5',
      name: 'Ana kenrik',
      dob: '03/07/2002',
      gender: 'Male'
    },
  ];

  const [selectedPatients, setSelectedPatients] = useState([]);
  const stdRef = useRef(null);

  var conditions = [
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

  //helper method
  const removeSpaces = (string) => {
    return string.split(' ').join('');
  };

  const saveCase = () => {

    //step 1. check for required fields: idNum
    if (!(removeSpaces(idNum) === "")) {

      //step 2. hash NIN
      JSHash(idNum, CONSTANTS.HashAlgorithms.sha256)
        .then(hash => {

          //step 3. send token, hashNIN, IDs of conditions, report_date
          console.log(hash)

          //step 4. display response, update home screen + back to home screen
          alert("Case has been Recorded");

          cancel();

        })
        .catch(
          // e => console.log(e)
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

  const showStdDetails = () => {
    // filter list of students and fill patient details & history
  }

  useEffect(() => {
    setCurrentStep(0);
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
                        placeholder: "Search Student",
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
                  <TextInput style={{}} label="NIN" placeholder="Enter NIN" onChangeText={(val) => { setIDNum(val); }}
                    value={idNum} />
                </View>

              }
            </View>

            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={{ width: 80, marginTop: 30 }}>
                <Button rounded
                  block
                  style={styles.btn}
                  color="#FFB236" title="Next" onPress={() => wizard.current.next()} />
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


            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10, alignContent: "center" }}>
              <View style={{ width: "30%", height: "30%" }}>
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
  }
});