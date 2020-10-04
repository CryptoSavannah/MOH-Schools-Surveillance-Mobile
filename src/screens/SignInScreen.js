import React, {useState} from 'react';
import {StyleSheet, Alert, Text, View, TextInput, TouchableOpacity, BackHandler, Image, ActivityIndicator} from 'react-native';
import logo from '../assets/logo.png';
// import {FormInput, Button, Icon, Text} from "@99xt/first-born";
import Users from '../model/users';
import {useTheme} from 'react-native-paper';
import {AuthContext} from '../components/context';

const SignInScreen = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const {colors} = useTheme();

    const {signIn} = React.useContext(AuthContext);


    const loginHandle = (userName, passWord) => {
        // alert('User: ' + userName + ' Pass: ' + password)

        const foundUser = Users.filter(item => {
            return userName == item.username && passWord == item.password;
        });

        if (username.length === 0 || password.length === 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if (foundUser.length === 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
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
        //                 username: usr.name,
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
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.header}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="School Number"
                    placeholderTextColor="#003f5c"
                    name="email"
                    keyboardType="phone-pad"
                    onChangeText={(text) => setUsername(text.toLowerCase())}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    name="password"
                    onChangeText={(text) => setPassword(text)}/>
            </View>

            {isLoading ?
                <TouchableOpacity
                    style={styles.loginBtn}
                >
                    <ActivityIndicator animating={isLoading} color="#fff"/>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => loginHandle("xtian", "testpass")}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>


            }

            {/*<TouchableOpacity*/}
            {/*    style={styles.signup}*/}
            {/*    onPress={() => onSignup()}*/}
            {/*>*/}
            {/*    <Text>Signup</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0ebe5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        // fontWeight: 'bold',
        // fontSize: 50,
        // color: '#fb5b5a',
        // marginBottom: 40,
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
        // color: 'white',
        fontSize: 11,
    },
    loginBtn: {
        width: '80%',
        backgroundColor: '#FFB236',
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
