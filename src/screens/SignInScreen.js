import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
import { AuthContext } from '../components/context';
import { SIGNIN_KEY } from '../../env.json';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from 'react-native-gesture-handler';
import actuatedNormalize from '../helpers/actuatedNormalize';
import Geolocation from '@react-native-community/geolocation';

const SignInScreen = ({ navigation }) => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = React.useContext(AuthContext);

  const txt1 = useRef(null);

  useEffect(() => {
    txt1.current.focus();
  }, []);

  const loginHandle = () => {
    setIsLoading(true);

    if (email == '' || password == '') {
      alert('Fill in the required fields!')
      setIsLoading(false)
      return
    }

    Geolocation.getCurrentPosition(position => {
      const currentLongitude = 
          JSON.stringify(position.coords.longitude);
      const currentLatitude = 
        JSON.stringify(position.coords.latitude);
      // console.log("your location: ", currentLongitude + "," + currentLatitude)
      // console.log("axios config: ", JSON.stringify({
      //   "uname": email,
      //   "passwd": password,
      //   "mm_api": "123456",
      //   "location": JSON.stringify({long: currentLongitude, lat: currentLatitude})
      // }))
      axios({
        url: SIGNIN_KEY,
        method: 'post',
        headers: { "Content-Type": "application/json" },
        data: {
          "uname": email,
          "passwd": password,
          "mm_api": "123456",
          "location": JSON.stringify({long: currentLongitude, lat: currentLatitude})
        }
      })
        .then(res => {
          if (res.status !== 200) {
            alert('Server Error!', [
              { text: 'Okay' }
            ]);
          }
          if (res.data.status == 500) {
            alert('Invalid Credentials!', [
              { text: 'Okay' }
            ]);
            // console.log("SignIn Error: " + JSON.stringify(res));
          }
          else {
            let cookie = res.headers["set-cookie"]
            const foundUser = {
              cookie: cookie,
              userid: res.data.userData.userid,
              display_name: res.data.userData.display_name
            }
            AsyncStorage.setItem('user', JSON.stringify(foundUser));
            signIn(foundUser);
          }
          setIsLoading(false);
        })
        .catch(function (error) {
          // console.log("SignIn Error caught: " + error);
          alert('Internet error: Try again', [
            { text: 'Okay' }
          ]);
          setIsLoading(false);
        });
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.header}>Login To Dashboard</Text>
      <View style={styles.inputView}>
        <TextInput
          ref={txt1}
          style={styles.inputText}
          placeholder="Email Address"
          placeholderTextColor="#003f5c"
          name="email"
          onChangeText={(text) => setEmail(text)} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          name="password"
          secureTextEntry
          autoCorrect={false}
          onChangeText={(text) => setPassword(text)} />
      </View>

      <View style={{paddingBottom: actuatedNormalize(80)}}>
      {isLoading ?
        <TouchableOpacity
          style={styles.loginBtn}
        >
          <ActivityIndicator animating={isLoading} color="#fff" />
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            loginHandle()
          }>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      }
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafa',
    paddingVertical: actuatedNormalize(80)
  },
  logo: {
    width: actuatedNormalize(130),
    height: actuatedNormalize(130),
    alignSelf: 'center'
  },
  header: {
    fontWeight: "bold",
    fontSize: actuatedNormalize(24),
    color: "#333",
    marginTop: actuatedNormalize(20),
    marginBottom: actuatedNormalize(30),
    alignSelf: 'center'

  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 2,
    height: actuatedNormalize(50),
    marginBottom: actuatedNormalize(20),
    justifyContent: 'center',
    padding: actuatedNormalize(20),
    alignSelf: 'center'
  },
  inputText: {
    height: actuatedNormalize(50),
    fontSize: actuatedNormalize(16)
  },
  forgot: {
    fontSize: actuatedNormalize(11),
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'rgba(3, 136, 229, 1)',
    borderRadius: 4,
    padding: actuatedNormalize(10),
    alignItems: "center",
    marginVertical: actuatedNormalize(30),
    alignSelf: 'center'
  },
  loginText: {
    color: 'white',
  }
});