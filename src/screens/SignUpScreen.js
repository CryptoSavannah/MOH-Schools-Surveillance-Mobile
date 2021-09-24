import React, {useState} from 'react';
import {
    View,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
    Text,
    Icon,
    Button,
    FormInput,
} from "@99xt/first-born";


const SignInScreen = ({navigation}) => {

    const [data, setData] = useState({
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#4d505b' barStyle="Light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.action}>
                        <FormInput label="Username" placeholder="Username" onChangeText={(val) => setUsername(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="First name" placeholder="First name"
                                   onChangeText={(val) => setFirstname(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Last name" placeholder="Last name" onChangeText={(val) => setLastname(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Email" placeholder="Email" onChangeText={(val) => setEmail(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Password" placeholder="Password" secureTextEntry={true}
                                   onChangeText={(val) => setEmail(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Confirm password" placeholder="Password" secureTextEntry={true}
                                   onChangeText={(val) => setEmail(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Phone" placeholder="Phone" onChangeText={(val) => setPhone(val)}/>
                    </View>

                    <View style={styles.action}>
                        <FormInput label="Location" placeholder="Address" onChangeText={(val) => setLocation(val)}/>
                    </View>

                    <View style={styles.button}>
                        <Button
                            rounded
                            block
                            style={styles.button}
                            color="#bc9151"
                            onPress={() => alert('Thanks ' + username)}
                        >
                            <Icon name="checkmark"/>
                            <Text>{'Sign up'}</Text>
                        </Button>

                        <Button
                            rounded
                            outline
                            block
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Text>{'Sign in'}</Text>
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
        backgroundColor: '#0388E5'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});
