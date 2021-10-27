import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Text,
} from "@99xt/first-born";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';

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
    fontSize: 24,
    color: "#333",
    marginTop: 40,
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: "gray",
    padding: 20,
    alignSelf: 'center'
  },
  startBtn: {
    backgroundColor: "rgba(3, 136, 229, 1)",
    borderRadius: 4,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginVertical: 50
  },
  startText: {
    color: "white"
  }
});

