import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button, ActivityIndicator } from 'react-native';
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
import { useController, useForm } from 'react-hook-form';
import { Checkbox as CheckboxP, List as ListP, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { fetchChronicConditions, fetchDisabilities } from '../model/data';

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
  const [conditions, setConditions] = useState([]);
  const [disabilities, setDisabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { nin } = route.params ?? {};
  const { fnameR } = route.params ?? {};
  const { lnameR } = route.params ?? {};
  const { genderR } = route.params ?? {};
  const { dobR } = route.params ?? {};
  const { immunizationStatusR } = route.params ?? {};
  const { disabilityR } = route.params ?? {};

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      date_of_birth: '',
      nin: '',
      immunization_status: '',
      disability: '',
      chronic_condiction: ''
    },
    mode: 'onChange',
  });

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

          //fetch diseases
    fetchChronicConditions().then(res => {
      // console.log(res)
      let conds = [];

      res.data.map(x => {
        conds.push({
          value: x.id,
          label: x.condition_name,
        });
      });

      setConditions(conds)

    })

    fetchDisabilities().then(res => {
      // console.log(res)
      let disabltis = [];

      res.data.map(x => {
        disabltis.push({
          value: x.id,
          label: x.disability_name,
        });
      });

      setDisabilities(disabltis);
      console.log(disabilities);

    })

  },[]);

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

  const savePatient = handleSubmit(async (data) => {
    setIsLoading(true)
    console.log(data);

    setTimeout(() => {
      setIsLoading(false)
      alert("Patient Information saved.");
      cancel()
    }, 1000);

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
              'Authorization': `Bearerselect ${userToken}`
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
          // navigation.navigate("NewCase", {
          //   nin: idNum,
          //   name: `${fname} ${lname}`,
          //   genderR: gender,
          //   dobR: dob
          // })

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
    // }
  });

  const cancel = () => {
    //clear fields, back to home
    navigation.navigate("Home");
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>
      <ScrollView style={{ paddingTop: 15 }} >
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              name: 'firstname',
              type: 'text',
              textInputProps: {
                label: 'First name',
              },
              rules: {
                required: {
                  value: true,
                  message: 'First name is required',
                },
              },
            },
            {
              name: 'lastname',
              type: 'text',
              textInputProps: {
                label: 'Last Name',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Last Name is required',
                },
              },
            },
            {
              name: 'gender',
              type: 'select',
              textInputProps: {
                label: 'Gender',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Gender is required',
                },
              },
              options: [
                {
                  value: 0,
                  label: 'Female',
                },
                {
                  value: 1,
                  label: 'Male',
                },
              ],
            },
            {
              name: 'date_of_birth',
              type: 'text',
              textInputProps: {
                label: 'Date of birth',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Date of birth is required',
                },
              },
            },
            {
              name: 'nin',
              type: 'text',
              textInputProps: {
                label: 'NIN',
              },
              rules: {
                required: {
                  value: true,
                  message: 'NIN is required',
                },
              },
            },
            {
              name: 'immunization_status',
              type: 'select',
              textInputProps: {
                label: 'Immunization Status',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Immunisation Status is required',
                },
              },
              options: [
                {
                  label: 'Fully Immunized',
                  value: 1,
                },
                {
                  label: 'Partially Immunized',
                  value: 2,
                },
                {
                  label: 'Not Immunized',
                  value: 3,
                },
              ],
            },
            {
              name: 'disability',
              type: 'autocomplete',
              textInputProps: {
                label: 'Disability',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Disability Status is required',
                },
              },
              options: disabilities,
            },
            {
              name: 'chronic_condition',
              type: 'autocomplete',
              textInputProps: {
                label: 'Chronic medical condition/allergies:',
              },
              rules: {
                required: {
                  value: true,
                  message: 'Condition is required',
                },
              },
              options: conditions
            },
          ]}
        />
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,
            paddingTop: 25, marginBottom: 10
          }}>
            <View style={{ width: 80, marginBottom: 10 }}>
              <Button
                block
                color="grey" title="Cancel" onPress={() => { cancel() }} />

            </View>
            <View style={{ width: 80, marginBottom: 10 }}>
              {!isLoading ? <Button title="Register"
                block
                color="rgba(3, 136, 229, 1)"
                onPress={() => { savePatient() }}
              >
              </Button>
                :
                <TouchableOpacity
                  style={[, styles.btn, { alignItems: "center", padding: 8, backgroundColor: "rgba(3, 136, 229, 1)" }]}
                  underlayColor='rgba(3, 136, 229, 1)'
                >
                  <ActivityIndicator animating={isLoading} color="#fff" />
                </TouchableOpacity>}
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

// function dobPicker(props) {
//   const { name, rules, shouldUnregister, defaultValue, control } = props;
//   const { field } = useController({
//     name,
//     rules,
//     shouldUnregister,
//     defaultValue,
//     control,
//   });

//   return (
//     <View>
//       <View style={[styles.action, {}]}>
//         <TextInput style={{ fontSize: 18, width: '100%' }} onFocus={showDatePicker} onKeyPress={showDatePicker} label="Date of Birth" placeholder="Enter Date of Birth"
//           value={field.value == '' ? '' : `Date of Birth:  ${field.value}`} showSoftInputOnFocus={false} />
//       </View>
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       /></View>
//   );
// }
