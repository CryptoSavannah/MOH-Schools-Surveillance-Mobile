import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';

const LoadingButton = ({ isLoading }) => {

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={{ width: 80, marginTop: 40 }}>
                <TouchableOpacity
                    style={[{
                        alignItems: "center", padding: 10, borderRadius: 20
                        , elevation: 5, backgroundColor: "#1A5276"
                    }]}
                    underlayColor='#1A5276'
                >
                    <ActivityIndicator animating={isLoading} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoadingButton;


const styles = StyleSheet.create({
    action: {},
});
