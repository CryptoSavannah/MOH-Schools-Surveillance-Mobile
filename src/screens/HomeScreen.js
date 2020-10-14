import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform, Image,
    SafeAreaView
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import Block from "../components/Block";
import Card from "../components/Card";
import Icon from "../components/Icon";

const HomeScreen = ({navigation}) => {

    return (
        <SafeAreaView style={styles.overview}>
            <ScrollView contentContainerStyle={{paddingVertical: 25}}>

                <Block row style={[styles.margin]}>
                    <Card middle style={{marginRight: 7}}>
                        <Icon vehicle/>
                        <Text h3 style={{marginTop: 20}}>1,428</Text>
                        <Text paragraph color="gray">Total Submitted</Text>
                    </Card>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Pending')}
                    >
                        <Card middle style={{marginLeft: 7}}>
                            <Icon distance/>
                            <Text h3 style={{marginTop: 17}}>158.3</Text>
                            <Text paragraph color="gray">Total Pending</Text>
                        </Card>
                    </TouchableOpacity>
                </Block>

                <View
                    title="NEW CASES"
                    style={[styles.margin, {marginTop: 18}]}
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
                </View>

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
    }
});
