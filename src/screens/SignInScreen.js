import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity, BackHandler, Image, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
// import {FormInput, Button, Icon, Text} from "@99xt/first-born";
import Users from '../model/users';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
// import * as Location from 'expo-location';
import { SIGNIN_KEY } from '../../env.json';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const SignInScreen = ({ navigation }) => {

  const [center_no, setcenter_no] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  // const {colors} = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    // getLocation();

  }, []);

  // const getLocation = () => {
  //     (async () => {
  //         try {
  //             let { status } = await Location.requestPermissionsAsync();
  //             let location = await Location.getCurrentPositionAsync({});
  //             setLocation(location);
  //             // console.log(location.coords.latitude, location.coords.longitude)
  //         }
  //         catch (e) {
  //             // if (status !== 'granted') {
  //             setErrorMsg('Permission to access location was denied');
  //             // navigation.goBack()
  //             // }
  //         }


  //     })();
  // }

  const loginHandle = (center_no) => {
    // getLocation();
    setIsLoading(true);

    axios.post(SIGNIN_KEY.toString(), {
      "center_no": center_no.toString()
    })
      .then(function (response) {
        // console.log(JSON.stringify(response));
        if (response.data.status == 200) {

          let theToken = response.data.token ? theToken = response.data.token : '';
          let theSchoolId = response.data.data.school_id;
          let theCenterNo = center_no;
          let theSubCounty = response.data.data.subcounty;
          const foundUser = {
            center_no: theCenterNo,
            token: theToken,
            school_id: theSchoolId,
            subcounty: theSubCounty,
          }
          // console.log('token: ' + theToken);
          AsyncStorage.setItem('user', JSON.stringify(foundUser));
          signIn(foundUser);
        } else {
          alert('Invalid Center Number!', [
            { text: 'Okay' }
          ]);
          console.log("SignIn Error: " + result.error);
        }
        // console.log(response.status);
        setIsLoading(false);

      })
      .catch(function (error) {
        console.log("SignIn Error caught: " + error);
        setIsLoading(false);
      });

  };

  const loginHandle2 = (center_no) => {

    // getLocation();
    setIsLoading(true);

    const foundUser = Users.filter(item => {
      return center_no == item.username
    });

    if (center_no.length === 0) {
      Alert.alert('Wrong Input!', 'center_no field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }

    // if (location === null) {
    //     Alert.alert('Enable Location!', 'Turn on your location to continue.', [
    //         { text: 'Okay' }
    //     ]);
    //     return;
    // }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User!', 'center_no is incorrect.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setIsLoading(true)
    signIn(foundUser);

  };

  const onLogin = () => {

    // fetch(api, data)
    //     .then(response => response.json())  // promise
    //     .then(json => {
    //         if (json.error) {
    //             alert(json.error);
    //         } else {
    //             // alert(json.user._id);
    //             AsyncStorage.setItem('user', JSON.stringify(json.user))
    //                 .then(() => {
    //                     // this.setState({ userId: user._id, showLoginForm: true });
    //                 });
    //             let usr = json.user;
    //             this.setState({
    //                 loading: false,
    //                 showLoginForm: false,
    //                 userId: usr._id,
    //                 email: usr.email,
    //                 phone: usr.phone,
    //                 center_no: usr.name,
    //             });
    //         }
    //     }).catch(function (err) {
    //     alert('There was an error');
    //     alert('Thanks');
    //     console.log(err);
    // });
  }

  const onSignup = () => {
    navigation.navigate('SignUpScreen');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputView}>
        {/* <TextInput
          style={styles.inputText}
          placeholder="School Number"
          placeholderTextColor="#003f5c"
          name="email"
          onChangeText={(text) => setcenter_no(text)} /> */}
          <TextInput
          style={styles.inputText}
          placeholder="Press Login to Continue"
          placeholderTextColor="#003f5c"
          name="email"
          // keyboardType="phone-pad"
          onChangeText={(text) => setcenter_no(text)} />
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
            // loginHandle2(center_no)
            loginHandle2("xtian")
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
  },
  // logo: {
  //     width: "80%",
  //     height: "30%"
  // }
});