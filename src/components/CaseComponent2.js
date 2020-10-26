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


export default class CaseComponent extends Component {

    // static propTypes = {
    //     // Movie object with title, genre, and poster
    //     card: PropTypes.object.isRequired,
    //     // Called when user taps on a poster
    //     onOpen: PropTypes.func.isRequired,
    //     onEarn: PropTypes.func.isRequired,
    // }

    // clickEventListener = (item) => {
    //     Alert.alert('Message', 'Item clicked. ' + item.name);
    // };

    render() {
        // const {card, card: {card_number, points_earned, related_loyalty_program}, onOpen, onEarn} = this.props;
        return (
            <View style={styles.container}>

                {/* <TouchableOpacity
                    onPress={() => {
                        alert("Details under implementation")
                    }}
                >
                    <View style={styles.row}>
                        
                        <View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>Christan</Text>
                                <Text style={styles.time}>Pending</Text>
                            </View>
                            <View style={styles.msgContainer}>
                                <Icon
                                    name='done' size={15} color="#b3b3b3"
                                    style={{ marginLeft: 15, marginRight: 5 }}
                                />
                                <Text style={styles.msgTxt}>Headache</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}

                <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                    <Badge />
                    <Text style={styles.nameTxt}>June 3, 2020</Text>
                </View>
                <View style={{
                    borderStyle: 'dotted',
                    height: 100,
                    alignSelf: 'flex-start',
                    marginLeft: 3,
                    borderLeftWidth: 2
                }}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>Malaria</Text>
                        <View style={styles.msgContainer}>
                            <Icon
                                name='done' size={15} color="#b3b3b3"
                                style={{ marginLeft: 15, marginRight: 5 }}
                            />

                            <Text style={styles.msgTxt}>Confirmed</Text>

                        </View>
                    </View>
                    <View style={{marginLeft: 15,}}>
                        <Text style={styles.time}>Headache</Text>
                        <Text style={styles.time}>Headache</Text>
                        <Text style={styles.time}>Headache</Text>
                        <Text style={styles.time}>Headache</Text>
                    </View>

                </View>
                {/* <View style={{ alignSelf: 'flex-start' }}><Badge /></View> */}

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
