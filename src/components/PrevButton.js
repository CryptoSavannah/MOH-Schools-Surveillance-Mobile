import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@99xt/first-born';
import React from 'react';
import { colors } from '../constants/theme';

const PrevButton = ({ goToPrev }) => {

    return (
        // <View style={{ alignItems: 'flex-end' }}>
        //     <View style={{ width: 80 }}>
        //         <Button
        //             rounded
        //             block
        //             // style={styles.btn}
        //             color={colors.caption} title="Prev" onPress={() => goToPrev()}>
        //             {/*color="rgba(3, 136, 229, 1)" title="Next" onPress={() => wizard.current.next()}>*/}
        //             <Text>Back</Text>
        //         </Button>
        //     </View>
        // </View>

        <View style={{ width: 80, alignItems: 'flex-end', marginTop: 15 }}>
            <Button
                block
                // style={styles.btn}
                // color="grey" title="Cancel" onPress={() => { cancel() }} 
                color="grey" title="Prev" onPress={() => goToPrev()}>
                <Text>Back</Text>
            </Button>

        </View>

    );
};

export default PrevButton;
