import React, { useRef, useState, useCallback, useEffect } from "react";
import { SafeAreaView, Button, View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Collapsible from 'react-native-collapsible';
import CustomMultiPicker from "react-native-multiple-select-list";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge, Divider } from 'react-native-paper';
import Constants from 'expo-constants';
import BeautifulHorizontalList from "react-native-beautiful-horizontal-list";

const ResultScreen = ({ navigation }) => {

    // inital state of disease list view
    const [isToggled, setIsToggled] = useState(true);
    const toggle = useCallback(() => setIsToggled(!isToggled));

    var resList = [];

    // const [resList, setResListSelected] = useState([]);
    // const onResListChange = useCallback(resList => {
    //     setResListSelected({ resList });
    // })

    const [selectedItems, setSelected] = useState([]);
    const onSelectedItemsChange = useCallback(selectedItems => {
        setSelected({ selectedItems });
    })

    const userList = {
        "123": "Malaria",
        "124": "Covid",
        "125": "Pheumonia"
    };

    // inital state of fatal result view
    const [isToggled2, setIsToggled2] = useState(true);
    const toggle2 = useCallback(() => setIsToggled2(!isToggled2));

    // inital state of patient status result view
    const [isToggled3, setIsToggled3] = useState(true);
    const toggle3 = useCallback(() => setIsToggled3(!isToggled3));

    const [caseStatus, setCaseStatus] = useState('');

    const saveResults = () => {

        // if fatal, save to blockchain ..maybe
        // else save to db

        //prompt user to
        // a. review case .. return to step one
        // wizard.current.goTo(0)
        // b. return to home screen
    }
    const cancel = () => {

    }

    const staticData = [
        {
            title: "Running",
            value: "8,984",
            unit: "Steps",
            primaryColor: "#10CFE4",
            //   imageSource: require("./assets/run.png"),
        },
        {
            title: "Cycling",
            value: "2.6",
            unit: "Mil",
            primaryColor: "#c84cf0",
            //   imageSource: require("../assets/lo.png"),
        },
        {
            title: "Swimming",
            value: "9501",
            unit: "Stoke",
            primaryColor: "#10E471",
            //   imageSource: require("./assets/swimmer.png"),
        },
    ];

    return (
        <View style={styles.container} >
            <View style={[styles.content, { marginBottom: 10, marginTop: 10, padding: 10 }]}>
                {/* <View style={styles.action2}> */}
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={{ marginBottom: 10, fontSize: 16 }}>NAMULI CAROL</Text>
                    <Text>F</Text>
                    <View style={{ borderRadius: 5 }}>
                        <Badge style={{ backgroundColor: "#FFB236", paddingLeft: 10, paddingRight: 10, fontSize: 13 }}>Pending</Badge></View>
                </View>
                <Text style={{ fontSize: 13, marginBottom: 5 }}>Presented with headache, loss of appetite, temperature of 101, persisting over a couple of days.
                No underlying illnesses mentioned.
                   </Text>
                {/* </View> */}
            </View>
            <View style={[styles.content, { marginBottom: 10, marginTop: 10 }]}>
                <View style={styles.action2}>
                    <Picker label="Case Status" style={{ color: "#808080", padding: 0 }} placeholder="Select Status" onValueChange={(val) => setCaseStatus(val)}
                        selectedValue={caseStatus}>
                        <Picker.Item value="" label="Update Status" />
                        <Picker.Item value="Pending" label="Pending" />
                        <Picker.Item value="Comfirmed" label="Comfirmed" />
                        <Picker.Item value="Deceased" label="Deceased" />
                    </Picker>
                </View>
            </View>
            <View style={[styles.content, { marginBottom: 10 }]}>
                {/* <BeautifulHorizontalList data={staticData} /> */}
                {/* {selectedItems.forEach(disease => { */}
                <Text>
                    {resList}
                </Text>
                {/* })} */}
                <CustomMultiPicker
                    options={userList}
                    search={true} // should show search bar?
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
                    searchIconName="ios-checkmark"
                    searchIconColor="red"
                    searchIconSize={30}
                    iconColor={"#55A7FF"}
                    iconSize={30}
                    selectedIconName={"ios-checkmark-circle"}
                    // unselectedIconName={"ios-radio-button-off"}
                    scrollViewHeight={220}
                    selected={[]} // list of options which are selected by default
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingTop: 10 }}>
              <View style={{ width: 80 }}>
                <Button rounded
                //   style={styles.btn}
                  color="#808080" title="Cancel" onPress={() => cancel()} />

              </View>
              <View style={{ width: 80 }}>
                <Button title="Save"
                  rounded
                //   style={styles.btn}
                  color="#FFB236"
                  onPress={() => { saveResults() }}
                >
                </Button>
              </View>
            </View>
            
        </View>
    );
}
export default ResultScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#F3F6F9',
        padding: 10,
        // alignItems: "center"
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
    headerText: {
        // textAlign: 'center',
        paddingLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#55A7FF'
    },
    content: {
        backgroundColor: '#fff',
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        padding: 10
    },
    btnDate: {

    },
    action2: {
        paddingTop: 5,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
    },
});