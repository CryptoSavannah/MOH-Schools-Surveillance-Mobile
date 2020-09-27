import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, SafeAreaView} from 'react-native';
import {
    Picker,
    FormInput,
} from "@99xt/first-born";
import MultiSelect from 'react-native-multiple-select';

const AddNew = ({navigation}) => {

    const items = [{
        id: '92iijs7yta',
        name: 'Ondo',
    }, {
        id: 'a0s0a8ssbsd',
        name: 'Ogun',
    }, {
        id: '16hbajsabsd',
        name: 'Calabar',
    }, {
        id: 'nahs75a5sg',
        name: 'Lagos',
    }, {
        id: '667atsas',
        name: 'Maiduguri',
    }, {
        id: 'hsyasajs',
        name: 'Anambra',
    }, {
        id: 'djsjudksjd',
        name: 'Benue',
    }, {
        id: 'sdhyaysdj',
        name: 'Kaduna',
    }, {
        id: 'suudydjsjd',
        name: 'Abuja',
    }];

    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [selectedItems, setSelectedItems] = useState(items);

    // state = {selectedItems = [];};


    const onSelectedItemsChange = selectedItems => {
        setSelectedItems(selectedItems);
    };

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
                <View style={{ marginLeft: 5, flex: 1 }}>
                    <MultiSelect
                        hideTags
                        items={items}
                        uniqueKey="id"
                        // ref={(component) => { multiSelect = component }}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Diseases and symptoms"
                        searchInputPlaceholderText="Search Diseases..."
                        onChangeInput={ (text)=> console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        hideSubmitButton={true}
                    />
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
