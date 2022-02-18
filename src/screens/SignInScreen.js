import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import logo from '../assets/logo.png';
import { AuthContext } from '../components/context';
import { SIGNIN_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from 'react-native-gesture-handler';
import actuatedNormalize from '../helpers/actuatedNormalize';
import RNFetchBlob from 'rn-fetch-blob';

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

    RNFetchBlob.config({
      trusty : true
    })
    .fetch('POST', SIGNIN_KEY, {
      'Content-Type': 'application/json'
    },
    JSON.stringify({
          uname: email,
          passwd: password,
          mm_api: "123456"
        })
    )
    .then(res => {
      console.log('signIn res:', res.data)
      let obj = JSON.parse(res.data)
      if (obj.status == 500) {
        alert('Invalid Credentials!', [
          { text: 'Okay' }
        ]);
      }
      if (obj.status !== 200) {
        alert('Server Error!', [
          { text: 'Okay' }
        ]);
      } 
      else {

        if(obj.facilities.length <= 0){
          Alert.alert(
            "Invalid User",
            "You do not have access to this platform.",
            [
              { text: "OK", onPress: () => {} }
            ]
          );
        }
        else {

        const foundUser = {
          cookie: obj.token,
          userid: obj.userData.userid,
          display_name: obj.userData.display_name,
          facilities: obj.facilities
        }
        // console.log('signIn res2:', foundUser)

        AsyncStorage.setItem('user', JSON.stringify(foundUser));
        signIn(foundUser);
      }
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