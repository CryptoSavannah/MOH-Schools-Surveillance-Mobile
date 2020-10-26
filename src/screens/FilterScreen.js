import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
// import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/MaterialIcons";
import { Badge } from "react-native-elements";


export default class FilterScreen extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Text>Filters...</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D7DBDD',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    pic: {
        borderRadius: 30,
        width: 50,
        height: 50,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 15,

    },
    time: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,
    },
});
