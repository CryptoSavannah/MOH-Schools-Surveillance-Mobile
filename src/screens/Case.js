import React, { useRef, useState, useCallback, useEffect } from "react";
import Wizard from "react-native-wizard";

import { BackHandler, Switch, SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Collapsible from 'react-native-collapsible';
import CustomMultiPicker from "react-native-multiple-select-list";
// import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from 'react-native-vector-icons/Ionicons';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { Checkbox, Divider } from 'react-native-paper';


const Case = ({ navigation }) => {

  //the wizard initial state
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  //fields initial state
  const [isNINAvailable, setIsNINAvailable] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [idType, setIDType] = useState('');
  const [idNum, setIDNum] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setDob('');
  };

  const handleConfirm = (e) => {
    hideDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDob('')
    }
    else {
      //format date
      setDob((date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear())

    }

  };

  // some validation variables
  const [data, setData] = React.useState({
    isValidNIN: true,

    isValidFName: true,
    isValidLName: true,
    isValidGender: true,
    isValidDob: true,
    isValidSymptoms: true,
  });

  //helper method
  const removeSpaces = (string) => {
    return string.split(' ').join('');
  };

  const saveCase = () => {

    if (isNINAvailable) {
      data.isValidNIN = !(removeSpaces(idNum) === "");

      //step 1. check for required fields: idNum
      if (!(removeSpaces(idType) === "") && data.isValidNIN) {

        JSHash(idNum, CONSTANTS.HashAlgorithms.sha256)
          .then(hash => console.log(hash))
          .catch(
            // e => console.log(e)
            );

        alert("Case has been Recorded");

        clearState();
      } else {
        alert("Fill in all the fields");
      }

    } else {

      //step 1. check for required fields: fname, lname, gender, dob
      data.isValidFName = !(removeSpaces(fname) === "");
      data.isValidLName = !(removeSpaces(lname) === "");
      data.isValidGender = !(removeSpaces(gender) === "");
      data.isValidDob = !(removeSpaces(dob) === "");

      if (data.isValidFName && data.isValidLName && data.isValidGender && data.isValidDob) {
        var stdID = fname + lname + dob + gender;
        JSHash(stdID, CONSTANTS.HashAlgorithms.sha256)
          .then(hash => console.log(hash))
          .catch(
            // e => console.log(e)
            );

        alert("Case has been Recorded");

        clearState();
      }
      else {
        alert("Fill in all the fields");
      }
    }
  };

  const cancel = () => {
    //clear fields, back to home
    clearState();
    navigation.navigate("Home");
  };

  const clearState = () => {
    setIsNINAvailable(false); setFName(''); setLName(''); setDob(''); setIDNum(''); setSymptoms('');
    setIDType(''); setGender('');
    data.isValidNIN = data.isValidSymptoms = data.isValidLName = data.isValidFName = data.isValidGender = data.isValidDob = true;
  };

  //list of all views in steps
  const stepList = [
    {
      content:
        <View style={styles.container} >
          <View style={[styles.content, {}]}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ padding: 20, fontWeight: "bold" }}>
                {"Enter Patient'\s Details".toUpperCase()}
              </Text></View>

            <Divider />

            <View style={styles.action}>
              <TextInput style={{fontSize: 16}} label="First name" placeholder="First name" onChangeText={(val) => { setFName(val) }}
                value={fname} />
            </View>
            {/* {data.isValidFName ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid First name.</Text>
          </Animatable.View>
        } */}
            <View style={styles.action}>
              <TextInput style={{fontSize: 16}} label="Last name" placeholder="Last name" onChangeText={(val) => { setLName(val); }}
                value={lname} />
            </View>
            {/* {data.isValidLName ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Last name.</Text>
          </Animatable.View>
        } */}
            <View style={{ alignItems: 'flex-end' }}>
              <View style={{ width: 80, marginTop: 20 }}>
                <Button rounded
                  block
                  style={styles.btn}
                  color="#FFB236" title="Next" onPress={() => wizard.current.next()} /></View>
            </View>
          </View>

        </View>,
    },
    {
      content:
        <View style={styles.container} >
          <View style={[styles.content, {}]}>

            <View style={styles.action2} >
              <Picker label="Gender" style={{ color: "#808080", padding: 0 }} placeholder="Gender" onValueChange={(val) => { setGender(val) }}
                selectedValue={gender}>
                <Picker.Item value="" label="Select Gender" />
                <Picker.Item value="Male" label="Male" />
                <Picker.Item value="Female" label="Female" />
              </Picker>
            </View>
            {/* {data.isValidGender ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>This field is required.</Text>
          </Animatable.View>
        } */}
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10, alignContent: "center" }}>
              <View style={{ width: "30%", height: "30%"}}>
              <ButtonF color="#FFB236"
                outline transparent onPress={() => wizard.current.prev()} >
                <IconF name="arrow-back"></IconF>
                <TextF >{'BACK'}</TextF>
              </ButtonF>
              </View>
              <View style={{ width: 80, justifyContent: "center" }}>
                <Button
                  rounded
                  block
                  style={styles.btn}
                  color="#FFB236" title="Next" onPress={() => wizard.current.next()}
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
          <View style={[styles.content, {}]}>
            {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}> */}
            <View style={styles.action}>
              {/* <Text styles={{ color: "#dedede" }}>Date of Birth:</Text> */}
              <TextInput style={{fontSize: 16}} onFocus={showDatePicker} onKeyPress={showDatePicker} label="Date of Birth" placeholder="Enter Date of Birth"
                value={dob == ''? '' : `Date of Birth:  ${dob}`} />
              {/* <Text  style={{ width: "80%", paddingLeft: 5 }}>{dob !== ('') ?  : ""}</Text> */}
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {/* </View> */}
            {/* {data.isValidDob ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Date.</Text>
          </Animatable.View>
        } */}
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10, alignContent: "center" }}>
              <View style={{ width: "30%", height: "30%"}}>
              <ButtonF color="#FFB236"
                outline transparent onPress={() => wizard.current.prev()} >
                <IconF name="arrow-back"></IconF>
                <TextF >{'BACK'}</TextF>
              </ButtonF>
              </View>
              <View style={{ width: 80, justifyContent: "center" }}>
                <Button
                  rounded
                  block
                  style={styles.btn}
                  color="#FFB236" title="Next" onPress={() => wizard.current.next()}
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
          <View style={[styles.content, {}]}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ padding: 20, fontWeight: "bold" }}>
                {"Identification:".toUpperCase()}
              </Text></View>

            <Divider />

            <View style={styles.action2}>
              <Picker label="ID Type" style={{ color: "#808080", padding: 0 }} placeholder="ID Type" onValueChange={(val) => setIDType(val)}
                selectedValue={idType}>
                <Picker.Item value="" label="ID Type" />
                <Picker.Item value="NIN" label="NIN" />
                <Picker.Item value="Birth Certificate" label="Birth Certificate" />
                <Picker.Item value="Passport" label="Passport" />
              </Picker>
            </View>
            <View style={styles.action}>
              <TextInput style={{fontSize: 16}} label="ID Number" placeholder="ID Number" onChangeText={(val) => setIDNum(val)} value={idNum} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10, alignContent: "center" }}>
              <View style={{ width: "30%", height: "30%"}}>
              <ButtonF color="#FFB236"
                outline transparent onPress={() => wizard.current.prev()} >
                <IconF name="arrow-back"></IconF>
                <TextF >{'BACK'}</TextF>
              </ButtonF>
              </View>
              <View style={{ width: 80, justifyContent: "center" }}>
                <Button
                  rounded
                  block
                  style={styles.btn}
                  color="#FFB236" title="Next" onPress={() => wizard.current.next()}
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
          <View style={[styles.content, {}]}>
          <View style={{ width: "30%", height: "30%"}}>
              <ButtonF color="#FFB236"
                outline transparent onPress={() => wizard.current.prev()} >
                <IconF name="arrow-back"></IconF>
                <TextF >{'BACK'}</TextF>
              </ButtonF>
              </View>
            <View style={styles.action}>
              <TextInput style={{fontSize: 16}}
                underlineColorAndroid="transparent"
                placeholder={"Describe the patient'\s symptoms"}
                placeholderTextColor={"#9E9E9E"}
                numberOfLines={3}
                multiline={true}
                onValueChange={(val) => setSymptoms(val)}
              // value={symptoms}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10 }}>
              <View style={{ width: 80 }}>
                <Button rounded
                  block
                  style={styles.btn}
                  color="red" title="Clear" onPress={() => {clearState(); alert("Cleared!")}} />

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
    }
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
    height: "80%",
    justifyContent: "space-around",
    
  },
  btnDate: {

  },
  errorMsg: {
    color: '#FF0000',
    // fontSize: 14,
  }
});