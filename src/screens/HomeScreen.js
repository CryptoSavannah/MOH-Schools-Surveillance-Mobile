import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform, Image
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";

const HomeScreen = ({navigation}) => {

    const {colors} = useTheme();

    const theme = useTheme();

    return (
        <View style={styles.container}>
                <Text> Home screen</Text>
                <ButtonF
                    color="#808080"
                    onPress={navigation.navigate("ResultScreen")}
                  >
                    <IconF name="arrow-forward" />
                  </ButtonF>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    balanceTxt: {
        color: '#eec971',
        fontWeight: 'bold',
        // fontSize: 10
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        fontSize: 14,
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
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    btns: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    followButton: {
        marginTop: 5,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        // backgroundColor: "white",
        borderWidth: 1,
        // borderColor: "#dcdcdc",
    },
});
