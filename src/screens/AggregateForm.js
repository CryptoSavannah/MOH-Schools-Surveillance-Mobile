import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, Text, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler';
import { CREATE_AGGREGATE_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { fetchChronicConditions } from '../model/data';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import { useController, useForm } from 'react-hook-form';
import { Checkbox as CheckboxP, List as ListP, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

const AggregateForm = ({route, navigation}) => {

  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');
  const [case_stats, setCase_Stats] = useState('');
  const [summaries_stats, setSummaries_Stats] = useState('');
  // const stdRef = useRef(null);

  const { report } = route.params ?? {};

  let values = {};
  const [isLoading, setIsLoading] = useState(false);

  const [conditions, setConditions] = useState([]);
  const [selectedIllness, setSelectedIllness] = useState('');
  const [selectedConditions, setSelectedConditions] = useState([]);

  // const [suspectedNo, setSuspectedNo] = useState('');
  // const [testedNo, setTestedNo] = useState('');
  // const [confirmedNo, setConfirmedNo] = useState('');
  const [casesNo, setCasesNo] = useState('');
  const [treatedNo, setTreatedNo] = useState('');
  const [deceasedNo, setDeceasedNo] = useState('');
  const [healedNo, setHealedNo] = useState('');
  const [selectedItemIndex, updateSelectedItem] = useState('');
  const [otherMedicalCondition, setOtherMedicalCondition] = useState('');

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      chronic_condition: '',
      cases_num: '',
      treated_num: '',
      healed_num: '',
      deceased_num: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if(report){
      console.log(report)
    }
    // retrieveUserId();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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

    AsyncStorage.getItem('summaries_stats')
      .then(the_summaries_stats => {
        if (the_summaries_stats !== null) {
          setSummaries_Stats(the_summaries_stats);
        }
      })
      .catch(err => console.log(`summaries_stats error just: `, err));

  }, [])

  const dateReverseFormat = (str) => {
    let str2 = str.split("-")
    return (str2[1] + '/' + str2[2] + '/' + str2[0])
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    console.log(data);

    setTimeout(() => {
      setIsLoading(false)
      alert("Case Summary Information saved.");
      // cancel()
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
  })

  const cancel = () => {
    //clear fields, back to home
    // clearState();
    // navigation.navigate('Home');
    navigation.goBack();
  };

  //-------------------------------------------------------------------------

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <View style={[styles.container]}>
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>
            {report.report_name}: 
             </Text>

             <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
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
                {
                  name: 'cases_num',
                  type: 'text',
                  textInputProps: {
                    label: 'Number of Cases',
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Number of cases is required',
                    },
                  },
                },
                {
                  name: 'treated_num',
                  type: 'text',
                  textInputProps: {
                    label: 'Number of treated',
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Number of treated is required',
                    },
                  },
                },
                {
                  name: 'healed_num',
                  type: 'text',
                  textInputProps: {
                    label: 'Number of healed',
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Number of healed is required',
                    },
                  },
                },
                {
                  name: 'deceased_num',
                  type: 'text',
                  textInputProps: {
                    label: 'Number of deceased',
                  },
                  rules: {
                    required: {
                      value: true,
                      message: 'Number of deceased is required',
                    },
                  },
                },
              ]}
            />
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            paddingTop: 30, marginBottom: 10
          }}>
            <View style={{ width: 80, marginBottom: 10 }}>
              <Button rounded
                block
                style={styles.btn}
                color="grey" title="Cancel" onPress={() => { cancel() }} />

            </View>
            <View style={{ width: 80, marginBottom: 10 }}>
              {!isLoading ? <Button title="Save"
                rounded
                block
                style={styles.btn}
                color="rgba(3, 136, 229, 1)"
                onPress={() => { onSubmit() }}
              >
              </Button>
                :
                <TouchableOpacity
                  style={[, styles.btn, { alignItems: "center", padding: 10, backgroundColor: "rgba(3, 136, 229, 1)" }]}
                  underlayColor='rgba(3, 136, 229, 1)'
                >
                  <ActivityIndicator animating={isLoading} color="#fff" />
                </TouchableOpacity>}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );

};

export default AggregateForm;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    width: "100%", height: "100%",
    // marginTop: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#F3F6F9"
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