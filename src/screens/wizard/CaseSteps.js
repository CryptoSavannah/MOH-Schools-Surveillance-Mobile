import React, { useRef, useState, useCallback, useEffect } from "react";
import Wizard from "react-native-wizard";

import { BackHandler, Switch, SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Collapsible from 'react-native-collapsible';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from 'react-native-vector-icons/Ionicons';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
// import { sha256 } from 'react-native-sha256';


const CaseSteps = ({ navigation }) => {

  //the wizard initial state
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  //fields initial state
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [idType, setIDType] = useState('');
  const [idNum, setIDNum] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (e) => {
    hideDatePicker();
    //format date
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDob('')
    }
    else {
      setDob((date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear())

    }

  };

  const handleDateChange = (e) => {

    setDob(e);

  };

  // inital state of disease list view
  const [isToggled, setIsToggled] = useState(true);
  const toggle = useCallback(() => setIsToggled(!isToggled));

  const [selectedItems, setSelected] = useState([]);
  const onSelectedItemsChange = useCallback(selectedItems => {
    setSelected({ selectedItems });
  })

  const userList = {
    "123": "Malaria",
    "124": "Covid",
    "125": "Pheumonia"
  }

  // inital state of fatal result view
  const [isToggled2, setIsToggled2] = useState(true);
  const toggle2 = useCallback(() => setIsToggled2(!isToggled2));

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // inital state of patient status result view
  const [isToggled3, setIsToggled3] = useState(true);
  const toggle3 = useCallback(() => setIsToggled3(!isToggled3));

  // some validation variables
  const [data, setData] = React.useState({
    isValidFName: true,
    isValidLName: true,
    isValidGender: true,
    isValidDob: true,
  });

  //helper method
  const removeSpaces = (string) => {
    return string.split(' ').join('');
  };



  //SUBMIT METHODS
  const submit = () => {
    //step 1. check for required fields: fname, lname, gender, dob
    data.isValidFName = !(removeSpaces(fname) === "");
    data.isValidLName = !(removeSpaces(lname) === "");
    data.isValidGender = !(removeSpaces(gender) === "");
    data.isValidDob = !(removeSpaces(dob) === "");

    if (data.isValidFName && data.isValidLName && data.isValidGender && data.isValidDob) {
      wizard.current.next();

    }
    else {
      alert("Fill in all the fields");
    }
  }
  //save case
  const saveStudent = () => {
    data.isValidFName = data.isValidLName = data.isValidGender = data.isValidDob = true;

    var stdID = fname + lname + gender + dob;
    console.log(stdID);

    // var obj = null;
    // sha256(stdID).then(hash => {
    //   // console.log(hash);
    //   // var obj = JSON.parse(`{ "hash":${hash}, "idType":${idType}, "idNum":${idNum}`); 
    //   // console.log(obj);
    // })


    //step 2. if hash already exits, 
    //        a. if symptoms are the same, update results in localstorage
    //        b. else send new case to the block chain and update symptoms in localstorage
    // else if hash is different, send new case to block chain, save symptoms in localstorage, update results


    //updating Results
    //        Prompt user to  
    //              a. move to next step if results are ready/ changed
    //                  load selected items for that case if exists
    wizard.current.next();
    //              b. else cancel and return to home screen

  };

  // save case result 
  const saveResults = (selectedItems, fatalBool, patientStatus) => {

    // if fatal, save to blockchain ..maybe
    // else save to db

    //prompt user to
    // a. review case .. return to step one
    wizard.current.goTo(0);
    // b. return to home screen
  }

  //list of all views in steps
  const stepList = [
    {
      content:
        <View style={styles.container} >
          <View style={{ paddingBottom: 10 }}><Text>{"Enter Patient'\s Details".toUpperCase()}</Text></View>
          <View style={styles.action}>
            <TextInput label="First name" placeholder="First name" onChangeText={(val) => { setFName(val) }}
              value={fname} />
          </View>
          {/* {data.isValidFName ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid First name.</Text>
            </Animatable.View>
          } */}
          <View style={styles.action}>
            <TextInput label="Last name" placeholder="Last name" onChangeText={(val) => { setLName(val); }}
              value={lname} />
          </View>
          {/* {data.isValidLName ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Last name.</Text>
            </Animatable.View>
          } */}
          <View style={styles.action2} >
            <Picker label="Gender" style={{ color: "#808080", padding: 0 }} placeholder="Gender" onValueChange={(val) => { setGender(val) }}
              selectedValue={gender}>
              <Picker.Item value="" label="Select Gender" />
              <Picker.Item value="Male" label="Male" />
              <Picker.Item value="Female" label="Female" />
            </Picker>
          </View>
          {/* {data.isValidGender ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>This field is required.</Text>
            </Animatable.View>
          } */}
          {/* <View style={styles.action}> */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.action}>
              <Text styles={{ color: "#dedede" }}>Date of Birth:</Text>
              <Text style={{ width: 80, paddingLeft: 5 }}>{dob !== ('') ? dob : ""}</Text>
            </View>
            <View>
              <ButtonF
                color="#808080"
                onPress={showDatePicker}
              >
                <IconF name="calendar" />
                <TextF>{'Select Date'}</TextF>
              </ButtonF>
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {/* </View> */}
          {/* {data.isValidDob ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Date.</Text>
            </Animatable.View>
          } */}
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginTop: 20 }}>
              <Button rounded
                block
                style={styles.btn}
                color="#bc9151" title="Next" onPress={() => submit()} /></View>
          </View>
        </View>,
    },
    {
      content: <View style={styles.container} >
        <Text style={{ paddingBottom: 10 }}>{'Patient Identification:'.toUpperCase()} </Text>

        <View style={styles.action2}>
          <Picker label="ID Type" style={{ color: "#808080", padding: 0 }} placeholder="ID Type" onValueChange={(val) => setIDType(val)}
            selectedValue={idType}>
            <Picker.Item value="" label="ID Type" />
            <Picker.Item value="NIN" label="NIN" />
            <Picker.Item value="Birth Certificate" label="Birth Certificate" />
            <Picker.Item value="Passport" label="Passport" />
          </Picker>
        </View>
        <View style={styles.action}>
          <TextInput label="ID Number" placeholder="ID Number" onChangeText={(val) => setIDNum(val)} value={idNum} />
        </View>
        <View style={styles.action}>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Describe the patient'\s symptoms"}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onValueChange={(val) => setSymptoms(val)}
            // value={symptoms}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10 }}>
          <View style={{ width: 80 }}>
            <Button rounded
              block
              style={styles.btn}
              color="#bc9151" title="Prev" onPress={() => wizard.current.prev()} />
          </View>
          <View style={{ width: 80 }}>
            <Button title="Save"
              rounded
              block
              style={styles.btn}
              color="#bc9151"
              onPress={() => {saveStudent()}}
            >
            </Button>
          </View>
        </View>
      </View>,
    },
    {
      content:
        <View style={{ justifyContent: "center", width: 350, height: 550 }} >
          <Text style={{ paddingLeft: 20, paddingBottom: 20 }} >{'Patient medical results:'.toUpperCase()} </Text>

          {/* <ScrollView> */}

          <TouchableOpacity onPress={toggle} style={{ marginBottom: 15 }}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Update Disease &nbsp;
                <Icon name="ios-arrow-forward" /></Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isToggled} align="center" >
            <View style={styles.content}>
              <CustomMultiPicker
                options={userList}
                search={true} // should show search bar?
                multiple={true} //
                placeholder={"Search Disease"}
                placeholderTextColor={'#55A7FF'}
                returnValue={"label"} // label or value
                callback={(res) => { }} // callback, array of selected items
                rowBackgroundColor={"#eee"}
                rowHeight={40}
                rowRadius={5}
                searchIconName="ios-checkmark-circle"
                // searchIconColor="red"
                searchIconSize={30}
                iconColor={"#55A7FF"}
                iconSize={30}
                selectedIconName={"ios-checkmark-circle"}
                // unselectedIconName={"ios-radio-button-off"}
                scrollViewHeight={130}
                selected={selectedItems} // list of options which are selected by default
              />
            </View>
          </Collapsible>


          <TouchableOpacity onPress={toggle2} style={{ marginBottom: 15 }}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Record Fatal Case &nbsp;
                <Icon name="ios-arrow-forward" /></Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isToggled2} align="center" >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </Collapsible>


          <TouchableOpacity onPress={toggle3} style={{ marginBottom: 15 }}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Patient Status &nbsp;
                <Icon name="ios-arrow-forward" /></Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isToggled3} align="center" >
            <View style={{
              padding: 20, borderBottomColor: "#dedede",
              borderBottomWidth: 1,
              paddingBottom: 10, flexDirection: "row"
            }}>
              <TextInput
                style={styles.TextInputStyleClass}
                underlineColorAndroid="transparent"
                placeholder={"Enter after care description of patient's status"}
                placeholderTextColor={"#9E9E9E"}
                numberOfLines={3}
                multiline={true}
              />
            </View>
          </Collapsible>


          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', padding: 10 }}>
            <View style={{ width: 80 }}>
              <Button rounded
                block
                style={styles.btn}
                color="#bc9151" title="Prev" onPress={() => wizard.current.prev()} />
            </View>
            <View style={{ width: 80 }}>
              <Button rounded
                block
                style={styles.btn}
                color="#bc9151" title="Save"
                onPress={saveResults} >
              </Button>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>,
    },
  ];


  return (
    // wizard setup 
    <View>
      <SafeAreaView style={{ backgroundColor: "#FFF" }}>
        {/* <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
            padding: 10
          }}>
          <Button rounded
                            block
                            style={styles.btn}
                            color="#bc9151" disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text style={{ alignSelf: "center" }}>Step {currentStep + 1}</Text>
          <Button rounded
                            block
                            style={styles.btn}
                            color="#bc9151" disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View> */}
      </SafeAreaView>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Wizard
          ref={wizard}
          steps={stepList}
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
            setCurrentStep(currentStep)
          }}
        />
        {/* <View style={{ flexDirection: "row", margin: 18 }}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? "#fc0" : "#000",
              }}
            />
          ))}
        </View> */}
      </View>
    </View>
  );
};

export default CaseSteps;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    width: 350, height: 450,
    marginTop: 10,
    padding: 20,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 15,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  action2: {
    paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  btn: {
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDob: {
    alignItems: 'center',
    marginLeft: 0
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    // height: 150

  },
  TextInputStyleClass2: {
    textAlign: 'center',
    height: 30,
    height: 80,
    paddingLeft: 20

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
  header: {
    // backgroundColor: '#55A7FF',
    // padding: 10,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,

  },
  headerText: {
    // textAlign: 'center',
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#55A7FF'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  btnDate: {

  },
  errorMsg: {
    color: '#FF0000',
    // fontSize: 14,
  }
});