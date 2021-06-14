import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, TextInput, Text, ActivityIndicator, Button, TouchableOpacity, LogBox } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler';
import { CREATE_AGGREGATE_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

const AggregateForm = ({ route, navigation }) => {

  const [userId, setUserId] = useState('');

  let values = {};
  const [isLoading, setIsLoading] = useState(false);

  const [conditions, setConditions] = useState([]);
  const [selectedIllness, setSelectedIllness] = useState('');

  const [suspectedNo, setSuspectedNo] = useState('');
  const [testedNo, setTestedNo] = useState('');
  const [confirmedNo, setConfirmedNo] = useState('');

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
      setToDate(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate()))

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
      setFromDate(date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate()))

    }

  };

  useEffect(() => {
    // retrieveUserId();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    //fetch diseases
    // fetchConditions().then(res => {
    //   // console.log(res)
    //   let conds = [];

    //   res.data.map(x => {
    //     conds.push({
    //       id: x.condition_id,
    //       name: x.condition,
    //     });
    //   });

    //   setConditions(conds)

    // })

  }, [])

  const dateReverseFormat = (str) => {
    let str2 = str.split("-")
    return (str2[1] + '/' + str2[2] + '/' + str2[0])
  }

  const onSubmit = async () => {
    //setting values for feilds
    values['userId'] = userId;

    // console.log(values);

    if (toDate === '' || fromDate === '' || selectedIllness === '' || ![suspectedNo, testedNo, confirmedNo].some((x) => { return x !== '' })) {
      alert("Fill in all the relevant information");
      return
    }

    if (new Date(dateReverseFormat(fromDate)) > new Date(dateReverseFormat(toDate))) {
      alert('"From Date" should not be after "To Date"');
      return
    }

    setIsLoading(true);
    // onSubmit();
    setTimeout(() => {
      setIsLoading(false)
      alert("Case Summary Information saved.");
      cancel()
    }, 1000);

    // var data = {
    //   "fromDate": `${fromDate}`,
    //   "toDate": `${toDate}`,
    //   "disease": `${selectedIllness}`,
    //   "suspected": `${suspectedNo}`,
    //   "tested": `${testedNo}`,
    //   "confirmed": `${confirmedNo}`,
    //   // "treated": `${treatedNo}`,
    // };

    // var config = {
    //   method: 'post',
    //   url: CREATE_AGGREGATE_KEY,
    //   headers: {
    //     'Authorization': `Bearer ${userId}`
    //   },
    //   data: data
    // };

    // await axios.post(CREATE_AGGREGATE_KEY, {
    //   values,
    // })
    //   .then(function (response) {
    //     if (response.status === 200) {

    //       alert('Success!', 'Case Summary Information saved.', [{
    //         text: 'Okay', onPress: () => cancel(),
    //       }]);
    //       cancel();

    //     } else {

    //       console.log(response.status);
    //       alert('Failed to save Case Summary Information.', 'Please try again.', [{
    //         text: 'Okay', onPress: () => setCurrentStep(0),
    //       }]);
    //       setCurrentStep(0);
    //     }

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert('Failed to save Case Summary Information.', error + '\nPlease try again.', [{
    //       text: 'Okay', onPress: () => cancel(),
    //     }]);
    //     cancel()
    //   }).finally(() => { setIsLoading(false) })
  }

  const cancel = () => {
    //clear fields, back to home
    // clearState();
    navigation.navigate('Home');
    // navigation.goBack();
  };

  //-------------------------------------------------------------------------

  return (
    <View style={{ alignSelf: 'stretch' }}>
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

        <View style={[styles.action2, { height: 50, marginVertical: 10, width: '90%', alignSelf: 'center' }]} >
          <Picker style={{
            color: selectedIllness === '' ? '#A9A9A9' : '#000', height: '100%', width: '90%', fontSize: 18, fontWeight: '100',
            transform: [{ scaleX: 1.12 }, { scaleY: 1.12 }], left: '4%', position: 'absolute',
          }} selectedValue={selectedIllness}
            onValueChange={(itemValue, itemIndex) => setSelectedIllness(itemValue)} itemStyle={{ fontSize: 18 }} >
            <Picker.Item value="" label="Select Medical Illness" />
            <Picker.Item value="Malaria" label="Malaria" />
            <Picker.Item value="Covid" label="Covid" />
          </Picker>
        </View>

        <View style={[styles.action, { marginBottom: 10, width: '90%', alignSelf: 'center' }]}>
          <TextInput style={{ fontSize: 18, width: '80%' }} label="Suspected Infections" placeholder="Suspected Infections:"
            onChangeText={(val) => { setSuspectedNo(val); }} value={suspectedNo} keyboardType="numeric" />
        </View>

        <View style={[styles.action, { marginBottom: 10, width: '90%', alignSelf: 'center' }]}>
          <TextInput style={{ fontSize: 18, width: '80%' }} label="Tested Cases" placeholder="Tested Cases:"
            onChangeText={(val) => { setTestedNo(val); }} value={testedNo} keyboardType="numeric" />
        </View>

        <View style={[styles.action, { marginBottom: 10, width: '90%', alignSelf: 'center' }]}>
          <TextInput style={{ fontSize: 18, width: '80%' }} label="Confirmed" placeholder="Confirmed:"
            onChangeText={(val) => { setConfirmedNo(val); }} value={confirmedNo} keyboardType="numeric" />
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', padding: 5,
          paddingTop: 30, marginBottom: 10
        }}>
          <View style={{ width: 80, marginBottom: 10 }}>
            <Button rounded
              block
              style={styles.btn}
              color="red" title="Cancel" onPress={() => { cancel() }} />

          </View>
          <View style={{ width: 80, marginBottom: 10 }}>
            {!isLoading ? <Button title="Save"
              rounded
              block
              style={styles.btn}
              color="#FFB236"
              onPress={() => { onSubmit() }}
            >
            </Button>
              :
              <TouchableOpacity
                style={[, styles.btn, { alignItems: "center", padding: 10, backgroundColor: "#FFB236" }]}
                underlayColor='#FFB236'
              >
                <ActivityIndicator animating={isLoading} color="#fff" />
              </TouchableOpacity>}
          </View>
        </View>


      </ScrollView>
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
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
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