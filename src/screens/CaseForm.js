import React, { useState, useEffect, useRef } from 'react';
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
import { Checkbox, Divider } from 'react-native-paper';
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

const CaseForm = (props) => {

  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userId, setUserId] = useState('');

  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [seed, setSeed] = useState(1);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    makeRemoteRequest()
  })

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

  const contains = ({ name, email }, query) => {
    const { first, last } = name
    if (
      first.includes(query) ||
      last.includes(query) ||
      email.includes(query)
    ) {
      return true
    }
    return false
  }

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase()
    const data = filter(fullData, user => {
      return contains(user, formattedQuery)
    })
    setData(data)
    setQuery(text)
  }

  const renderHeader = () => (
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={handleSearch}
        placeholder='Search'
        style={{
          borderRadius: 25,
          borderColor: '#333',
          backgroundColor: '#fff',
          width: '90%'
        }}
        textStyle={{ color: '#000' }}
        clearButtonMode='always'
      />

    // <View
    //   style={{
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width
    //   }}>
    //   <Input
    //     autoCapitalize='none'
    //     autoCorrect={false}
    //     onChangeText={handleSearch}
    //     status='info'
    //     placeholder='Search'
    //     style={{
    //       borderRadius: 25,
    //       borderColor: '#333',
    //       backgroundColor: '#fff'
    //     }}
    //     textStyle={{ color: '#000' }}
    //     clearButtonMode='always'
    //   />
    //   <TextInput
    //     autoCapitalize='none'
    //     autoCorrect={false}
    //     onChangeText={handleSearch}
    //     placeholder='Search'
    //     style={{
    //       borderRadius: 25,
    //       borderColor: '#333',
    //       backgroundColor: '#fff',
    //       width: '90%'
    //     }}
    //     textStyle={{ color: '#000' }}
    //     clearButtonMode='always'
    //   ></TextInput>

    // </View>
  )

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

  const goToNext = () => {
    // console.log('next clicked')
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
          <NextButton goToNext={goToNext} disable={false} />
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
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => alert('Item pressed!')}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center'
                  }}>
                  {/* <Avatar
                    source={{ uri: item.picture.thumbnail }}
                    size='giant'
                    style={{ marginRight: 16 }}
                  /> */}
                  <Text
                    category='s1'
                    style={{
                      color: '#000'
                    }}>{`${item.name.first} ${item.name.last}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.email.toString()}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
          />
        </View>
    }]

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
    paddingBottom: 10,
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