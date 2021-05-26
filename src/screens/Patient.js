import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  FormInput,
} from "@99xt/first-born";
// import { Picker } from 'native-base';
// import {Picker} from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { Checkbox, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import { CREATE_PATIENT_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { TouchableOpacity } from 'react-native';
import {
  View,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  H2,
  } from "native-base";

const Patient = (props) => {

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {

    if (props.patient) {
      setFName(patient.fname);
      setLName(patient.lname);
      setGender(patient.gender);
      setDob(new Date(patient.dob));
    }
  });

  handleEdit = () => {
    let { patient } = props;
    props.navigation.navigate("EditPatient", { patient });
  };

  handleDelete = () => {
    let { patient } = props;
    patient.deletePatient();
    props.navigation.goBack();
  };

  const cancel = () => {
    // back to home
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>


        <View style={{ alignSelf: "center" }}>
          <Text style={{ paddingHorizontal: 20, fontWeight: "bold" }}>
            {"Enter The Patient's Details:".toUpperCase()}
          </Text></View>

        <Divider style={{ marginVertical: 5 }} />

        <Card style={{ flex: 0 }}>
          <CardItem />
          <CardItem>
            <Left>
              <Body>
                <H2>{fname + " " + lname}</H2>
                <Text note textStyle={{ textTransform: "capitalize" }}>
                  {gender}
                </Text>
                <Text note>
                  {dob.toString().substr(4, 12)}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{movie.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={handleDelete}
                textStyle={{ color: "#87838B" }}
              >
                <Icon name="md-trash" />
                <Text>Delete Movie</Text>
              </Button>
              <Button
                transparent
                onPress={handleEdit}
                textStyle={{ color: "#87838B" }}
              >
                <Icon name="md-create" />
                <Text>Edit Movie</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </SafeAreaView>
    </View>
  );
};

const enhance = withObservables(["patient"], ({ patient }) => ({
  patient: patient.observe()
}));

export default enhance(Patient);

const styles = StyleSheet.create({
        container: {
        // flex: 1,
        justifyContent: "center",
    width: "100%", height: "100%",
    // marginTop: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#F3F6F9"
  },
  action: {
        flexDirection: 'row',
    paddingTop: 15,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action2: {
        paddingTop: 5,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
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

  },
  view: {
        flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
        fontSize: 20,
    marginBottom: 10
  }

});