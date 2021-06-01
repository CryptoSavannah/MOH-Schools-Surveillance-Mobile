import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, TextInput, FlatList, Text, SafeAreaView, ActivityIndicator, Button } from 'react-native';
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
import { fetchPatients } from '../model/data';
import logo from '../assets/logo.png';
import Icon from "react-native-vector-icons/Fontisto";
import IconF from "react-native-vector-icons/FontAwesome5";
import SearchableDropdown from 'react-native-searchable-dropdown';

const CaseForm = (props) => {

  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
  const [selectedPatient2, setSelectedPatient2] = useState([]);
  const [pname, setPName] = useState("");
  const [idNum, setIDNum] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);


  useEffect(() => {

    // console.log(fetchPatients().then(res =>))
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
      // setData(pats);
      // setFullData(pats)

      // setData([...data, res.])
      // console.log(data)
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
  }, [])

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

  const contains = ({ name, nin }, query) => {
    if (
      name.includes(query) ||
      nin.includes(query)
    ) {
      return true
    }
    return false
  }

  const handleSearch = (text, item) => {
    const formattedQuery = text.toLowerCase()
    const data = filter(fullData, item => {
      return contains(item, formattedQuery)
    })
    setData(data)
    setQuery(text)
  }

  const renderHeader = (item) => (
    <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={(text) => handleSearch(text, item)}
      placeholder='Search'
      style={{
        borderRadius: 25,
        borderColor: '#333',
        backgroundColor: '#fff',
        width: '90%'
      }}
      textStyle={{ color: '#000' }}
      clearButtonMode='always'
    />)

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    )
  }

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}>
        <ActivityIndicator animating size='large' />
      </View>
    )
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
    onSubmit();
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
        <View
          style={{
            // flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginTop: 40
          }}>

          {/* <View style={styles.container} > */}
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
                      var items = [];
                      items.push(item);
                      // console.log(item.id)
                      setSelectedPatients(selectedPatients => items);
                      setIDNum(item.nin);
                      setPName(item.name);
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
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{
                      // maxHeight: 140
                    }}
                    items={patients}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                      {
                        placeholder: pname === '' ? "Search Name" : pname,
                        underlineColorAndroid: "transparent",
                        style: {
                          padding: 8,
                          // borderWidth: 0.5,
                          // borderColor: '#ccc',
                          // borderRadius: 2,
                        },
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
                  <TextInput style={{ width: '100%', fontSize: 15 }} onFocus={showSearch}
                    onKeyPress={showSearch} label="Patient's Name"
                    placeholder="Search Patient's Name"
                    value={pname} />
                </View>

                {pname === '' ? <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ marginTop: 30 }}>
                    <Button
                      rounded
                      block
                      // style={styles.btn}
                      color="#1A5276" title="Add a Patient" onPress={() => createPatient()}>
                    </Button>
                  </View>
                </View> :
                  <View>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>

                      <TouchableOpacity style={{
                        alignSelf: 'flex-end', flexDirection: 'row',
                        paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, borderRadius: 5
                      }}>
                        <IconF name='user-edit' size={20} color="#1A5276" style={{ marginRight: 2 }} />
                        <Text style={{ color: "#1A5276", fontWeight: 'bold', textDecorationLine: 'underline', alignSelf: 'flex-end' }}>UPDATE</Text>
                      </TouchableOpacity>

                      <View style={{ alignSelf: 'flex-end' }}>
                        {/* <Text>{pname + "'s Details"}</Text> */}
                        <Text style={{ fontSize: 15, fontWeight: '300' }}>{"Details"}</Text>
                      </View>

                    </View>

                    <Divider style={{ backgroundColor: '#ddd', marginVertical: 10 }} />

                  </View>
                }
                <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-between' }}>
                  <PrevButton goToPrev={goToPrev} />
                  {pname === '' || idNum === '' ?
                    <NextButton goToNext={() => goToNext(false, 'Select Patient to continue')} />
                    :
                    <NextButton goToNext={() => goToNext(true, '')} />
                  }
                </View>
              </View>
            }
          </View>

          {/* <View style={{flex: 2}}></View> */}
          {/* </View>, */}

          {/* <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => alert('Item pressed!')}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center'
                  }}>
                  <Avatar.Image
                    source={logo}
                    size={26}
                    backgroundColor={'#dacdc9'}
                    style={{ borderRadius: 50, marginRight: 7 }}
                  /> 
                  <Icon
                  name='person' size={20} color="#b3b3b3"
                  style={{ marginRight: 7 }}
                />
                  <Text
                    category='s1'
                    style={{
                      color: '#000'
                    }}>{`${item.name}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => {item.id}}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={item => renderHeader(item)}
            ListFooterComponent={renderFooter}
          /> */}
        </View>
    },
    {
      content:
        <View style={[styles.content, { paddingTop: 0, justifyContent: 'space-around' }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
            <Text style={styles.textSize}>
              {"Select the noticable conditions"}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-between' }}>
            <PrevButton goToPrev={goToPrev} />
            {true ?
              // <NextButton goToNext={() => goToNext(false, 'Select atleast one condition to continue.')} />
              <NextButton goToNext={() => goToNext(true, '')} />

              :
              <NextButton goToNext={() => goToNext(true, '')} />
            }
          </View>
        </View>,
    },
    {
      content:
        <View style={[styles.content, { paddingTop: 0 }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
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