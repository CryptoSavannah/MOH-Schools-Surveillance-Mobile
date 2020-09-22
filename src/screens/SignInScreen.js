import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {useTheme} from 'react-native-paper';

import {AuthContext} from '../components/context';

import Users from '../model/users';
import {FormInput, Button, Icon, Text} from "@99xt/first-born";

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {colors} = useTheme();

    const {signIn} = React.useContext(AuthContext);


    const loginHandle = (userName, password) => {
        // alert('User: ' + userName + ' Pass: ' + password)

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
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
        signIn(foundUser);
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#3a3838' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView>
                    <View style={styles.action}>
                        <FormInput label="Usernames" placeholder="xtian"
                                   onChangeText={(val) => setUsername(val)}/>
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.action}>
                        <FormInput
                            label="Password"
                            placeholder="testpass"
                            secureTextEntry={data.secureTextEntry}
                            onChangeText={(val) => setPassword(val)}/>

                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }

                    <TouchableOpacity>
                        <Text style={{color: '#bc9151', marginTop: 15}}>Forgot password?</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <Button
                            rounded
                            block
                            style={styles.button}
                            color="#bc9151"
                            onPress={() => {
                                loginHandle(username, password)
                            }}
                        >
                            <Icon name="checkmark"/>
                            <Text>{'Sign in'}</Text>
                        </Button>

                        <Button
                            rounded
                            outline
                            block
                            onPress={() => navigation.navigate('SignUpScreen')}
                        >
                            <Text>{'Sign up'}</Text>
                        </Button>

                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3a3838'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        // marginTop: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2',
        // paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        // fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
