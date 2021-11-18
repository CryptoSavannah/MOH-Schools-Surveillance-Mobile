import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';
import { AuthContext } from '../components/context';
import AsyncStorage from "@react-native-community/async-storage";
import actuatedNormalize from '../helpers/actuatedNormalize';

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
          <Icon name={iconName} style={{ color: "#0388E5", }} size={actuatedNormalize(26)} />
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

        <View style={{ padding: actuatedNormalize(10) }}>
          {renderSeparator()}

          <TouchableOpacity>
            <View style={[telStyles.container, { paddingTop: actuatedNormalize(10) }]}>

              {renderRow("ios-home", "Center", usrName)}

            </View>
          </TouchableOpacity>

          {renderSeparator()}

          <TouchableOpacity>
            <View style={[mailStyles.container, { paddingTop: actuatedNormalize(10) }]}>
              {renderRow("ios-pin", "Location", "Wakiso")}
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            signOut()
          }>
          <Text style={styles.loginText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginBtn: {
    width: '80%',
    backgroundColor: 'rgba(3, 136, 229, 1)',
    borderRadius: 4,
    padding: actuatedNormalize(10),
    alignItems: "center",
    marginVertical: actuatedNormalize(20),
    alignSelf: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: actuatedNormalize(16)
  },
  mapContainer: {
    width: '100%',
    height: actuatedNormalize(270),
    marginBottom: actuatedNormalize(60)
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
    borderRadius: 5,
    marginTop: actuatedNormalize(50),
  },
});
const mailStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: actuatedNormalize(19),
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: actuatedNormalize(5),
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
    marginBottom: actuatedNormalize(19),
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
    fontSize: actuatedNormalize(16),
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: actuatedNormalize(5),
  },
  telNumberText: {
    fontSize: actuatedNormalize(16),
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
  }
});

export default PersonalScreen
