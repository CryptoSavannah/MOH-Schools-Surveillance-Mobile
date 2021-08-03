import React from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import {
    Text,
    Icon,
    Button,
} from "@99xt/first-born";
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={{width: "80%", height: "30%"}} resizeMode="contain"/>
            <Text style={styles.header}>Track students' health records</Text>
            <Text style={styles.description}>Record student's statuses and their health records</Text>
            <Text style={styles.description}>Let the ministry store info for you</Text>
            {/*<Text style={styles.description}>Vestibulum varius mauris in eros scelerisque egestas.</Text>*/}
            <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={styles.startText}>START NOW</Text>
            </TouchableOpacity>

        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#333",
        marginTop: 20,
        marginBottom: 10
    },
    description: {
        fontSize: 12,
        color: "gray",
        padding: 5
    },
    startBtn: {
        backgroundColor: "rgba(231,76,60,1)",
        borderRadius: 50,
        padding: 10,
        width: "50%",
        alignItems: "center",
        marginTop: 50
    },
    startText: {
        color: "white"
    }
});

