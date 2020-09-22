import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {
    Picker,
    FormInput,
} from "@99xt/first-born";

const AddNew = ({navigation}) => {

    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.action}>
                    <FormInput label="First name" placeholder="First name" onChangeText={(val) => setAmount(val)}/>
                </View>
                <View style={styles.action}>
                    <FormInput label="Last name" placeholder="Last name" onChangeText={(val) => setAmount(val)}/>
                </View>
                <View style={styles.action}>
                    <Picker label="Gender" placeholder="Gender" onValueChange={(val) => setCurrency(val)}
                            selectedValue={currency}>
                        <Picker.Item value="" label="Gender"/>
                        <Picker.Item value="Male" label="Male"/>
                        <Picker.Item value="Female" label="Female"/>
                    </Picker>
                </View>

            </ScrollView>
        </View>
    );
};

export default AddNew;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 20,
    },
    action: {
        flexDirection: 'row',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    qrcode: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    }
});
