import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions, Image,
    SafeAreaView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import Block from "../components/Block";
import Card from "../components/Card";
import Icon from "../components/Icon";
import * as theme from '../constants/theme';
import {
    LineChart
} from "react-native-chart-kit";
import axios from "axios";
import { DASH_LABEL_KEY, GRAPH_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { useDatabase } from '@nozbe/watermelondb/hooks';
import PatientList from "../components/PatientList";

const Home = ({ route, navigation, database }) => {
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const { fromDate } = route.params ?? {};
    const { toDate } = route.params ?? {};
    const [userToken, setUserToken] = useState('');
    const [center_no, setCenter_no] = useState('');
    const [school_id, setSchool_id] = useState('');

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#F3F6F9",
        backgroundGradientToOpacity: 0.2,
        color: (opacity = 1) => `rgba(19, 19, 19, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.6,
        useShadowColorFromDataset: false // optional
    };

    const DATA = [
        {
            id: '1',
            title: 'Fever',
            number: 8
        },
        {
            id: '2',
            title: 'Abdominal pain',
            number: 3
        },
        {
            id: '3',
            title: 'Headache',
            number: 20
        },
        {
            id: '4',
            title: 'Cough',
            number: 1
        },
        {
            id: '5',
            title: 'Weakness',
            number: 1
        },
        {
            id: '6',
            title: 'Vomiting',
            number: 0
        },
    ];

    const {patients, setPatients} = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);



    })

    const addNewMovie = () => {
        navigation.navigate("NewPatient");
      };

    function Item({ title, number }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Pending')}
                style={[styles.item, { alignItems: 'center', justifyContent: 'center' }]}
            >
                {/* <View style={[styles.item, {alignItems: 'center', justifyContent: 'center'}]}> */}
                {/* <Text style={styles.title}>{title}</Text> */}
                <Icon distance />
                <Text h3 style={{ marginTop: 17 }}>{number}</Text>
                <Text paragraph color="gray">{title}</Text>
                {/* </View> */}
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        console.log('...starting...: ');
        if (typeof fromDate !== 'undefined') {
            console.log("fromDate: " + fromDate)
        }

        if (typeof toDate !== 'undefined') {
            console.log("toDate: " + toDate)
        }
        AsyncStorage.getItem('user')
            .then(user => {
                if (user === null) {
                    // this.setState({loading: false, showLoginForm: true});
                } else {
                    let usr = JSON.parse(user);
                    setUserToken(usr.token);
                    setCenter_no(usr.center_no);
                    setSchool_id(usr.school_id);
                    // fetchData();
                    console.log('fetching... ' + usr.school_id);
                }
            })
            .catch(err => console.log(err));


        if (userToken === '') {

        } else {
            // loadConditions();
            // loadCases();
        }
    }, [userToken, fromDate, toDate]);

    const chartData = {
        labels: ["25/06", "30/06"],
        datasets: [
            {
                data: [20, 5, 10, 18, 10, 8, 11, 15, 11, 22, 7, 9,  10, 8, 11, 15, 11, 22, 7, 9],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Cases"] // optional
    };

    return (
        <SafeAreaView style={styles.overview}>

            <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
                <FlatList
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} number={item.number} />}
                    keyExtractor={item => item.id}
                    style={{ width: SCREEN_WIDTH + 5, height: '50%', marginHorizontal: 5, flex: 1 }}
                />

                <ScrollView horizontal={true}>
                    <LineChart
                        data={chartData}
                        width={SCREEN_WIDTH + 50}
                        height={220}
                        chartConfig={chartConfig}
                        style={{ flex: 1, marginVertical: 15 }}
                    />
                </ScrollView>
                <PatientList database={database} search="" navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    overview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
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
    item: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        marginVertical: 2,
        marginHorizontal: 7,
        paddingHorizontal: 30,
        borderColor: theme.colors.card,
        borderWidth: 1,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
        width: 150
    },
    title: {
        fontSize: 32,
    },
});
