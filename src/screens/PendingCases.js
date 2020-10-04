import React, {Component} from 'react';
import {TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {Block, Card, Text, Icon, Label} from '../components/index';
import * as theme from "react-native-paper";
import CaseComponent from "../components/CaseComponent";

const HomeScreen = ({navigation}) => {

    return (
        <SafeAreaView style={styles.overview}>
            <ScrollView contentContainerStyle={{paddingVertical: 25}}>
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

export default HomeScreen;

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
    }
});
