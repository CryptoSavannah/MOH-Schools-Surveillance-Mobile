import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, SafeAreaView, Button, Picker } from 'react-native';
import {
    FormInput,
} from "@99xt/first-born";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { Checkbox, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { CREATE_PATIENT_KEY } from '../../env.json';

const AddNew = ({ route, navigation }) => {


    useEffect(() => {


    });

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                const popAction = StackActions.pop(1);
                navigation.dispatch(popAction);
                // console.log("cleaned up");
              };
        }, [])
      );



    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [idType, setIDType] = useState('');
    const [idNum, setIDNum] = useState('');

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
            setDob((date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear())

        }

    };

    const onSelectedItemsChange = selectedItems => {
        setSelectedItems(selectedItems);
    };

    // some validation variables
    const [data, setData] = React.useState({
        isValidNIN: true,

        isValidFName: true,
        isValidLName: true,
        isValidGender: true,
        isValidDob: true,
    });

    //helper method
    const removeSpaces = (string) => {
        return string.split(' ').join('');
    };

    const saveCase = () => {

        // if (isNINAvailable) {
        //   data.isValidNIN = !(removeSpaces(idNum) === "");

        //   //step 1. check for required fields: idNum
        //   if (!(removeSpaces(idType) === "") && data.isValidNIN) {

        //     JSHash(idNum, CONSTANTS.HashAlgorithms.sha256)
        //       .then(hash => console.log(hash))
        //       .catch(
        //         // e => console.log(e)
        //         );

        //     alert("Case has been Recorded");

        //     clearState();
        //   } else {
        //     alert("Fill in all the fields");
        //   }

        // } else {

        //step 1. check for required fields: fname, lname, gender, dob
        data.isValidFName = !(removeSpaces(fname) === "");
        data.isValidLName = !(removeSpaces(lname) === "");
        data.isValidGender = !(removeSpaces(gender) === "");
        data.isValidDob = !(removeSpaces(dob) === "");

        if (data.isValidFName && data.isValidLName && data.isValidGender && data.isValidDob) {
            var stdID = fname + lname + dob + gender;
            JSHash(stdID, CONSTANTS.HashAlgorithms.sha256)
                .then(hash => {
                    console.log(hash);
                    //save patient
                })
                .catch(
                    // e => console.log(e)
                );

            alert("Case has been Recorded");

            clearState();
        }
        else {
            alert("Fill in all the fields");
        }
        // }
    };

    const cancel = () => {
        //clear fields, back to home
        clearState();
        navigation.navigate("Home");
    };

    const clearState = () => {
        setFName(''); setLName(''); setDob(''); setIDNum('');
        setIDType(''); setGender('');
        data.isValidNIN = data.isValidLName = data.isValidFName = data.isValidGender = data.isValidDob = true;
    };


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{ alignSelf: "center" }}>
                    <Text style={{ paddingHorizontal: 20, fontWeight: "bold" }}>
                        {"Enter The Patient's Details:".toUpperCase()}
                    </Text></View>

                <Divider style={{ marginVertical: 5 }} />

                <ScrollView>
                    <View style={styles.action}>
                        <TextInput style={{ fontSize: 16, width: '100%' }} label="First name" placeholder="First name" onChangeText={(val) => { setFName(val) }}
                            value={fname} />
                    </View>
                    <View style={styles.action}>
                        <TextInput style={{ fontSize: 16, width: '100%' }} label="Last name" placeholder="Last name" onChangeText={(val) => { setLName(val); }}
                            value={lname} />
                    </View>
                    <View style={styles.action2} >
                        <Picker label="Gender" style={{ color: "#808080", padding: 0, width: '100%' }} placeholder="Gender" onValueChange={(val) => { setGender(val) }}
                            selectedValue={gender}>
                            <Picker.Item value="" label="Select Gender" />
                            <Picker.Item value="Male" label="Male" />
                            <Picker.Item value="Female" label="Female" />
                        </Picker>
                    </View>
                    <View style={styles.action}>
                        {/* <Text styles={{ color: "#dedede" }}>Date of Birth:</Text> */}
                        <TextInput style={{ fontSize: 16, width: '100%' }} onFocus={showDatePicker} onKeyPress={showDatePicker} label="Date of Birth" placeholder="Enter Date of Birth"
                            value={dob == '' ? '' : `Date of Birth:  ${dob}`} showSoftInputOnFocus={false} />
                        {/* <Text  style={{ width: "80%", paddingLeft: 5 }}>{dob !== ('') ?  : ""}</Text> */}
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <View style={styles.action2}>
                        <Picker label="ID Type" style={{ color: "#808080", padding: 0, width: '100%' }} placeholder="ID Type" onValueChange={(val) => setIDType(val)}
                            selectedValue={idType}>
                            <Picker.Item value="" label="ID Type" />
                            <Picker.Item value="NIN" label="NIN" />
                            <Picker.Item value="Birth Certificate" label="Birth Certificate" />
                            <Picker.Item value="Passport" label="Passport" />
                        </Picker>
                    </View>
                    <View style={styles.action}>
                        <TextInput style={{ fontSize: 16, width: '100%' }} label="ID Number" placeholder="ID Number" onChangeText={(val) => setIDNum(val)} value={idNum} />
                    </View>
                    <View style={{ width: '50%', alignSelf: 'center', paddingTop: 30, marginBottom: 10 }}>
                        <Button title="Save"
                            rounded
                            block
                            style={styles.btn}
                            color="#FFB236"
                            onPress={() => { saveCase() }}
                        >
                        </Button>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default AddNew;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        width: "100%", height: "100%",
        // marginTop: 10,
        paddingHorizontal: 20,
        // backgroundColor: "#F3F6F9"
    },
    action: {
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    action2: {
        paddingTop: 5,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
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

    }
});
