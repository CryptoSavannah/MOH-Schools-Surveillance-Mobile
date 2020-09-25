import React, { useRef, useState, useCallback } from "react";
import Wizard from "react-native-wizard";

import { SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Collapsible from 'react-native-collapsible';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CaseSteps = ({ navigation }) => {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [idType, setIDType] = useState('');
  const [idNum, setIDNum] = useState('');

  const [studentDob] = useState("");
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

    setDob(e);
    // alert(e);
    data.theDob = e.toString();

  };

  const handleDateChange = (e) => {
    //format date

    setDob(e);
    // alert(e);

    if (true) {
      data.isValidFName = removeSpaces(fname) === "";
      data.isValidLName = removeSpaces(lname) === "";
      data.isValidGender = removeSpaces(gender) === "";
      // data.isValidDob = removeSpaces(e) === "";
    }
  };


  const saveStudent = (fname, lname, gender, dob, idType, idNum) => {
    // alert(fname + lname + gender + dob + idType + idNum);
    // setIsFirstStep(1);
    // navigation.navigate("CaseDetails");
    // setCurrentStep();
    // wizard.current.next()
    wizard.current.next();
  };

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

  const [data, setData] = React.useState({
    theDob: "",
    isValidFName: true,
    isValidLName: true,
    isValidGender: true,
    isValidDob: true,
    hasResult: false,
  });

  const removeSpaces = (string) => {
    return string.split(' ').join('');
  };

  const stepList = [
    {
      content:
        <View style={styles.container} >
          <View>
            <Text>Enter Patient's Details</Text>
          </View>
          <View style={styles.action}>
            <TextInput label="First name" placeholder="First name" onChangeText={(val) => {
              setFName(val)
            }} />
          </View>
          {data.isValidFName ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid First name.</Text>
            </Animatable.View>
          }
          <View style={styles.action}>
            <TextInput label="Last name" placeholder="Last name" onChangeText={(val) => {
              setLName(val);

            }} />
          </View>
          {data.isValidFName ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Last name.</Text>
            </Animatable.View>
          }
          <View style={styles.action2} >
            <Picker label="Gender" style={{ color: "#dedede", padding: 0 }} placeholder="Gender" onValueChange={(val) => { setGender(val) }}
              selectedValue={gender}>
              <Picker.Item value="" label="Select Gender" />
              <Picker.Item value="Male" label="Male" />
              <Picker.Item value="Female" label="Female" />
            </Picker>
          </View>
          <View style={styles.action}>
            <Button title="Select Date of Birth" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {/* {data.theDob === "" ? null :
              <Text value="dob">{data.theDob}.</Text>
          } */}
          </View>
          <View style={{ alignItems: 'flex-end'}}>
            <View style={{ width: 80, marginTop: 20}}><Button width="80" title="Next" onPress={() => wizard.current.next()} /></View>
          </View>
        </View>,
    },
    {
      content: <View style={styles.container} >
        <View style={styles.action2}>
          <Picker label="ID Type" style={{ color: "#dedede", padding: 0 }} placeholder="ID Type" onValueChange={(val) => setIDType(val)}
            selectedValue={idType}>
            <Picker.Item value="" label="ID Type" />
            <Picker.Item value="NIN" label="NIN" />
            <Picker.Item value="Birth Certificate" label="Birth Certificate" />
            <Picker.Item value="Passport" label="Passport" />
          </Picker>
        </View>
        <View style={styles.action}>
          <TextInput label="ID Number" placeholder="ID Number" onChangeText={(val) => setIDNum(val)} />
        </View>
        <View style={styles.action}>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Describe the patient'\s symptoms"}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10 }}>
          <View style={{ width: 80 }}>
            <Button title="Prev" onPress={() => wizard.current.prev()} />
          </View>
          <View style={{ width: 80 }}>
            <Button title="Save"
              rounded
              // block
              style={styles.btn}
              onPress={() => {
                saveStudent(fname, lname, gender, dob, idType, idNum)
              }}
            >
              {/* <Icon name="briefcase" /> */}
              {/* <Text>{'Save'}</Text> */}
            </Button>
          </View>
        </View>
      </View>,
    },
    // {
    //   content:
    //     <View style={styles.container} >
    //       <View style={styles.action}>
    //         <TextInput
    //           style={styles.TextInputStyleClass}
    //           underlineColorAndroid="transparent"
    //           placeholder={"Describe the patient'\s symptoms"}
    //           placeholderTextColor={"#9E9E9E"}
    //           numberOfLines={10}
    //           multiline={true}
    //         />
    //       </View>
    //       <View>
    //         <Button title="Save"
    //           rounded
    //           // block
    //           style={styles.btn}
    //           color="#bc9151"
    //           onPress={() => {
    //             saveStudent(fname, lname, gender, dob, idType, idNum)
    //           }}
    //         >
    //           {/* <Icon name="briefcase" /> */}
    //           {/* <Text>{'Save'}</Text> */}
    //         </Button>
    //       </View>
    //     </View>,
    // },
    {
      content:
        <View style={{
          width: 350, height: 550,
          marginTop: 10,
        }} >
          <Text style={{ padding: 20 }}>Update case with medical results. </Text>

          <ScrollView>
            <TouchableOpacity onPress={toggle} style={{ marginBottom: 10 }}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Click here to update Disease </Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={isToggled} align="center" >
              <View style={styles.content}>
                <CustomMultiPicker
                  options={userList}
                  search={true} // should show search bar?
                  multiple={true} //
                  placeholder={"Search Disease"}
                  placeholderTextColor={'#F5FCFF'}
                  returnValue={"label"} // label or value
                  callback={(res) => { }} // callback, array of selected items
                  rowBackgroundColor={"#eee"}
                  rowHeight={40}
                  rowRadius={5}
                  // searchIconName="ios-checkmark"
                  searchIconColor="red"
                  searchIconSize={30}
                  iconColor={"#F5FCFF"}
                  iconSize={30}
                  // selectedIconName={"ios-checkmark-circle-outline"}
                  // unselectedIconName={"ios-radio-button-off-outline"}
                  scrollViewHeight={130}
                  selected={[]} // list of options which are selected by default
                />
              </View>
            </Collapsible>
            <View style={{
              padding: 20, borderBottomColor: "#dedede",
              borderBottomWidth: 1,
              paddingBottom: 10, flexDirection: "row"
            }}>
              <TextInput
                style={styles.TextInputStyleClass}
                underlineColorAndroid="transparent"
                placeholder={"Description"}
                placeholderTextColor={"#9E9E9E"}
                numberOfLines={3}
                multiline={true}
              />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', padding: 10 }}>
              <View style={{ width: 80 }}>
                <Button title="Prev" onPress={() => wizard.current.prev()} />
              </View>
              <View style={{ width: 80 }}>
                <Button rounded title="Save"
                  onPress={() => { wizard.current.goTo(0) }} >
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>,
    },
  ];





  //required fields******************************************************************


  return (
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
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text style={{ alignSelf: "center" }}>Step {currentStep + 1}</Text>
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
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
    backgroundColor: '#F5FCFF',
    padding: 10,
    marginTop: 10

  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  btnDate: {

  }
});