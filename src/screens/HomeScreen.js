import React from 'react';
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
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const HomeScreen = ({ navigation }) => {
    const SCREEN_WIDTH = Dimensions.get("window").width;

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

    const chartData = {
        labels: ["25/06", "", "", "", "", "", "", "", "", "", "", "30/06"],
        datasets: [
            {
                data: [20, 5, 10, 18, 10, 8, 11, 15, 11, 22, 7, 9],
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

                <LineChart
                    data={chartData}
                    width={SCREEN_WIDTH}
                    height={220}
                    chartConfig={chartConfig}
                    style={{ flex: 1, marginVertical: 15 }}
                />
                {/* 
                <Block row style={[styles.margin]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pending')}
                    >
                        <Card middle style={{ marginLeft: 7 }}>
                            <Icon distance />
                            <Text h3 style={{ marginTop: 17 }}>158.3</Text>
                            <Text paragraph color="gray">Total Pending</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pending')}
                    >
                        <Card middle style={{ marginLeft: 7 }}>
                            <Icon distance />
                            <Text h3 style={{ marginTop: 17 }}>158.3</Text>
                            <Text paragraph color="gray">Total Pending</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pending')}
                    >
                        <Card middle style={{ marginLeft: 7 }}>
                            <Icon distance />
                            <Text h3 style={{ marginTop: 17 }}>158.3</Text>
                            <Text paragraph color="gray">Total Pending</Text>
                        </Card>
                    </TouchableOpacity>

                </Block> */}

                {/* <View
                    title="NEW CASES"
                    style={[styles.margin, { marginTop: 18 }]}
                >
                    <Text>NEW CASES</Text>
                    <Block style={styles.driver}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                // navigation.navigate('ResultScreen')
                                navigation.navigate('ResultScreen', {
                                    name: 'James Koko',
                                    gender: 'M',
                                    disease: 'Headacke',
                                    status: "Pending"
                                });
                            }}>
                            <Block row center>
                                <Block>
                                    <Image
                                        style={styles.avatar}
                                        source={require('../../assets/images/icons/icons-pending.png')}
                                    />
                                </Block>
                                <Block flex={2}>
                                    <Text h4>James Koko</Text>
                                    <Text paragraph color="gray">Headacke</Text>
                                </Block>
                                <Block>
                                    <Text paragraph right color="black">22:00</Text>
                                    <Text paragraph right color="gray">Pending</Text>
                                </Block>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block style={styles.driver}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                // navigation.navigate('ResultScreen')
                                navigation.navigate('ResultScreen', {
                                    name: 'Alex Monza',
                                    gender: 'M',
                                    disease: 'Malaria',
                                    status: "Closed"
                                });
                            }}>
                            <Block row center>
                                <Block>
                                    <Image
                                        style={styles.avatar}
                                        source={require('../../assets/icons8-checkmark.png')}
                                    />
                                </Block>
                                <Block flex={2}>
                                    <Text h4>Alex Monza</Text>
                                    <Text paragraph color="gray">Malaria</Text>
                                </Block>
                                <Block>
                                    <Text paragraph right color="black">2 min</Text>
                                    <Text paragraph right color="gray">Closed</Text>
                                </Block>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block style={styles.driver}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                // navigation.navigate('ResultScreen')
                                navigation.navigate('ResultScreen', {
                                    name: 'Julius Makayu',
                                    gender: 'M',
                                    disease: 'Covid',
                                    status: "Deceased"
                                });
                            }}>
                            <Block row center>
                                <Block>
                                    <Image
                                        style={styles.avatar}
                                        source={require('../../assets/images/icons/icon-cancel.png')}
                                    />
                                </Block>
                                <Block flex={2}>
                                    <Text h4>Julius Makayu</Text>
                                    <Text paragraph color="gray">Covid</Text>
                                </Block>
                                <Block>
                                    <Text paragraph right color="black">2 hrs</Text>
                                    <Text paragraph right color="gray">Deceased</Text>
                                </Block>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                </View> */}

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

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
