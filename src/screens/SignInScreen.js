import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity, BackHandler, Image, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
import Users from '../model/users';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import { SIGNIN_KEY } from '../../env.json';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const SignInScreen = ({ navigation }) => {

  const [center_no, setcenter_no] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const { signIn } = React.useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const loginHandle = () => {
    setIsLoading(true);

    axios({
      url: "https://morph.cryptosavannah.com/site/admin/index.php",
      method: 'post',
      headers: { "Content-Type": "application/json" },
      data: {
        "uname": email,
        "passwd": password,
        "mm_api": "123456"
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
          console.log("SignIn Error: " + JSON.stringify(res));
        }
        else {
          let cookie = res.headers["set-cookie"]

          const foundUser = {
            cookie: cookie,
          }
          AsyncStorage.setItem('user', JSON.stringify(foundUser));
          signIn(foundUser);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("SignIn Error caught: " + error);
        alert('Failed to find data store: Try again', [
          { text: 'Okay' }
        ]);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
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
          keyboardType="password"
          onChangeText={(text) => setPassword(text)} />
      </View>

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
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
    marginTop: 20,
    marginBottom: 30
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  forgot: {
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'rgba(3, 136, 229, 1)',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
  },
  loginText: {
    color: 'white',
  },
  signup: {
    marginTop: 20,
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 40,
    marginBottom: 10,
  }
});