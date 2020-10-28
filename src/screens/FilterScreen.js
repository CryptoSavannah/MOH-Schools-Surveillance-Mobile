import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView,
    TextInput,
    Button
} from 'react-native';
// import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/MaterialIcons";
import { Badge } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";


export default FilterScreen = ({ navigation }) => {
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
            setToDate((date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear())

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
            setFromDate((date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear())

        }

    };


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View>
                    <View style={styles.action}>
                        <TextInput style={{ fontSize: 16 }} onFocus={showFromDatePicker} onKeyPress={showFromDatePicker} label="Date of Birth" placeholder="Enter From Date"
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
                <View>
                    <View style={styles.action}>
                        <TextInput style={{ fontSize: 16 }} 
                        onFocus={showToDatePicker} onKeyPress={showToDatePicker} label="To Date" placeholder="Enter To Date"
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
            <View style={{ width: '50%', alignSelf: "center", marginTop: 20, paddingTop: 20 }}>
                <Button
                    rounded
                    block
                    style={styles.btn}
                    color="#FFB236" title="Load" onPress={() => navigation.navigate("Home",{
                        fromDate : fromDate,
                        toDate : toDate
                    })}
                >
                </Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        width: "100%", height: "100%",
        // marginTop: 10,
        padding: 15,
        backgroundColor: "#F3F6F9"
    },
    action: {
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
});
