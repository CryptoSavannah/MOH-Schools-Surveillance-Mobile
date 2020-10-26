import React, { Component } from 'react';
import { TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Block, Card, Text, Icon, Label } from '../components/index';
import * as theme from "react-native-paper";
import CaseComponent from "../components/CaseComponent2";
import Dash from 'react-native-dash';
import { Badge } from "react-native-elements";

const PatientRecord = ({ navigation }) => {

    return (
        // <Dash dashGap={15} style={{width:1, height:'80%', flexDirection:'column', alignSelf: "center", paddingTop: 30}}>
        //     <CaseComponent/>
        // </Dash>



        <SafeAreaView style={styles.overview}>
            <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
            <CaseComponent/>
            <CaseComponent/>
            <CaseComponent/>
            <CaseComponent/>
            <CaseComponent/>
            <CaseComponent/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PatientRecord;

const styles = StyleSheet.create({
    overview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.Colors.white,
    },
    margin: {
        marginHorizontal: 25,
    },
    driver: {
        marginBottom: 11,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    pic: {
        borderRadius: 20,
        width: 30,
        height: 30,
    },
});