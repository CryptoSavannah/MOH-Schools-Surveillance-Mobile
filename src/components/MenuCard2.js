import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import * as theme from '../constants/theme';
import { fetchPatients } from '../model/data';

const MenuCard = (props) => {

  const { menutab, onOpen, navigation } = props
  const [patients, setPatients] = useState([]);

  useEffect(() => {

    fetchPatients().then(res => {
      // console.log(res)
      let pats = [];

      res.data.map(x => {
        let date = new Date(x.dob);
        pats.push({
          id: x.patient_id,
          nin: x.nin,
          nin_hash: x.nin_hash,
          name: x.fname + ' ' + x.lname,
          dob: date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1),
          gender: x.gender
        });
      });

      setPatients(pats);

    })

  }, [])

  function Item({ name, nin, dob, gender, date_added }) {
    return (
      <TouchableOpacity
        onPress={() => {

          // Alert.alert(
          //   title, 'View this Case?',
          //   [ 
          //     {
          //       text: "Cancel",
          //       onPress: () => console.log("Cancel Pressed"),
          //       style: "cancel"
          //     },
          //     {
          //       text: "OK", onPress: () => {
                  // props.navigation.navigate('Pending')

                  navigation.navigate("AddNew", {
                    fnameR: name.split(' ')[0],
                    nin: nin,
                    lnameR: name.split(' ')[1],
                    dobR: dob,
                    genderR: gender
                  })

                  // console.log("OK Pressed")
          //       }
          //     }
          //   ]
          // );
        }}
        style={[styles.item, { alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }]}
      >
        <Text h3 style={{ flex: 1 }}>{name}</Text>
        <Text paragraph color="gray">{date_added}</Text>
      </TouchableOpacity>
    );
  }
  return (

    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.sector}>{`${menutab.title} (${patients.length})`}</Text>
        </View>
        <View>
          <FlatList
            pagingEnabled={true}
            legacyImplementation={true}
            data={patients}
            renderItem={({ item }) => <Item name={item.name} nin={item.nin} dob={item.dob} gender={item.gender} date_added={item.date_added} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>

      <Divider style={{ backgroundColor: '#fff', marginVertical: 10 }} />
      <TouchableOpacity onPress={() => onOpen(menutab.page)} >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.notes}>{'View more'}</Text>
        </View>
      </TouchableOpacity>
    </Card>

  );
}
export default MenuCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  container: {
    alignItems: 'center'
  },
  titleView: {
    flex: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notes: {
    fontSize: 15,
    color: '#99A3A4',
  },
  sector: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
    alignSelf: 'center'
  },
  item: {
    backgroundColor: '#fff',
    borderBottomColor: theme.colors.card,
    borderLeftColor: '#fff',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderWidth: 0.5,
    padding: 10,
    width: 300
  }
});
