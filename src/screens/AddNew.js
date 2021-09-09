import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, SafeAreaView, Button, Dimensions } from 'react-native';
import {
  FormInput,
} from "@99xt/first-born";
// import { Picker } from 'native-base';
// import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { Checkbox, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { CREATE_PATIENT_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import realm, {
  addPatient
} from "../database/database";

const AddNew = ({ route, navigation }) => {

  const [userToken, setUserToken] = useState(null);
  const [center_no, setCenter_no] = useState('');
  const [patient_id, setPatientID] = useState(null);

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [idNum, setIDNum] = useState('');
  const [selectedImmunizationStatus, setSelectedImmunizationStatus] = useState('');
  const [selectedDisability, setSelectedDisability] = useState('');
  const [selectedIllness, setSelectedIllness] = useState('');
  const [otherMedicalCondition, setOtherMedicalCondition] = useState('');

  const { nin } = route.params ?? {};
  const { fnameR } = route.params ?? {};
  const { lnameR } = route.params ?? {};
  const { genderR } = route.params ?? {};
  const { dobR } = route.params ?? {};
  const { immunizationStatusR } = route.params ?? {};
  const { disabilityR } = route.params ?? {};

  useEffect(() => {
    if (typeof fnameR !== 'undefined') {
      setFName(fnameR)
    }
    if (typeof lnameR !== 'undefined') {
      setLName(lnameR)
    }
    if (typeof dobR !== 'undefined') {
      setDob(dobR)
    }
    if (typeof genderR !== 'undefined') {
      setGender(genderR)
    }
    if (typeof immunizationStatusR !== 'undefined') {
      setImmunizationStatus(immunizationStatusR)
    } if (typeof disabilityR !== 'undefined') {
      setDisability(disabilityR)
    }
    if (typeof nin !== 'undefined') {
      setIDNum(nin)
      //get server patient_id
      // fetchPatient(nin).then(res =>{
      //fetch patient from server or realm or async
      // setPatientID(res.data.patient_id)
      // })

    }

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);
          setUserToken(usr.token);
          setCenter_no(usr.center_no);
        }
      })
      .catch(err => console.log(err));

  });

  // useFocusEffect(
  //     React.useCallback(() => {
  //         return () => {
  //             const popAction = StackActions.pop(1);
  //             navigation.dispatch(popAction);
  //             console.log("cleaned up");
  //         };
  //     }, [])
  // );



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
      // setDob((date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear())
      setDob(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1))

    }

  };

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  // some validation variables
  const [data, setData] = React.useState({
    isValidNIN: true,

    isValidFName: true,
    isValidLName: true,
    isValidGender: true,
    isValidDob: true,
  });

  //helper method
  const removeSpaces = (string) => {
    return string.split(' ').join('');
  };

  const savePatient = async() => {

    // if (isNINAvailable) {
    //   data.isValidNIN = !(removeSpaces(idNum) === "");

    //   //step 1. check for required fields: idNum
    //   if (!(removeSpaces(idType) === "") && data.isValidNIN) {

    //     JSHash(idNum, CONSTANTS.HashAlgorithms.sha256)
    //       .then(hash => console.log(hash))
    //       .catch(
    //         // e => console.log(e)
    //         );

    //     alert("Case has been Recorded");

    //     clearState();
    //   } else {
    //     alert("Fill in all the fields");
    //   }

    // } else {

    //step 1. check for required fields: fname, lname, gender, dob
    data.isValidFName = !(removeSpaces(fname) === "");
    data.isValidLName = !(removeSpaces(lname) === "");
    data.isValidGender = !(removeSpaces(gender) === "");
    data.isValidDob = !(removeSpaces(dob) === "");
    data.isValidNIN = !(removeSpaces(idNum) === "");

    if (data.isValidFName && data.isValidLName && data.isValidGender && data.isValidDob && data.isValidNIN) {
      var stdID = idNum;
      JSHash(stdID, CONSTANTS.HashAlgorithms.sha256)
        .then(hash => {
          console.log("sending.." + userToken);
          //save patient
          // console.log('check.. '+ idNum + "...\n"+ hash)
          var data = {
            "fname": `${fname}`,
            "lname": `${lname}`,
            "nin": `${idNum}`,
            "nin_hash": `${hash}`,
            "gender": `${gender}`,
            "dob": `${dob}`
          };

          var config = {
            method: 'post',
            url: CREATE_PATIENT_KEY,
            headers: {
              'Authorization': `Bearer ${userToken}`
            },
            data: data
          };

          addPatient(fname, lname)
          // try {
          //   // Open up the database so we can write to it.
          //   const realm = await Realm.open({ schema: [PatientSchema] });
          //   realm.write(() => {
          //     var ID = realm.objects('Patient').length + 1;
          //     // Now it's time to add the patient to the database.
          //     realm.create('Patient', {
          //       pat_id: ID,
          //       pat_first_name: fname,
          //       pat_last_name: lname,
          //       pat_gender: gender,
          //       pat_dob: dob,
          //       pat_nin: nin,
          //       pat_nin_hash: nin_hash
          //     });
          //   });
          //   console.log('Patient added!');
          // } catch (err) {
          //   console.warn(err);
          // }

          // if (userToken === null) {
          //   alert("Login to continue");
          // } else {
          //   axios(config)
          //     .then(function (response) {

          //       if (response.status === 201) {
          //         alert("Patient has been Recorded");

          //         clearState();

          //then reroute to the new case, with std object (nin, name) 
          //to get serverId for the case in the next screen
          navigation.navigate("NewCase", {
            nin: idNum,
            name: `${fname} ${lname}`,
            genderR: gender,
            dobR: dob
          })

          //store other patient in storage eg async storage or realm

          //       } else {
          //         alert("Error failed to record patient\n Try again.")
          //         console.log(JSON.stringify(response.data));
          //       }
          //     })
          //     .catch(function (error) {
          //       console.log(error);
          //     });
          // }
        })
        .catch(
          e => console.log("Hashing Catch: " + e)
        );
    }
    else {
      alert("Fill in all the fields");
    }
    // }
  };

  const cancel = () => {
    //clear fields, back to home
    clearState();
    navigation.navigate("Home");
  };

  const clearState = () => {
    setFName(''); setLName(''); setDob(''); setIDNum(''); setGender('');
    data.isValidNIN = data.isValidLName = data.isValidFName = data.isValidGender = data.isValidDob = true;
  };


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ position: 'absolute', top: '-5%', alignSelf: 'center' }}>
          <Text style={{ paddingVertical: 20, fontWeight: "bold" }}>
            {"Enter The Patient's Details:".toUpperCase()}
          </Text>
        </View>

        <ScrollView style={{ paddingTop: 20 }}>
          <View style={[styles.action, { paddingTop: 3 }]}>
            <TextInput style={{ fontSize: 18, width: '100%' }} label="First name" placeholder="First name" onChangeText={(val) => { setFName(val) }}
              value={fname} />
          </View>
          <View style={[styles.action, { paddingTop: 3 }]}>
            <TextInput style={{ fontSize: 18, width: '100%' }} label="Last name" placeholder="Last name" onChangeText={(val) => { setLName(val); }}
              value={lname} />
          </View>
          <View style={[styles.view, { paddingTop: 10, paddingBottom: 3 }]}>
            <Text style={{ fontSize: 18, color: '#808080', marginRight: '2%' }}>Gender : </Text>
            <TouchableOpacity onPress={() => setGender('M')} style={[styles.view, { paddingHorizontal: "4%" }]}>
              <Text style={{ fontSize: 17 }}>Male</Text>
              <RadioButton value="M" status={gender === 'M' ? 'checked' : 'unchecked'} color="purple" onPress={() => setGender('M')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('F')} style={[styles.view, { paddingHorizontal: "4%" }]}>
              <Text style={{ fontSize: 17 }}>Female</Text>
              <RadioButton value="F" color="purple" status={gender === 'F' ? 'checked' : 'unchecked'} onPress={() => setGender('F')} />
            </TouchableOpacity>
          </View>

          <View style={[styles.action, {}]}>
            <TextInput style={{ fontSize: 18, width: '100%' }} onFocus={showDatePicker} onKeyPress={showDatePicker} label="Date of Birth" placeholder="Enter Date of Birth"
              value={dob == '' ? '' : `Date of Birth:  ${dob}`} showSoftInputOnFocus={false} />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={[styles.action, {}]}>
            <TextInput style={{ fontSize: 18, width: '100%', paddingTop: 0 }} label="NIN" placeholder="NIN" onChangeText={(val) => setIDNum(val)} value={idNum} />
          </View>
          <View style={[styles.action2, { height: 50, marginVertical: 5, width: '100%', alignSelf: 'center' }]} >
            <Picker style={{
              color: selectedImmunizationStatus === '' ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
              transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
            }} selectedValue={selectedImmunizationStatus}
              onValueChange={(itemValue, itemIndex) => setSelectedImmunizationStatus(itemValue)} itemStyle={{ fontSize: 18 }} >
              <Picker.Item value="" label="Immunization Status:" />
              <Picker.Item value="F" label="Fully Immunized" />
              <Picker.Item value="P" label="Partially Immunized" />
              <Picker.Item value="N" label="Not Immunized" />
            </Picker>
          </View>
          <View style={[styles.action2, { height: 50, marginVertical: 5, width: '100%', alignSelf: 'center' }]} >
            <Picker style={{
              color: selectedDisability === '' ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
              transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
            }} selectedValue={selectedDisability}
              onValueChange={(itemValue, itemIndex) => setSelectedDisability(itemValue)} itemStyle={{ fontSize: 18 }} >
              <Picker.Item value="" label="Disability:" />
              <Picker.Item value="0" label="None" />
              <Picker.Item value="1" label="Difficulty in seeing" />
              <Picker.Item value="2" label="Albinism" />
              <Picker.Item value="3" label="Difficulty in hearing" />
              <Picker.Item value="4" label="Delayed age specific motor development" />
              <Picker.Item value="5" label="Delayed age specific height for age (dwarfism)" />
              <Picker.Item value="6" label="Difficulty understanding" />
              <Picker.Item value="7" label="Difficulty in remembering" />
              <Picker.Item value="8" label="Difficulty in writing" />
              <Picker.Item value="9" label="Difficulty washing all over or dressing" />
              <Picker.Item value="10" label="Mentally impared" />
              <Picker.Item value="11" label="Emotionally impared" />
            </Picker>
          </View>

          <View style={[styles.action2, { height: 50, marginVertical: 5, width: '100%', alignSelf: 'center' }]} >
            <Picker style={{
              color: selectedIllness === '' ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
              transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
            }} selectedValue={selectedIllness}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedIllness(itemValue);
              }} itemStyle={{ fontSize: 18 }} >
              <Picker.Item value="" label="Chronic medical condition/allergies:" />
              {/* {conditions.map(x => {
                <Picker.Item value={x.id} label={x.name} key={x.id}/>
              })
              } */}
              <Picker.Item value="1" label="Asthma" />
              <Picker.Item value="2" label="Sickle cell disease" />
              <Picker.Item value="3" label="TB on treatment" />
              <Picker.Item value="4" label="Cancer" />
              <Picker.Item value="5" label="Epilepsy" />
              <Picker.Item value="6" label="Chronic / congenital heart disease" />
              <Picker.Item value="7" label="Mental disorder" />
              <Picker.Item value="8" label="Diabetes" />
              <Picker.Item value="9" label="HIV/AIDS" />
              <Picker.Item value="10" label="Food/ medicine allergies" />
              <Picker.Item value="11" label="Other medical conditions/ allergies" />
              <Picker.Item value="12" label="Covid" />
            </Picker>
          </View>

          {(selectedIllness === "10" || selectedIllness === "11") ? <View style={[styles.action, { marginBottom: 10, width: '100%', alignSelf: 'center', paddingTop: 3 }]}>
            <TextInput style={{ fontSize: 18, width: '100%' }} label="Specify medical condition" placeholder="Specify medical condition:"
              onChangeText={(val) => { setOtherMedicalCondition(val); }} value={otherMedicalCondition} keyboardType="text" />
          </View> : null}

          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,
            paddingTop: 25, marginBottom: 10
          }}>
            <View style={{ width: 80, marginBottom: 10 }}>
              <Button rounded
                block
                style={styles.btn}
                color="grey" title="Cancel" onPress={() => { cancel() }} />

            </View>
            <View style={{ width: 80, marginBottom: 10 }}>
              <Button title="Register"
                rounded
                block
                style={styles.btn}
                color="rgba(231,76,60,1)"
                onPress={() => { savePatient() }}
              >
              </Button>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    width: "100%", height: "100%",
    // marginTop: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#F3F6F9"
  },
  action: {
    flexDirection: 'row',
    paddingTop: 15,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    paddingBottom: 2,
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
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
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  }

});
