import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, TextInput, FlatList, Text, SafeAreaView, ActivityIndicator, Button, Dimensions, LogBox } from 'react-native';
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
// import Icon from "react-native-vector-icons/Fontisto";
import IconF from "react-native-vector-icons/FontAwesome5";
import SearchableDropdown from 'react-native-searchable-dropdown';
import Patient from '../components/Patient';
import IconC from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
// import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

const GREEN = 'rgba(241, 196, 15, 1)';
const PURPLE = 'rgba(40, 116, 166, 1)';
const WIDTH = Dimensions.get('window').width;


const AggregateForm = ({ route, navigation }) => {

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

  let values = {};
  const [isLoading, setIsLoading] = useState(false);

  const [fieldsExt, setFieldsExt] = useState([]);
  const [validFieldsExt, setValidFieldsExt] = useState(false);

  const [fieldsMarketLinks, setFieldsMarketLinks] = useState([]);
  const [validMarketLinks, setValidMarketLinks] = useState(false);

  const [fieldsInputs, setFieldsInputs] = useState([]);
  const [validInputs, setValidInputs] = useState(false);

  const searchableDrpDwn = useRef();
  const stdRef = useRef(null);
  const [patients, setPatients] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [pname, setPName] = useState("");
  const [idNum, setIDNum] = useState('');
  const [gender, setGender] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dob, setDob] = useState('');

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

  const [toDate, setToDate] = useState('');

  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
    setToDate('');
  };

  const handleToConfirm = (e) => {
    hideToDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setToDate('')
    }
    else {
      //format date
      setToDate(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1))

    }

  };


  const [fromDate, setFromDate] = useState('');

  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);

  const showFromDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisibility(false);
    setFromDate('');
  };

  const handleFromConfirm = (e) => {
    hideFromDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setFromDate('')
    }
    else {
      //format date
      setFromDate(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1))

    }

  };

  useEffect(() => {
    setCurrentStep(0);
    // retrieveUserId();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);


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
      alert("Form has been Saved");
      cancel()
    }, 1000);
  };


  function handleChangeInput(i, value, name, theFields, setTheFields, setValidFields) {
    const values = [...theFields];
    // console.log(theFields);

    values[i][name] = value;
    setValidFields(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
    setTheFields(values);
    // console.log(fields);
  }

  function handleAdd(theFields, setTheFields, setValidFields) {
    const values = [...theFields];
    // values.push({ value: null });
    values.push({
      Reason: '',
      Suggestion: '',
    });
    setValidFields(false)
    setTheFields(values);
  }

  function handleRemove(i, theFields, setTheFields, setValidFields) {
    const values = [...theFields];
    values.splice(i, 1);
    setValidFields(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
    setTheFields(values);
  }
  //-------------------------------------------------------------------------

  const CONTENT = [
    {
      title: 'Suspected Infections',
      content:
        <View style={{ maxWidth: Dimensions.get('window').width, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 8 }}>
            <Text style={[{ fontSize: 18, color: "black" }]}>
              {'Enter number of cases that have reported to be tested and also list thier noticable conditions (Add to list below)'} </Text>
          </View>

          <View style={{ width: 200, marginVertical: 10 }}>
            <Button
              rounded
              color="green" title="Add a Record" onPress={() => handleAdd(fieldsExt, setFieldsExt, setValidFieldsExt)}
            >
            </Button>
          </View>

          {fieldsExt.map((field, idx) => {
            return (
              <View key={`${field}-${idx}`} style={{
                borderRadius: 2, borderWidth: 1, borderStyle: 'dotted',
                borderColor: 'green', marginBottom: 10,
              }}>
                <View style={styles.action3}>
                  <TextInput style={{ fontSize: 18 }} label="Number"
                    placeholder="Number"
                    onChangeText={(val) => {
                      handleChangeInput(idx, val, 'Reason', fieldsExt, setFieldsExt, setValidFieldsExt);
                    }}
                    value={fieldsExt[idx]['Reason']} />
                </View>
                <View style={styles.action3}>
                  <TextInput style={{ fontSize: 18 }} label="Conditions"
                    placeholder="Conditions"
                    onChangeText={(val) => {
                      handleChangeInput(idx, val, 'Suggestion', fieldsExt, setFieldsExt, setValidFieldsExt);
                    }}
                    value={fieldsExt[idx]['Suggestion']} />
                </View>

                <View style={{
                  width: 90,
                  justifyContent: 'center',
                  marginTop: 5,
                  alignSelf: 'flex-end',
                  margin: 5,
                }}>
                  <Button
                    rounded
                    color="red" title="Remove" onPress={() => handleRemove(idx, fieldsExt, setFieldsExt, setValidFieldsExt)}
                  >
                  </Button>
                </View>
              </View>
            );
          })}


        </View>,
    },
    {
      title: 'Tested Cases',
      content:
        <View style={{ maxWidth: Dimensions.get('window').width, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 8 }}>
            <Text style={[{ fontSize: 18, color: "black" }]}>
              {'How many individuals have been tested in this period (Add to list below)'} </Text>
          </View>

          <View style={{ width: 200, marginVertical: 10 }}>
            <Button
              rounded
              color="green" title="Add a Record" onPress={() => handleAdd(fieldsMarketLinks, setFieldsMarketLinks, setValidMarketLinks)}
            >
            </Button>
          </View>

          {fieldsMarketLinks.map((field, idx) => {
            return (
              <View key={`${field}-${idx}`} style={{
                borderRadius: 2, borderWidth: 1, borderStyle: 'dotted',
                borderColor: 'green', marginBottom: 10,
              }}>
                <View style={styles.action3}>
                  <TextInput style={{ fontSize: 18 }} label="Number"
                    placeholder="Number"
                    onChangeText={(val) => {
                      handleChangeInput(idx, val, 'Reason', fieldsMarketLinks, setFieldsMarketLinks, setValidMarketLinks);
                    }}
                    value={fieldsMarketLinks[idx]['Reason']} />
                </View>

                <View style={{
                  width: 90,
                  justifyContent: 'center',
                  marginTop: 5,
                  alignSelf: 'flex-end',
                  margin: 5,
                }}>
                  <Button
                    rounded
                    color="red" title="Remove" onPress={() => handleRemove(idx, fieldsMarketLinks, setFieldsMarketLinks, setValidMarketLinks)}
                  >
                  </Button>
                </View>
              </View>
            );
          })}


        </View>,
    },
    {
      title: 'Confirmed',
      content:
        <View style={{ maxWidth: Dimensions.get('window').width, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 8 }}>
            <Text style={[{ fontSize: 18, color: "black" }]}>
              {'What are some confirmed cases logged in this period, how many of them have received inoculation? (Add to list below)'} </Text>
          </View>

          <View style={{ width: 200, marginVertical: 10 }}>
            <Button
              rounded
              color="green" title="Add a Case" onPress={() => handleAdd(fieldsInputs, setFieldsInputs, setValidInputs)}
            >
            </Button>
          </View>

          {fieldsInputs.map((field, idx) => {
            return (
              <View key={`${field}-${idx}`} style={{
                borderRadius: 2, borderWidth: 1, borderStyle: 'dotted',
                borderColor: 'green', marginBottom: 10,
              }}>
                <View style={styles.action3}>
                  <TextInput style={{ fontSize: 18 }} label="Number Confirmed"
                    placeholder="Number Confirmed"
                    onChangeText={(val) => {
                      handleChangeInput(idx, val, 'Reason', fieldsInputs, setFieldsInputs, setValidInputs);
                    }}
                    value={fieldsInputs[idx]['Reason']} />
                </View>
                <View style={styles.action3}>
                  <TextInput style={{ fontSize: 18 }} label="Immunised Number"
                    placeholder="Immunised Number"
                    onChangeText={(val) => {
                      handleChangeInput(idx, val, 'Suggestion', fieldsInputs, setFieldsInputs, setValidInputs);
                    }}
                    value={fieldsInputs[idx]['Suggestion']} />
                </View>

                <View style={{
                  width: 90,
                  justifyContent: 'center',
                  marginTop: 5,
                  alignSelf: 'flex-end',
                  margin: 5,
                }}>
                  <Button
                    rounded
                    color="red" title="Remove" onPress={() => handleRemove(idx, fieldsInputs, setFieldsInputs, setValidInputs)}
                  >
                  </Button>
                </View>
              </View>
            );
          })}


        </View>,
    },
  ];

  //To make the selector (Something like tabs)
  const SELECTORS = [
    { title: 'Collapse all' },
  ];

  // Default active selector
  const [activeSections, setActiveSections] = useState([]);
  // MultipleSelect is for the Multiple Expand allowed

  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(
      sections.includes(undefined) ? [] : sections
    );
  };

  const renderHeader = (section, _, isActive) => {
    // Accordion header view
    return (
      <Animatable.View
        duration={100}
        style={[
          styles.header,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Icon name="hand-o-right" color="black"
          size={15} style={{ paddingTop: 5 }} />
        <Text style={styles.headerText}>
          {section.title}
        </Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    // Accordion Content view
    return (
      <Animatable.View
        duration={100}
        style={[
          styles.content2,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'center' }}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  const stepList = [
    {
      content:
        <View style={[styles.content, { paddingTop: 0, justifyContent: 'space-around' }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
            <Text style={styles.textSize}>
              {'Please give us summaries for a period.'}
            </Text>
          </View>
          <NextButton goToNext={() => goToNext(true, '')} disable={false} />
        </View>,
    },
    {
      content:
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, left: 10, paddingBottom: 10 }}>
            Aggregates:  </Text>
          <View style={{ flexDirection: 'row', justifyContent: "space-around", marginBottom: 10 }}>
            <View style={{ width: '40%' }}>
              <View style={styles.action}>
                <TextInput style={{ fontSize: 16 }} onFocus={showFromDatePicker} onKeyPress={showFromDatePicker} label="Date of Birth" placeholder="From Date:"
                  value={fromDate == '' ? '' : `From:  ${fromDate}`}
                  showSoftInputOnFocus={false} />
              </View>
              <DateTimePickerModal
                isVisible={isFromDatePickerVisible}
                mode="date"
                onConfirm={handleFromConfirm}
                onCancel={hideFromDatePicker}
              />
            </View>
            <View style={{ width: '40%' }}>
              <View style={styles.action}>
                <TextInput style={{ fontSize: 16 }}
                  onFocus={showToDatePicker} onKeyPress={showToDatePicker} label="To Date" placeholder="To Date:"
                  value={toDate == '' ? '' : `To:  ${toDate}`}
                  showSoftInputOnFocus={false} />
              </View>
              <DateTimePickerModal
                isVisible={isToDatePickerVisible}
                mode="date"
                onConfirm={handleToConfirm}
                onCancel={hideToDatePicker}
              />
            </View>
          </View>

          <View style={[styles.action, { marginBottom: 10, width: '90%', alignSelf: 'center' }]}>
            <TextInput style={{ fontSize: 18, width: '80%' }} label="Enter Medical illness" placeholder="Enter Medical illness" onChangeText={(val) => { setLName(val); }}
            />
          </View>

          <View style={{ paddingBottom: 10, paddingLeft: 3, flexDirection: 'row', justifyContent: "flex-end" }}>
            {/*Code for Selector starts here*/}
            <View style={styles.selectors}>
              {SELECTORS.map((selector) => (
                <TouchableOpacity
                  key={selector.title}
                  onPress={
                    () => setSections([selector.value])
                  }
                >
                  <View style={styles.selector}>
                    <Text
                      style={
                        (activeSections.includes(selector.value) &&
                          styles.activeSelector), { fontSize: 16 }
                      }>
                      {selector.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/*Code for Selector ends here*/}
          </View>

          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            activeSections={activeSections}
            // For any default active section
            sections={CONTENT}
            // Title and content of accordion
            touchableComponent={TouchableOpacity}
            // Which type of touchable component you want
            // It can be the following Touchables
            // TouchableHighlight, TouchableNativeFeedback
            // TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={false}
            // If you want to expand multiple at a time
            renderHeader={renderHeader}
            // Header Component(View) to render
            renderContent={renderContent}
            // Content Component(View) to render
            duration={400}
            // Duration for Collapse and expand
            onChange={setSections}
          // Setting the state of active sections
          />
          {/*Code for Accordion/Expandable List ends here*/}
          <View style={{
            flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between', alignContent: "center",
            paddingHorizontal: 20
          }}>

            <PrevButton goToPrev={goToPrev} />

            {(fieldsExt.length > 0 && validFieldsExt) || (fieldsInputs.length > 0 && validInputs) ||
              (fieldsMarketLinks.length > 0 && validMarketLinks) ?
              <NextButton goToNext={() => goToNext(false, 'Fill in atleast one list to continue')} disable={false} />
              :
              <NextButton goToNext={() => goToNext(true, '')} disable={false} />
            }
          </View>
        </ScrollView>
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

export default AggregateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    padding: 10,
    margin: 10,
    height: '100%',
  },
  textSize: {
    fontSize: 20
  },
  action: {
    // flexDirection: 'row',
    // width: '50%',
    // paddingTop: 15,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    // paddingBottom: 10,
  },
  action3: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginBottom: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    flexDirection: 'row'
  },
  headerText: {
    // textAlign: 'center',
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: '500',
    // borderColor: 'grey',
    // borderBottomWidth: 1,
    paddingBottom: 5
  },
  content2: {
    marginBottom: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 18,
    marginRight: 8,
  },
});