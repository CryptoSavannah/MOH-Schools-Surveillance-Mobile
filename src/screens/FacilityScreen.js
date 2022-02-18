import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Button, TouchableOpacity, LogBox, StatusBar, Text, Alert, TouchableHighlight } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_API } from '../../env.json';
import actuatedNormalize from '../helpers/actuatedNormalize';
import RNFetchBlob from 'rn-fetch-blob';

const FacilityScreen = ({ route, navigation }) => {

  const { report, begin_date, end_date } = route.params ?? {};

  const [cookie, setUserCookie] = useState('');

  const [activeFacility, setActiveFacility] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getFacilities = () => {
    //fetch facilities from server again
    //TODO
  }

  useEffect(() => {

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) { }
        else {
          let usr = JSON.parse(user);
          setUserCookie(usr.cookie);

          let theFacilities = [];

          usr.facilities.map(x => {
            theFacilities.push({ id: x.id, name: x.name })
          })

          setFacilities(theFacilities)
        }
      })
      .catch(err => console.log(err));

    if (refreshing) {
      getFacilities()
    }

    //warnings: ...
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Warning:']);

  }, [activeFacility, refreshing])

  const onNext = () => {
    if (activeFacility != "") {
      RNFetchBlob.config({
        trusty: true
      })
        .fetch('POST', BASE_API, {
          'Content-Type': 'application/json'
        },
          JSON.stringify({
            cookie: cookie,
            method: "getReportFields",
            reportID: report.report_id,
            format: "fill"
          })
        )
        .then(res => {
          // console.log('Report fields res:', res)
          let obj = JSON.parse(res.data)
          // console.log('Report fields res.data:', res.data)

          try {
            if (obj.status == "500") { signOut() }
            else if (obj.status == "400" && obj.errorCode == "400") {
              alert('Form not available.');
            }
            else {
              navigation.navigate("NewAggregate", { report: report, begin_date: begin_date, end_date: end_date, facility: activeFacility })
            }
          } catch (error) {
            alert('Fields Error\n' + res)
            return
          }

        })
        .catch(function (error) { console.log("Report fields Error caught: " + error); });
    }
    else {
      Alert.alert("No Facility Selected", "Select the facility for the report.", [{ 'text': "Okay" }])
    }
  }

  const cancel = () => {
    if (activeFacility != "") {
      setActiveFacility("")
      return;
    }
    navigation.goBack()
  };

  const renderFacilities = () => {

    if (facilities.length == 0) { return null }
    else {
      return (
        <FlatList
          data={facilities}
          keyExtractor={item => item.id}
          renderItem={({ item, index, separators }) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => {
                if (activeFacility == item.id) {
                  setActiveFacility("")
                }
                else { setActiveFacility(item.id) }
              }}
              activeOpacity={0.6}
              underlayColor="#DDDDDD">
              <View style={{
                backgroundColor: "#fafafa",
                borderWidth: 1,
                borderColor: "#fafafa",
                padding: 20,
              }}>
                <Text style={{ fontSize: actuatedNormalize(18), color: activeFacility == item.id ? "#F39C12" : "#333" }}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      )
    }

  }

  //-------------------------------------------------------------------------

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="Light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>

        {(facilities.length == 0) ?

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" animating={facilities.length == 0} color="rgba(3, 136, 229, 1)" />
          </View>

          :
          <>
            {/* <Text style={{ paddingHorizontal: 20,fontSize: actuatedNormalize(20) }}>Select Facility:</Text> */}
            <View style={{justifyContent: 'center', marginBottom: facilities.length > 5 ? 0 : 20}}>
            {renderFacilities()}
            </View>
            <View style={styles.btnWrapper}>
              <View style={styles.btn}>
                <Button
                  block
                  color="grey" title="Cancel" onPress={() => { cancel() }} />
              </View>
              <View style={styles.btn}>
                {!isLoading ?
                  <Button title="Next"
                    block
                    color="rgba(3, 136, 229, 1)"
                    onPress={() => { onNext() }}
                  />
                  :
                  <TouchableOpacity
                    style={styles.activityIndicator}
                    underlayColor='rgba(3, 136, 229, 1)'
                  >
                    <ActivityIndicator animating={isLoading} color="#fff" />
                  </TouchableOpacity>
                }
              </View>
            </View>
          </>
        }
      </ScrollView>
    </>
  );
};

export default FacilityScreen;

const styles = StyleSheet.create({
  action2: {
    // paddingTop: actuatedNormalize(0),
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  inputView: {
    backgroundColor: '#fff',
    borderRadius: 2,
    height: actuatedNormalize(48),
    marginBottom: actuatedNormalize(17),
    justifyContent: 'center',
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginHorizontal: actuatedNormalize(25)
  },
  inputText: {
    height: actuatedNormalize(50),
    fontSize: actuatedNormalize(18)
  },
  scrollViewStyle: {
    flexGrow: 1
  },
  btnWrapper: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: actuatedNormalize(30), marginBottom: actuatedNormalize(10), marginHorizontal: actuatedNormalize(25)
  },
  btn: {
    width: actuatedNormalize(80), marginBottom: actuatedNormalize(10)
  },
  activityIndicator: {
    alignItems: "center", padding: actuatedNormalize(10), backgroundColor: "rgba(3, 136, 229, 1)"
  }
});