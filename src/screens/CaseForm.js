import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, TextInput as TextInputN, FlatList, Text, SafeAreaView, ActivityIndicator, Button, Dimensions } from 'react-native';
import {
  FormInput,
} from "@99xt/first-born";
// import { Picker } from 'native-base';
// import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { Checkbox, Divider, Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { CREATE_PATIENT_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { TouchableOpacity } from 'react-native';
import NextButton from '../components/NextButton';
import PrevButton from '../components/PrevButton';
import FinishButton from '../components/FinishButton';
import LoadingButton from '../components/LoadingButton';
import filter from 'lodash.filter';
import { fetchPatients, fetchConditions, fetchChronicConditions } from '../model/data';
import logo from '../assets/logo.png';
import Icon from "react-native-vector-icons/Fontisto";
import IconF from "react-native-vector-icons/FontAwesome5";
import SearchableDropdown from 'react-native-searchable-dropdown';
import Patient from '../components/Patient';
import IconC from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../constants/theme';
import { useController, useForm } from 'react-hook-form';
import { Checkbox as CheckboxP, List as ListP, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';

const CaseForm = ({ route, navigation }) => {

  const { nin } = route.params ?? {};
  const { name } = route.params ?? {};
  const { genderR } = route.params ?? {};
  const { dobR } = route.params ?? {};
  const { immunizationStatusR } = route.params ?? {};
  const { disabilityR } = route.params ?? {};

  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');
  const [case_stats, setCase_Stats] = useState('');
  const [summaries_stats, setSummaries_Stats] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const searchableDrpDwn = useRef();
  const stdRef = useRef(null);
  const [patients, setPatients] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [pname, setPName] = useState("");
  const [idNum, setIDNum] = useState('');
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState('');
  const [immunizationStatus, setImmunizationStatus] = useState('');
  const [disability, setDisability] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const [selectedIllness, setSelectedIllness] = useState('');
  const [selectedIllnessName, setSelectedIllnessName] = useState('');
  const [otherMedicalCondition, setOtherMedicalCondition] = useState('');
  const [allIllnesses, setAllIllnesses] = useState([])

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      city: '',
      gender: '',
      rememberMe: 'checked',
      patient: ''
    },
    mode: 'onChange',
  });

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
          alignSelf: 'center', borderWidth: 1, borderRadius: 5, padding: 5, borderColor: '#f5f5f5', fontSize: 16
        }}>
          {item.name}</Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {


    if (typeof name !== 'undefined') {
      setPName(name)
      // console.log('new patient: ', name);
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
      // console.log(nin)
      //get server patient_id
      // fetchPatient(nin).then(res =>{
      //fetch patient from server or realm or async
      // AsyncStorage.multiGet(['gender', 'dob'], (err, items) => {
      //   console.log(items)
      //   //load details of patient in viewPatient component 
      //   setGender(items.gender)
      //   setDob(items.dob)
      // });
      // })

    }

    fetchPatients().then(res => {
      // console.log(res)
      let pats = [];

      res.data.map(x => {
        let date = new Date(x.dob);
        pats.push({
          value: x.patient_id,
          // nin: x.nin,
          // nin_hash: x.nin_hash,
          label: x.fname + ' ' + x.lname,
          // dob: date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1),
          // gender: x.gender,
          // immunizationStatus: x.immunizationStatus,
          // disability: x.disability
        });
      });

      setPatients(pats);

    })

    fetchConditions().then(res => {
      // console.log(res)
      let conds = [];

      res.data.map(x => {
        conds.push({
          id: x.condition_id,
          name: x.condition,
        });
      });

      setConditions(conds)

    })

    fetchChronicConditions().then(res => {
      // console.log(res)
      let conds = [];

      res.data.map(x => {
        conds.push({
          id: x.id,
          name: x.condition_name,
        });
      });

      setAllIllnesses(conds)
      // console.log(allIllnesses)

    })

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {
        } else {
          let usr = JSON.parse(user);
          setUserToken(usr.token);
          setCenter_no(usr.center_no);
        }
      })
      .catch(err => console.log(err));

    AsyncStorage.getItem('case_stats')
      .then(the_case_stats => {
        if (the_case_stats !== null) {
          setCase_Stats(the_case_stats);
        }
      })
      .catch(err => console.log(`case_stats error just: `, err));

    // makeRemoteRequest()

    // const source = axios.CancelToken.source()
    // setUrl(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`);


    // let mounted = true;

    // const loadData = async () => {
    //   const response = await axios.get(url)

    //     if (mounted && url !== '') {
    //       console.log(response.results)
    //       setData(page === 1 ? response.results : [...data, ...response.results])
    //     }
    // }
    // loadData();


    // const fetchUsers = async () => {
    //   try {
    //     await axios.get(url, {
    //       cancelToken: source.token,
    //     }).then(res => {
    //       console.log(' first Res2: \n')
    //       console.log(res.json().results)
    //       res.json()})
    //     .then(res => {
    //       console.log(res)
    //       setData(page === 1 ? res.results : [...data, ...res.results])
    //       setError(res.error || null);
    //       setIsLoading(false)
    //       setFullData(res.results)
    //     })
    //     .catch(error => {
    //       setError(false);
    //       setIsLoading(false)
    //     })
    //     // ...
    //   } catch (error) {
    //     if (axios.isCancel(error)) {
    //     } else {
    //       throw error
    //     }
    //   }
    // }

    // fetchUsers()

    // return () => {
    //   source.cancel()
    // }

    if (selectedIllness !== '') {
      let the_name = allIllnesses.find(x => x.id.toString() === selectedIllness).name;
      setSelectedIllnessName(the_name)
    }
  }, [name, nin, gender, dob, immunizationStatus, disability, selectedIllness, selectedIllnessName])

  const showSearch = () => {
    setSearchFocused(!searchFocused)
    searchFocused ? focusSearch : null
  }

  const clearSearch = () => {
    pname === '' ? showSearch() : setPName('')
  }

  const focusSearch = () => {
    stdRef.current.focus()
  }

  const createPatient = () => {
    navigation.navigate('AddNew');
  }

  const onSubmit2 = handleSubmit((data) => {
    console.log(data);
    setPName(data.firstName + " " + data.lastName)
    goToNext(true, '');
  })


  const onSubmit = async () => {
    //setting values for feilds
    // values['userId'] = userId;

    // console.log('original summ: ', summaries_stats)
    var the_case_stats = (parseInt(case_stats) + 1);

    //  console.log('the_case_stats to post: ' + the_case_stats);
    AsyncStorage.setItem('case_stats', (the_case_stats).toString());

    // console.log(values);

    // await axios.post(baseUrl + 'farmings', {
    //   values,
    // })
    //   .then(function (response) {
    //     if (response.status === 200) {

    //       alert('Success!', 'Farming Sector Information saved.', [{
    //         text: 'Okay', onPress: () => cancel(),
    //       }]);
    //       cancel();

    //     } else {

    //       console.log(response.status);
    //       alert('Failed to save Farming Sector Information.', 'Please try again.', [{
    //         text: 'Okay', onPress: () => setCurrentStep(0),
    //       }]);
    //       setCurrentStep(0);
    //     }

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert('Failed to save Farming Sector Information.', error + '\nPlease try again.', [{
    //       text: 'Okay', onPress: () => cancel(),
    //     }]);
    //     cancel()
    //   }).finally(() => { setIsLoading(false) })
  }

  const cancel = () => {
    //clear fields, back to home
    // clearState();
    setCurrentStep(0);
    // navigation.navigate('Home');
    navigation.goBack();
  };

  const goToNext = (valid, error) => {
    // console.log('next clicked')
    if (!valid) {
      alert(error)
      return
    }

    wizard.current.next();
  };

  const goToPrev = () => {
    wizard.current.prev();
  };

  const goToFinish = () => {
    setIsLoading(true);
    onSubmit();
    setTimeout(() => {
      setIsLoading(false)
      alert("Case has been Recorded");
      cancel()
    }, 1000);
  };


  const stepList = [
    {
      content:
        <View style={[styles.content]}>
          <ScrollView style={{ paddingTop: 15 }} >
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  name: 'patient',
                  type: 'autocomplete',
                  textInputProps: {
                    label: 'Patient',
                    left: <TextInput.Icon name={'account'} />,
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Patient is required',
                    },
                  },
                  options: patients
                },
                {
                  name: 'email',
                  type: 'email',
                  textInputProps: {
                    label: 'Email',
                    left: <TextInput.Icon name={'email'} />,
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value:
                        /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                      message: 'Email is invalid',
                    },
                  },
                },
                {
                  name: 'password',
                  type: 'password',
                  textInputProps: {
                    label: 'Password',
                    left: <TextInput.Icon name={'lock'} />,
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 8,
                      message: 'Password should be atleast 8 characters',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Password should be between 8 and 30 characters',
                    },
                  },
                },
                {
                  name: 'city',
                  type: 'autocomplete',
                  textInputProps: {
                    label: 'City',
                    left: <TextInput.Icon name={'office-building'} />,
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'City is required',
                    },
                  },
                  options: [
                    {
                      label: 'Lucknow',
                      value: 1,
                    },
                    {
                      label: 'Noida',
                      value: 2,
                    },
                    {
                      label: 'Delhi',
                      value: 3,
                    },
                    {
                      label: 'Bangalore',
                      value: 4,
                    },
                    {
                      label: 'Pune',
                      value: 5,
                    },
                    {
                      label: 'Mumbai',
                      value: 6,
                    },
                    {
                      label: 'Ahmedabad',
                      value: 7,
                    },
                    {
                      label: 'Patna',
                      value: 8,
                    },
                  ],
                },
                {
                  name: 'gender',
                  type: 'select',
                  textInputProps: {
                    label: 'Gender',
                    left: <TextInput.Icon name={'account'} />,
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
                  name: 'rememberMe',
                  type: 'custom',
                  JSX: TermsCheckBox,
                },
              ]}
            />
              <NextButton goToNext={onSubmit2} disable={false} />
          </ScrollView>
        </View>,
    },
    {
      content:
        <View style={{ padding: 10, margin: 10, height: '95%', }}>

          {(selectedIllness === "10" || selectedIllness === "11") ? <View style={[styles.action, { marginBottom: 10, width: '90%', alignSelf: 'center' }]}>
            <TextInputN style={{ fontSize: 18, width: '100%' }} label="Specify medical condition" placeholder="Specify medical condition:"
              onChangeText={(val) => { setOtherMedicalCondition(val); }} value={otherMedicalCondition} keyboardType="numeric" />
          </View> : null}

          {selectedConditions.length >= 5 ?
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite"
              style={{ position: 'absolute', right: 1, top: '10%', zIndex: 999 }}>
              <IconC name="long-arrow-right" size={25} color={'#1A5276'} />
            </Animatable.View> :
            <View style={{ paddingTop: 20, paddingBottom: selectedConditions.length > 0 ? 0 : 10 }}>
              <Text style={[styles.textSize]}>
                {"Select all the noticable symptoms"}
              </Text>
            </View>}

          {/* symptoms */}

          {selectedConditions.length > 0 ? <FlatList
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
          /> : null}

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
              itemTextStyle={{ color: '#222', fontSize: 16 }}
              itemsContainerStyle={{ maxHeight: "85%" }}
              items={conditions}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Search Symptom",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    fontSize: 16
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

          <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
            <PrevButton goToPrev={goToPrev} />
            {selectedConditions.length === 0 ?
              <NextButton goToNext={() => goToNext(false, 'Select atleast one condition to continue.')} />
              :
              <NextButton goToNext={() => goToNext(true, '')} />
            }
          </View>
        </View>,
    },
    {
      content:
        <View style={[styles.content2, { paddingTop: 0 }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 40 }}>
            <Text style={[styles.textSize, { paddingHorizontal: 10, paddingVertical: 5, color: '#030303' }]}>
              PREVIEW
            </Text>
          </View>

          <View style={[styles.action, { paddingVertical: 8 }]}>
            <Text style={[styles.textSize, { fontWeight: 'bold' }]}>
              {`Name: ${pname}`}
            </Text>
          </View>
          <View style={[styles.action, { paddingVertical: 8, maxHeight: '60%' }]}>
            <Text style={[styles.textSize, { marginBottom: 5 }]}>
              {`Symptoms (${selectedConditions.length}):`}
            </Text>
            <FlatList
              style={{ marginLeft: 5 }}
              data={selectedConditions}
              renderItem={({ item }) =>
                <Text paragraph style={{
                  marginHorizontal: 2, borderTopWidth: 1, padding: 5, borderColor: '#f5f5f5', fontSize: 16
                }}>
                  {item.name}</Text>}
              keyExtractor={item => (item.id.toString())}
            />
          </View>

          <View style={{
              flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,
              marginBottom: 10
            }}>
            <PrevButton goToPrev={goToPrev} />
            {isLoading ?
              <LoadingButton isLoading={isLoading} />
              :
              <FinishButton goToFinish={goToFinish} />}

          </View>
        </View>,
    },]

  return (
    <View style={{ justifyContent: 'center' }}>
      <Wizard
        ref={wizard}
        steps={stepList}
        duration={0}
        isFirstStep={val => setIsFirstStep(val)}
        isLastStep={val => setIsLastStep(val)}
        onNext={() => {
        }}
        onPrev={() => {
        }}
        currentStep={({ currentStep, isLastStep, isFirstStep }) => {
          setCurrentStep(currentStep);
        }}
      />
    </View>
  );

};

export default CaseForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%", height: "100%",
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: "center",
     width: "100%", height: "100%",
     marginTop: 10,
     paddingHorizontal: 20,
   },
  content2: {
    marginTop: 10,
    paddingHorizontal: 20,
    width: "100%", height: "100%",
  },
  textSize: {
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  action: {
    paddingTop: 15,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  action3: {
    paddingTop: 5,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    // paddingBottom: 5,
  },
  action4: {
    // flexDirection: 'row',
    // paddingTop: 10,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  btn: {
    padding: '3%',
    alignItems: 'center',
    elevation: 2,
    margin: '15%',
    borderRadius: 30,
    // backgroundColor: "white",
    borderWidth: 1,
  },
  action2: {
    paddingTop: 10,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
});

function TermsCheckBox(props) {
  const { name, rules, shouldUnregister, defaultValue, control } = props;
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <ListP.Item
      title={'Remember me'}
      left={() => (
        <CheckboxP.Android
          status={field.value}
          onPress={() => {
            field.onChange(field.value === 'checked' ? 'unchecked' : 'checked');
          }}
        />
      )}
    />
  );
}
