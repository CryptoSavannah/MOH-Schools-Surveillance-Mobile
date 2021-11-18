import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Text,
} from "@99xt/first-born";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import actuatedNormalize from '../helpers/actuatedNormalize';

const HowToUse = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Follow the guide on how to use the surveillance tool:</Text>

      <Button 
      onPress={() =>
        navigation.navigate("Home", { start_guide: "start" })
      }
      >Start Guide</Button>
    </View>
  );
};

export default HowToUse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontWeight: "bold",
    fontSize: actuatedNormalize(24),
    color: "#333",
    marginTop: actuatedNormalize(40),
    marginBottom: actuatedNormalize(10)
  },
  description: {
    fontSize: actuatedNormalize(16),
    color: "gray",
    padding: actuatedNormalize(20),
    alignSelf: 'center'
  },
  startBtn: {
    backgroundColor: "rgba(3, 136, 229, 1)",
    borderRadius: 4,
    padding: actuatedNormalize(10),
    width: "50%",
    alignItems: "center",
    marginVertical: actuatedNormalize(50)
  },
  startText: {
    color: "white"
  }
});

