import React, { useState, useEffect, useRef, Fragment } from 'react';
import Wizard from 'react-native-wizard';
import { View, StyleSheet, Text, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler';
import { CREATE_AGGREGATE_KEY } from '../../env.json';
import { REPORT_LIST_KEY, REPORT_FIELDS_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { fetchChronicConditions } from '../model/data';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import { useController, useForm } from 'react-hook-form';
import { Checkbox as CheckboxP, List as ListP, TextInput } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

const AggregateForm = ({ route, navigation }) => {

  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');
  const [case_stats, setCase_Stats] = useState('');
  const [summaries_stats, setSummaries_Stats] = useState('');
  const [cookie, setUserCookie] = useState('');

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
  const [reportFieldNames, setReportFieldNames] = useState({});
  const [reportForm, setReportForm] = useState([]);

  // const form = useForm();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: route.params.dfs,
    mode: 'onChange',
  });

  const getReportFields = async () => {
    console.log("report.report_id ", report.report_id)

    let rprts = [];
    let config = {
      url: REPORT_FIELDS_KEY,
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: {
        "method": "getReportFields",
        "reportID": report.report_id
      }
    };
    console.log("config ", config)
    if (report.report_id !== null) {
      axios(config)
        .then(res => {
          console.log('report fields response: ', res)
          if (res.data.status == "500") {
            signOut()
          } else {
            setReportForm(res.data.data)
            // console.log('the form ...')
            // console.log(reportForm)
            var df = {}
            let rf = (res.data.data)
            rf.forEach(x => {
              let field = x.Name
              df[field] = ''
            })

            console.log("df", df)

            setReportFieldNames(df)
            
            // renderReportForm()
          }
        })
        .catch(function (error) {
          console.log("Report fields Error caught: " + error);
          // AsyncStorage.clear().then(() => {
          //   signOut()
          // });
        });
    }
    else {
      alert('select again')
    }
  };

  useEffect(() => {


    navigation.setOptions({
      title: report.report_name,
    });

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {

        } else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);
          getReportFields()
          console.log('fetching... ' + usr.cookie);
        }
      })
      .catch(err => console.log(err));
    // console.log("defaultValues: ", reportFieldNames)

    // form.setValue(reportFieldNames);
    // console.log("defaultValues form ", form.getValues())
    // console.log("reportFields ag", reportFields[0])
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

  // const onSubmit = handleSubmit(async (data) => {
  //   setIsLoading(true)
  //   console.log(data);

  //   setTimeout(() => {
  //     setIsLoading(false)
  //     alert("Case Summary Information saved.");
  //     // cancel()
  //   }, 1000);

  //   // var data = {
  //   //   "fromDate": `${fromDate}`,
  //   //   "toDate": `${toDate}`,
  //   //   "disease": `${selectedIllness}`,
  //   //   "suspected": `${suspectedNo}`,
  //   //   "tested": `${testedNo}`,
  //   //   "confirmed": `${confirmedNo}`,
  //   //   // "treated": `${treatedNo}`,
  //   // };

  //   // var config = {
  //   //   method: 'post',
  //   //   url: CREATE_AGGREGATE_KEY,
  //   //   headers: {
  //   //     'Authorization': `Bearer ${userId}`
  //   //   },
  //   //   data: data
  //   // };

  //   // await axios.post(CREATE_AGGREGATE_KEY, {
  //   //   values,
  //   // })
  //   //   .then(function (response) {
  //   //     if (response.status === 200) {

  //   //       alert('Success!', 'Case Summary Information saved.', [{
  //   //         text: 'Okay', onPress: () => cancel(),
  //   //       }]);
  //   //       cancel();

  //   //     } else {

  //   //       console.log(response.status);
  //   //       alert('Failed to save Case Summary Information.', 'Please try again.', [{
  //   //         text: 'Okay', onPress: () => setCurrentStep(0),
  //   //       }]);
  //   //       setCurrentStep(0);
  //   //     }

  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //     alert('Failed to save Case Summary Information.', error + '\nPlease try again.', [{
  //   //       text: 'Okay', onPress: () => cancel(),
  //   //     }]);
  //   //     cancel()
  //   //   }).finally(() => { setIsLoading(false) })
  // })

  const cancel = () => {
    //clear fields, back to home
    // clearState();
    // navigation.navigate('Home');
    navigation.goBack();
  };

  const renderReportForm = () => {

    if (reportForm.length == 0) {

      return null
    } else {

      // console.log(" .....jjdjd...")
      // console.log(reportForm)

      // let newForm = {}
      var outterArray = [];
       reportForm.forEach(field => {
        let newfield = {}
        newfield["name"] = field.Name
        newfield["label"] = field.Name
        // console.log("the type is: ", field.data.length)
        if(field.data.length == 1){
          newfield["type"] = "text"
        }
        else{
          newfield["type"] = "select"
          let options = []
          field.data.forEach(option => {
            let newOption = {"label": option.dataLabel, "value": option.varID}
            options.push(newOption)
          })
          // console.log("the options are: ", options)
          newfield["options"] = options
        }

        outterArray.push(newfield)

        // console.log(outterArray)

      })
      // console.log("final form: ")
      // console.log(outterArray)

      return outterArray
      // return reports.map((report) => {
      //   return <Picker.item label={report.report_name} value={report} key={report.report_id} />
      // })
    }
  }

  //-------------------------------------------------------------------------

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}>

        {(reportForm.length == 0) ? null :
        // null
          <FormBuilder
            control={control}
            setFocus={setFocus}
            // defaultValues={reportFieldNames}
            formConfigArray={renderReportForm()}
          />
          }
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
    </>
  );

};

export default AggregateForm;

const styles = StyleSheet.create({
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