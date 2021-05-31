import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import * as theme from '../constants/theme';
import { useTheme } from '@react-navigation/native';


const MenuCard = (props) => {

  const { menutab, onOpen } = props

  function Item({ title, number }) {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Pending')}
        style={[styles.item, { alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }]}
      >
        {/* <View style={[styles.item, {alignItems: 'center', justifyContent: 'center'}]}> */}
        {/* <Text style={styles.title}>{title}</Text> */}
        {/* <Icon distance /> */}
        <Text h3 style={{ flex: 1 }}>{number}</Text>
        <Text paragraph color="gray">{title}</Text>
        {/* </View> */}
      </TouchableOpacity>
    );
  } 
  return (

    <Card containerStyle={styles.card}>
      <View style={styles.container}>
      <View style={styles.titleView}>
          {/*<Text style={styles.title}>{'Menu title'}</Text>*/}
          <Text style={styles.sector}>{menutab.title}</Text>
        </View>
        <View>
           <FlatList
            pagingEnabled={true}
            // showsHorizontalScrollIndicator={false}
            legacyImplementation={true}
            data={menutab.items}
            renderItem={({ item }) => <Item title={item.title} number={item.number} />}
            keyExtractor={item => item.id}
            // style={{ width: SCREEN_WIDTH + 5, height: '50%', marginHorizontal: 5, flex: 1 }}
          />
        </View>
      </View>

      <Divider style={{ backgroundColor: '#fff', marginVertical: 10 }} />
      <TouchableOpacity
        onPress={() => onOpen(menutab.page)}
      >
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
    // backgroundColor: 'rgba(56, 172, 236, 1)',
    // flex: 1,
    // borderWidth: 0,
    borderRadius: 10,
    // width: '100%',
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleView: {
    flex: 5,
    // marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#fff'
  },
  notes: {
    fontSize: 15,
    color: '#99A3A4',
    // textTransform: 'capitalize'
  },
  sector: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize'
  },
  item: {
    backgroundColor: '#fff',
    borderBottomColor: theme.colors.card,
    borderLeftColor: '#fff',
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderWidth: 0.5,
    // shadowColor: theme.colors.shadow,
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // shadowOffset: { width: 0, height: 0 },
    // elevation: 2,
    padding: 10,
    width: 300
}
});
