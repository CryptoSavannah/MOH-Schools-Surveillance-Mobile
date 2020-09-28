import React, { useRef, useState, useCallback, useEffect } from "react";
import Wizard from "react-native-wizard";

import { BackHandler, CheckBox, SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Collapsible from 'react-native-collapsible';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from 'react-native-vector-icons/Ionicons';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

const Case = ({ navigation }) => {

  //fields initial state

  // const initialState = {
  //   fname: "",
  //   lname: "",
  //   gender: "",
  //   dob: "",
  //   idType: "",
  //   idNum: "",
  //   gender: "",
  //   dob: "",
  //   fname: "",
  //   lname: "",
  //   gender: "",
  //   dob: "",
  //   fname: "",
  //   lname: "",
  //   gender: "",
  //   dob: ""
  // };

  const [isNINAvailable, setSelection] = useState(false);
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
          .catch(e => console.log(e));
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
          .catch(e => console.log(e));
      }
      else {
        alert("Fill in all the fields");
      }
    }
  };

  const cancel = () => {
    //clear fields, back to home

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container} >
      <Text style={{ paddingBottom: 10 }}>{'Patient Identification:'.toUpperCase()} </Text>
      {/* ******************** badge showing status of case once retrieved ********************** */}
      <ScrollView>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isNINAvailable} onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>NIN Available?</Text>
        </View>

        {!isNINAvailable ?

          <Animatable.View animation="fadeInLeft" duration={500}>
            <View >
              <View style={styles.action}>
                <TextInput label="First name" placeholder="First name" onChangeText={(val) => { setFName(val) }}
                  value={fname} />
              </View>
              {data.isValidFName ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid First name.</Text>
                </Animatable.View>
              }
              <View style={styles.action}>
                <TextInput label="Surname" placeholder="Surname" onChangeText={(val) => { setLName(val); }}
                  value={lname} />
              </View>
              {/* {data.isValidLName ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Surname.</Text>
            </Animatable.View>
          } */}
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
              {/* <View style={styles.action}> */}
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.action}>
                  <Text styles={{ color: "#dedede" }}>Date of Birth:</Text>
                  <Text style={{ width: 80, paddingLeft: 5 }}>{dob !== ('') ? dob : ""}</Text>
                </View>
                <View>
                  <ButtonF
                    color="#808080"
                    onPress={showDatePicker}
                  >
                    <IconF name="calendar" />
                    <TextF>{'Select Date'}</TextF>
                  </ButtonF>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </Animatable.View>

          :
          <Animatable.View animation="fadeInLeft" duration={500}>
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
              <TextInput label="ID Number" placeholder="ID Number" onChangeText={(val) => setIDNum(val)} value={idNum} />
            </View>
          </Animatable.View>
        }

        <View style={styles.action}>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Describe the patient'\s symptoms"}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onValueChange={(val) => setSymptoms(val)}  // value={symptoms}
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10 }}>
          <View style={{ width: 80 }}>
            <Button rounded
              block
              style={styles.btn}
              color="#bc9151" title="Cancel" onPress={() => cancel()} />
          </View>
          <View style={{ width: 100 }}>
            <Button title="Save Case"
              rounded
              block
              style={styles.btn}
              color="#bc9151"
              onPress={() => { saveCase() }}
            >
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Case;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
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
  btn: {
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDob: {
    alignItems: 'center',
    marginLeft: 0
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    // height: 150

  },
  TextInputStyleClass2: {
    textAlign: 'center',
    height: 30,
    height: 80,
    paddingLeft: 20

  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  },
  qrcode: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

  },
  header: {
    // backgroundColor: '#55A7FF',
    // padding: 10,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,

  },
  headerText: {
    // textAlign: 'center',
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#55A7FF'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  btnDate: {

  },
  errorMsg: {
    color: '#FF0000',
    // fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  }
});