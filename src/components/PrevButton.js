import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@99xt/first-born';
import React from 'react';

const PrevButton = ({goToPrev}) => {

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginTop: 30 }}>
                <Button
                    rounded
                    block
                    // style={styles.btn}
                    color="#F39C12" title="Prev" onPress={() => goToPrev()}>
                    {/*color="#F39C12" title="Next" onPress={() => wizard.current.next()}>*/}
                    <Text>Back</Text>
                </Button>
            </View>
        </View>

    );
};

export default PrevButton;


const styles = StyleSheet.create({
    action: {},
});
