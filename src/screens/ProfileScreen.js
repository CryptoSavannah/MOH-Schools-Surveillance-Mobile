import React, { useState, useEffect } from 'react'
import { Card } from 'native-base'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';
import { AuthContext } from '../components/context';
import AsyncStorage from "@react-native-community/async-storage";

const PersonalScreen = ({ navigation }) => {

  const { signOut } = React.useContext(AuthContext);
  const [usrName, setUsrName] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) { }
        else {
          let usr = JSON.parse(user);
          setUsrName(usr.display_name);
        }
      })
      .catch(err => console.log(err));

  }, []);

  const renderHeader = () => {

    return (
      <SafeAreaView style={styles.mapContainer}>
        <Image
          source={logo}
          style={styles.imageStyle}
        />
      </SafeAreaView>
    )
  };

  const renderSeparator = () => {
    return (
      <View style={sepStyles.container}>
        <View style={sepStyles.separatorOffset} />
        <View style={sepStyles.separator} />
      </View>
    )
  }

  const renderRow = (iconName, label, value) => {
    return (
      <>
        <View style={telStyles.iconRow}>
          <Icon name={iconName} style={{ color: "#0388E5", }} size={26} />
        </View>

        <TouchableOpacity style={telStyles.telRow}>
          <View style={telStyles.telNumberColumn}>
            <Text style={telStyles.telNumberText}>{label}</Text>
          </View>
          <View style={telStyles.telNameColumn}>
            <Text style={telStyles.telNameText}>{value}</Text>
          </View>
        </TouchableOpacity>

        <View style={telStyles.smsRow}>

        </View>
      </>
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {renderHeader()}

        <Card>
          <View style={{ padding: 10 }}>

            <TouchableOpacity>
              <View style={[telStyles.container]}>

                {renderRow("ios-call", "Phone", "")}

              </View>
            </TouchableOpacity>

            {renderSeparator()}

            <TouchableOpacity>
              <View style={[telStyles.container]}>

                {renderRow("ios-home", "Center", usrName)}

              </View>
            </TouchableOpacity>

            {renderSeparator()}

            <TouchableOpacity>
              <View style={[mailStyles.container]}>

                {renderRow("ios-mail", "Email", "")}

              </View>
            </TouchableOpacity>

            {renderSeparator()}

            <TouchableOpacity>
              <View style={[mailStyles.container]}>

                {renderRow("md-globe", "Website", "")}

              </View>
            </TouchableOpacity>

            {renderSeparator()}

            <TouchableOpacity>
              <View style={[mailStyles.container]}>
                {renderRow("ios-pin", "Location", "Wakiso")}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { signOut() }}
            style={{
              elevation: 2, backgroundColor: '#F3F6F9',
              shadowOpacity: 0.5, borderColor: '#F3F6F9', paddingTop: 25
            }}>
            <View style={[mailStyles.container]}>
              <View style={mailStyles.emailRow}>
                <View style={[mailStyles.emailColumn, { justifyContent: "space-around" }]}>
                  <Text style={telStyles.telNumberText}>Signout</Text>
                  <Icon
                    name="ios-exit"
                    style={{ color: "#0388E5", }}
                    size={26}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 270,
  },
  container: {
    flex: 1,
  },
  imageStyle: {
    resizeMode: 'center',
    width: '88%',
    height: '80%',
    position: 'absolute',
    top: '5%',
    alignSelf: 'center',
    borderRadius: 5
  },
});
const mailStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 19,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

const sepStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },
});

const telStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 19,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    // justifyContent: 'center',
  },
  powerColumn: {}
});

export default PersonalScreen
