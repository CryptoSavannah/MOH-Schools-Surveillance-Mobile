import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';


const SurveyCard = (props) => {

  const { survey, icon, onOpen } = props

  return (

    <Card containerStyle={styles.card}>
      <TouchableOpacity onPress={() => onOpen(survey.sector)}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={icon}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.title}>{survey.sector}</Text>
            <Text style={styles.sector}>{survey.title}</Text>
          </View>
        </View>

        <Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 10 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.notes}>{survey.description}</Text>
        </View>
      </TouchableOpacity>
    </Card>

  );
}
export default SurveyCard;

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'rgba(56, 172, 236, 1)',
    flex: 1,
    borderWidth: 0,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleView: {
    flex: 5,
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#fff'
  },
  notes: {
    fontSize: 15,
    // color: '#fff',
    // textTransform: 'capitalize'
  },
  sector: {
    fontSize: 13,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#99A3A4',
    textTransform: 'capitalize'
  }
});
