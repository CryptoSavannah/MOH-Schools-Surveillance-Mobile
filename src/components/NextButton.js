import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Text } from '@99xt/first-born';
import React from 'react';
import { color } from 'react-native-reanimated';

const NextButton = ({ goToNext, disable }) => {
    // {nextFunction} = props;
    // const onChange = () => {
    //     goToNext();
    // };

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginTop: 40 }}>
                <TouchableOpacity
                    activeOpacity={.5}
                    disabled={disable}
                    onPress={() => goToNext()}
                    style={!disable ? styles.activeBtn : styles.inActiveBtn}
                >
                    <Text style={{color: "white"}}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default NextButton;


const styles = StyleSheet.create({
    action: {},
    activeBtn: {backgroundColor: "#F39C12", alignItems: "center", padding: 10, borderRadius: 20
    , elevation:5},
    inActiveBtn: {backgroundColor: "grey", alignItems: "center", padding: 10, borderRadius: 20
    , elevation:5}
});
