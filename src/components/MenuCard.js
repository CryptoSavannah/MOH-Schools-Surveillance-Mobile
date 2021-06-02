import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import * as theme from '../constants/theme';


const MenuCard = (props) => {

  const { menutab, onOpen } = props

  function Item({ title, number }) {
    return (
      <TouchableOpacity
        onPress={() => {

          Alert.alert(
            title, 'View this Case?',
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "OK", onPress: () => {
                  // props.navigation.navigate('Pending')
                  console.log("OK Pressed")
                }
              }
            ]
          );
        }}
        style={[styles.item, { alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }]}
      >
        <Text h3 style={{ flex: 1 }}>{number}</Text>
        <Text paragraph color="gray">{title}</Text>
      </TouchableOpacity>
    );
  }
  return (

    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.sector}>{`${menutab.title} (${menutab.length})`}</Text>
        </View>
        <View>
          <FlatList
            pagingEnabled={true}
            legacyImplementation={true}
            data={menutab.items}
            renderItem={({ item }) => <Item title={item.title} number={item.number} />}
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
