import React, { useRef, useState, useCallback, useEffect } from "react";
import Wizard from "react-native-wizard";
import { useRoute } from '@react-navigation/native';
import { BackHandler, Switch, SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Collapsible from 'react-native-collapsible';
import CustomMultiPicker from "react-native-multiple-select-list";
// import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from 'react-native-vector-icons/Ionicons';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { Checkbox, Divider, Badge } from 'react-native-paper';


const Results = ({ route, navigation }) => {

    // // inital state of disease list view
    // const [isToggled, setIsToggled] = useState(true);
    // const toggle = useCallback(() => setIsToggled(!isToggled));

    // var resList = [];

    // // const [resList, setResListSelected] = useState([]);
    // // const onResListChange = useCallback(resList => {
    // //     setResListSelected({ resList });
    // // })

    const [selectedItems, setSelected] = useState([]);
    const onSelectedItemsChange = useCallback(selectedItems => {
        setSelected({ selectedItems });
    })

    const userList = {
        "123": "Malaria",
        "124": "Covid",
        "125": "Pheumonia"
    };

    // // inital state of fatal result view
    // const [isToggled2, setIsToggled2] = useState(true);
    // const toggle2 = useCallback(() => setIsToggled2(!isToggled2));

    // // inital state of patient status result view
    // const [isToggled3, setIsToggled3] = useState(true);
    // const toggle3 = useCallback(() => setIsToggled3(!isToggled3));

    // const [caseStatus, setCaseStatus] = useState('');

    const saveResults = () => {

        // if fatal, save to blockchain ..maybe
        // else save to db

        //prompt user to
        // a. review case .. return to step one
        // wizard.current.goTo(0)
        // b. return to home screen
        navigation.navigate('Home');
    }

    //the wizard initial state
    const wizard = useRef();
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);



    const [vname, setName] = useState('');
    const [vdisease, setDisease] = useState('');
    const [vstatus, setStatus] = useState('');
    const [vgender, setGender] = useState('');

    const { name } = route.params ?? {};
    const { disease } = route.params ?? {};
    const { status } = route.params ?? {};
    const { gender } = route.params ?? {};

    useEffect(() => {
        console.log("case res ...:")
        if (typeof name !== 'undefined') {
            setName(name);
        }
        if (typeof disease !== 'undefined') {
            setDisease(disease);
        }
        if (typeof status !== 'undefined') {
            setStatus(status);
        }
        if (typeof gender !== 'undefined') {
            setGender(gender);
        }

        return () => {navigation.navigate('Home');}
    }, [name, disease, status, gender]);

    const saveCase = () => {
        navigation.navigate('Home');
    };

    const cancel = () => {
        //clear fields, back to home
        clearState();
        navigation.navigate("Home");
    };

    const clearState = () => {
        setIsNINAvailable(false); setFName(''); setLName(''); setDob(''); setIDNum(''); setSymptoms('');
        setIDType(''); setGender('');
        data.isValidNIN = data.isValidSymptoms = data.isValidLName = data.isValidFName = data.isValidGender = data.isValidDob = true;
    };

    //list of all views in steps
    const stepList = [
        {
            content:
                <View style={styles.container} >
                    <View style={[styles.content, {}]}>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ paddingHorizontal: 20, fontWeight: "bold" }}>
                                {"Update Patient'\s Details".toUpperCase()}
                            </Text>
                        </View>

                        <Divider />
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Text style={{ fontSize: 16 }}>{vname}</Text>
                            <Text>{vgender}</Text>
                            <View style={{ borderRadius: 5 }}>
                                <Badge style={{ backgroundColor: "#FFB236", paddingLeft: 10, paddingRight: 10, fontSize: 13 }}>{vstatus}</Badge>
                            </View>
                        </View>
                        <Text >Presented with headache, loss of appetite, temperature of 101, persisting over a couple of days.
                        No underlying illnesses mentioned.
                        </Text>
                        <View style={styles.action2}>
                            <Picker label="Case Status" style={{ color: "#808080", padding: 0 }} placeholder="Select Status" onValueChange={(val) => setCaseStatus(val)}
                                selectedValue={status}>
                                <Picker.Item value="" label="Update Status" />
                                <Picker.Item value="Pending" label="Pending" />
                                <Picker.Item value="Closed" label="Closed" />
                                <Picker.Item value="Comfirmed" label="Comfirmed" />
                                <Picker.Item value="Deceased" label="Deceased" />
                            </Picker>
                        </View>
                        <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ButtonF color="#FFB236"
                                outline transparent onPress={() => 
                                    navigation.navigate("Home")
                                } >
                                <IconF name="arrow-back"></IconF>
                                <TextF >{'BACK'}</TextF>
                            </ButtonF>
                            <View style={{ width: 80, marginTop: 20 }}>
                                <Button rounded
                                    block
                                    style={styles.btn}
                                    color="#FFB236" title="Next" onPress={() => wizard.current.next()} /></View>
                        </View>
                    </View>

                </View>,
        },
        {
            content:
                <View style={styles.container} >
                    <View style={[styles.content, {}]}>
                        <View style={{ width: "30%", height: "15%" }}>
                            <ButtonF color="#FFB236"
                                outline transparent onPress={() => wizard.current.prev()} >
                                <IconF name="arrow-back"></IconF>
                                <TextF >{'BACK'}</TextF>
                            </ButtonF>
                        </View>

                        <CustomMultiPicker
                            options={userList}
                            // search={true} // should show search bar?
                            multiple={true} //
                            placeholder={"Search Disease"}
                            placeholderTextColor={'#55A7FF'}
                            returnValue={"label"} // label or value
                            callback={(res) => {
                                // console.log(res); resList.push({ title: "l", primaryColor: "#55A7FF" });
                                // console.log(resList)
                            }
                            } // callback, array of selected items
                            rowBackgroundColor={"#eee"}
                            rowHeight={40}
                            rowRadius={5}
                            // searchIconName="ios-search"
                            // searchIconColor="red"
                            // searchIconSize={30}
                            iconColor={"#55A7FF"}
                            iconSize={30}
                            selectedIconName={"ios-checkmark-circle-outline"}
                            // unselectedIconName={"ios-radio-button-off-outline"}
                            scrollViewHeight={'40%'}
                            selected={[vdisease]} // list of options which are selected by default
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 80 }}>
                                <Button rounded
                                    block
                                    style={styles.btn}
                                    color="red" title="Cancel" onPress={() => { clearState(); alert("Canceled!") }} />

                            </View>
                            <View style={{ width: 80 }}>
                                <Button title="Save"
                                    rounded
                                    block
                                    style={styles.btn}
                                    color="#FFB236"
                                    onPress={() => { saveCase() }}
                                >
                                </Button>
                            </View>
                        </View>
                    </View>

                </View>,
        }
    ];


    return (
        // wizard setup 
        <View style={{ justifyContent: "space-around", paddingTop: 10, backgroundColor: "#F3F6F9" }}>
            <SafeAreaView style={{}}>

                <View style={{ flexDirection: "row", margin: 18, alignSelf: "center" }}>
                    {stepList.map((val, index) => (
                        <View
                            key={"step-indicator-" + index}
                            style={{
                                width: 10,
                                marginHorizontal: 6,
                                height: 10,
                                borderRadius: 2,
                                backgroundColor: index === currentStep ? "#fc0" : "#000",
                            }}
                        />
                    ))}
                </View>

            </SafeAreaView>
            <View style={{}}>
                <Wizard
                    ref={wizard}
                    steps={stepList}
                    // activeStep={0}
                    isFirstStep={val => setIsFirstStep(val)}
                    isLastStep={val => setIsLastStep(val)}
                    onNext={() => {
                    }}
                    onPrev={() => {
                    }}
                    currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                        setCurrentStep(currentStep)
                    }}
                />
            </View>
        </View>
    );
};

export default Results;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        width: "100%", height: "100%",
        // marginTop: 10,
        // padding: 5,
        backgroundColor: "#F3F6F9"
    },
    action: {
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    action2: {
        // paddingTop: 5,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
    },
    action3: {
        paddingTop: 5,
    },
    btn: {
        alignItems: 'center',
        marginTop: 10
    },
    text: {
        alignItems: 'center',
        marginTop: 15,
    },
    header: {
        // backgroundColor: '#55A7FF',
        // padding: 10,
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 10,

    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        padding: 10,
        margin: 10,
        height: "80%",
        justifyContent: "space-around",

    },
    btnDate: {

    },
    errorMsg: {
        color: '#FF0000',
        // fontSize: 14,
    }
});