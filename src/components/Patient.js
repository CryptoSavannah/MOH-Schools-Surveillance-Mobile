import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import Icon from "react-native-vector-icons/Fontisto";

const Patient = (props) => {

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }



  const { name, nin, gender, dob } = props

  return (

    <View style={styles.card}>
      <Icon
        name='person' size={100} color="#b3b3b3"
        style={{ marginRight: 7, alignSelf: 'center' }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 25, paddingRight: 10 }}>
        <View style={[{ marginRight: 10 }]}>
          <Text style={[styles.title, {textAlign:'right'}]}>{`Full Name:`}</Text>
          <Text style={[styles.sector, {textAlign:'right'}]}>{`ID:`}</Text>
          <Text style={[styles.notes, {textAlign:'right'}]}>{`Gender:`}</Text>
          <Text style={[styles.notes, {textAlign:'right'}]}>{`Age:`}</Text>

        </View>
        <View >
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.sector}>{nin}</Text>
          <Text style={styles.notes}>{gender === 'F' ? 'Female':'Male'}</Text>
          <Text style={styles.notes}>{dob}</Text>
          {/* <Text style={styles.notes}>{`${getAge(dob)}`}</Text> */}

          </View>
      </View>
    </View>

  );
}
export default Patient;

const styles = StyleSheet.create({
  card: {

  },
  container: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleView: {
    flex: 5,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    paddingTop: 10
    // fontWeight: 'bold',
    // color: '#fff'
  },
  notes: {
    fontSize: 16,
    // color: '#fff',
    // textTransform: 'capitalize'
    paddingTop: 10

  },
  sector: {
    fontSize: 16,
    paddingTop: 10,
    // fontWeight: 'bold',
    color: '#99A3A4',
    textTransform: 'capitalize'
  }
});
