import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, TextInput, FlatList, Text, SafeAreaView, ActivityIndicator, Button, Dimensions } from 'react-native';
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
import { fetchPatients, fetchConditions } from '../model/data';
import logo from '../assets/logo.png';
import Icon from "react-native-vector-icons/Fontisto";
import IconF from "react-native-vector-icons/FontAwesome5";
import SearchableDropdown from 'react-native-searchable-dropdown';
import Patient from '../components/Patient';
import IconC from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';


const CaseForm = ({ route, navigation }) => {

  const { nin } = route.params ?? {};
  const { name } = route.params ?? {};
  const { genderR } = route.params ?? {};
  const { dobR } = route.params ?? {};

  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [userId, setUserId] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [seed, setSeed] = useState(1);
  // const [error, setError] = useState(null);
  // const [query, setQuery] = useState('');
  // const [fullData, setFullData] = useState([]);

  // const[url, setUrl] = useState('');

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
  const [searchFocused, setSearchFocused] = useState(false);

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
      console.log('new patient: ', name);
    }
    if (typeof dobR !== 'undefined') {
      setDob(dobR)
    }
    if (typeof genderR !== 'undefined') {
      setGender(genderR)
    }
    if (typeof nin !== 'undefined') {
      setIDNum(nin)
      console.log(nin)
      //get server patient_id
      // fetchPatient(nin).then(res =>{
      //fetch patient from server or realm or async
      AsyncStorage.multiGet(['gender', 'dob'], (err, items) => {

        //load details of patient in viewPatient component 
        setGender(items.gender)
        setDob(items.dob)
      });
      // })

    }

    fetchPatients().then(res => {
      // console.log(res)
      let pats = [];

      res.data.map(x => {
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
  }, [name, nin, gender, dob])

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

  const makeRemoteRequest = () => {

    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    setIsLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(page === 1 ? res.results : [...data, ...res.results])
        setError(res.error || null);
        setIsLoading(false)
        setFullData(res.results)
      })
      .catch(error => {
        setError(false);
        setIsLoading(false)
      })
  }

  const createPatient = () => {
    navigation.navigate('AddNew');
  }

  const onSubmit = async () => {
    //setting values for feilds
    values['userId'] = userId;
    values['district'] = district;


    // console.log(values);

    await axios.post(baseUrl + 'farmings', {
      values,
    })
      .then(function (response) {
        if (response.status === 200) {

          alert('Success!', 'Farming Sector Information saved.', [{
            text: 'Okay', onPress: () => cancel(),
          }]);
          cancel();

        } else {

          console.log(response.status);
          alert('Failed to save Farming Sector Information.', 'Please try again.', [{
            text: 'Okay', onPress: () => setCurrentStep(0),
          }]);
          setCurrentStep(0);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert('Failed to save Farming Sector Information.', error + '\nPlease try again.', [{
          text: 'Okay', onPress: () => cancel(),
        }]);
        cancel()
      }).finally(() => { setIsLoading(false) })
  }

  const cancel = () => {
    //clear fields, back to home
    // clearState();
    setCurrentStep(0);
    navigation.navigate('Home');
    // navigation.goBack();
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
    // onSubmit();
    setTimeout(() => {
      setIsLoading(false)
      alert("Case has been Recorded");
      cancel()
    }, 1000);
  };


  const stepList = [
    {
      content:
        <View style={[styles.content, { paddingTop: 0, justifyContent: 'space-around' }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
            <Text style={styles.textSize}>
              {"Please give us information about the patient's condition"}
            </Text>
          </View>
          <NextButton goToNext={() => goToNext(true, '')} disable={false} />
        </View>,
    },
    {
      content:
        <View style={[styles.content, { paddingTop: 0, justifyContent: 'space-around' }]}>

          <View style={[{ paddingTop: 0 }]}>
            {searchFocused ?
              <View style={{ borderWidth: 0.5, borderColor: '#ccc', borderRadius: 2, }}>
                <TouchableOpacity style={{ padding: 10, position: 'absolute', right: 10, zIndex: 999 }} onPress={clearSearch}>
                  <Icon name='close-a' size={20} color="#b3b3b3" style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <Fragment >
                  <SearchableDropdown
                    ref={stdRef}
                    onTextChange={text => {
                      const items = selectedPatients.filter((sitem) => sitem.name.includes(text));
                      console.log('possible ', items.length)
                    }}
                    onItemSelect={(item) => {
                      console.log(item)
                      var items = [];
                      items.push(item);
                      setSelectedPatients(selectedPatients => items);
                      setIDNum(item.nin);
                      setPName(item.name);
                      setDob(item.dob)
                      setGender(item.gender)
                      showSearch()
                    }}
                    containerStyle={{ padding: 0 }}
                    onRemoveItem={(item, index) => {
                      const items = selectedPatients.filter((sitem) => sitem.patient_id !== item.patient_id);
                      setSelectedPatients(selectedPatients => items);
                    }}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: '#bbb',
                      borderWidth: 0.5,
                      borderRadius: 2,
                    }}
                    itemTextStyle={{ color: '#222', fontSize: 16 }}
                    itemsContainerStyle={{
                    }}
                    items={patients}
                    resetValue={false}
                    textInputProps={
                      {
                        placeholder: pname === '' ? "Search Name" : pname,
                        underlineColorAndroid: "transparent",
                        style: {
                          padding: 8,
                        },
                        fontSize: 16
                      }
                    }
                    textInputStyle={{
                      color: '#000'
                    }}
                    listProps={
                      {
                        nestedScrollEnabled: true,
                      }
                    }
                  />
                </Fragment>
              </View>
              :
              <View>
                <View style={styles.action3}>
                  <TextInput style={{ width: '100%', fontSize: 16 }} onFocus={showSearch}
                    onKeyPress={showSearch} label="Patient's Name"
                    placeholder="Search Patient's Name"
                    value={pname} />
                </View>

                {pname === '' ? <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ marginTop: 30 }}>
                    <Button
                      rounded
                      block
                      color="#1A5276" title="Add a Patient" onPress={() => createPatient()}>
                    </Button>
                  </View>
                </View> :
                  <View style={{ justifyContent: 'space-between', paddingVertical: 20 }}>
                    <TouchableOpacity style={{
                      alignSelf: 'flex-end', flexDirection: 'row',
                      paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, borderRadius: 5
                    }} onPress={() => {
                      console.log('dob: ', dob)
                      navigation.navigate("AddNew", {
                        fnameR: pname.split(' ')[0],
                        nin: idNum,
                        lnameR: pname.split(' ')[1],
                        dobR: dob,
                        genderR: gender
                      })
                    }}>
                      <Text style={{ color: "#1A5276", fontWeight: 'bold', textDecorationLine: 'underline', alignSelf: 'flex-end' }}>UPDATE</Text>
                    </TouchableOpacity>
                    <Patient name={pname} nin={idNum} gender={gender} dob={dob} />
                  </View>
                }
                <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-between' }}>
                  <PrevButton goToPrev={() => {
                    pname === '' ? goToPrev() : setPName('')
                  }} />
                  {pname === '' || idNum === '' ?
                    <NextButton goToNext={() => goToNext(false, 'Select Patient to continue')} />
                    :
                    <NextButton goToNext={() => goToNext(true, '')} />
                  }
                </View>
              </View>
            }
          </View>
        </View>
    },
    {
      content:
        <View style={{ padding: 10, margin: 10, height: '95%', }}>
          {selectedConditions.length >= 5 ?
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite"
              style={{ position: 'absolute', right: 1, top: '9%', zIndex: 999 }}>
              <IconC name="long-arrow-right" size={25} color={'#1A5276'} />
            </Animatable.View> : null}
          <View style={{ paddingTop: 20 }}>
            <Text style={[styles.textSize, { alignSelf: 'center' }]}>
              {"Select the noticable conditions"}
            </Text>
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
              itemTextStyle={{ color: '#222', fontSize: 16 }}
              itemsContainerStyle={{ maxHeight: "85%" }}
              items={conditions}
              // chip={true}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Search Condition",
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

          <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-between' }}>
            <PrevButton goToPrev={goToPrev} />
            {selectedConditions.length === 0 ?
              <NextButton goToNext={() => goToNext(false, 'Select atleast one condition to continue.')} />
              // <NextButton goToNext={() => goToNext(true, '')} />

              :
              <NextButton goToNext={() => goToNext(true, '')} />
            }
          </View>
        </View>,
    },
    {
      content:
        <View style={[styles.content, { paddingTop: 0 }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 40 }}>
            <Text style={styles.textSize}>
              That's all, Thanks!
                  </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
            paddingTop: 10,
            alignContent: 'center',
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
    // wizard setup
    <View style={{ justifyContent: 'center' }}>
      <Wizard
        ref={wizard}
        steps={stepList}
        // nextStepAnimation="slideRight"
        // prevStepAnimation="slideLeft"
        duration={0}
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
          setCurrentStep(currentStep);
        }}
      />
    </View>
  );

};

export default CaseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    // backgroundColor: '#fff',
    // borderRadius: 5,
    // elevation: 10,
    padding: 10,
    margin: 10,
    // minHeight: "65%",
    // maxHeight: "95%",
    height: '100%',
    // justifyContent: "space-around",
  },
  textSize: {
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    // textAlign: 'center',
    fontSize: 18,
    // alignSelf: "center",
    paddingTop: 10,
    // paddingBottom: 5
    // color: '#333',
    // marginTop: 20,
    // marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    // textAlign: 'center',
    fontSize: 15,
    // color: '#fff',
  },
  action: {
    // flexDirection: 'row',
    paddingTop: 15,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: 10,
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
});