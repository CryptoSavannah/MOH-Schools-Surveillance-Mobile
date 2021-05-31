import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@99xt/first-born';
import React from 'react';

const FinishButton = ({goToFinish}) => {

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginTop: 30 }}>
                <Button
                    rounded
                    block
                    // style={styles.btn}
                    color="#1A5276" title="Prev" onPress={() => goToFinish()}>
                    <Text>Finish</Text>
                </Button>
            </View>
        </View>

    );
};

export default FinishButton;


const styles = StyleSheet.create({
    action: {},
});
