import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { TouchableOpacity } from 'react-native';
// import realm, {
//   addPatient
// } from "../database/database";
import { useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';
import { fetchChronicConditions, fetchDisabilities } from '../model/data';

const AddNew = ({ route, navigation }) => {

  const [userToken, setUserToken] = useState(null);

  const [conditions, setConditions] = useState([]);
  const [disabilities, setDisabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      date_of_birth: '',
      nin: '',
      immunization_status: '',
      disability: '',
      chronic_condiction: ''
    },
    mode: 'onChange',
  });

  useEffect(() => {

    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) { }
        else {
          let usr = JSON.parse(user);
          setUserToken(usr.token);
        }
      })
      .catch(err => console.log(err));

    fetchChronicConditions().then(res => {
      let conds = [];

      res.data.map(x => {
        conds.push({
          value: x.id,
          label: x.condition_name,
        });
      });

      setConditions(conds)

    })

    fetchDisabilities().then(res => {
      let disabltis = [];

      res.data.map(x => {
        disabltis.push({
          value: x.id,
          label: x.disability_name,
        });
      });

      setDisabilities(disabltis);
      console.log(disabilities);

    })

  }, []);

  const savePatient = handleSubmit(async (data) => {
    setIsLoading(true)
    console.log(data);

    setTimeout(() => {
      setIsLoading(false)
      alert("Patient Information saved.");
      cancel()
    }, 1000);
    // addPatient(fname, lname)
  });

  const cancel = () => {
    navigation.navigate("Home");
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={{ paddingTop: 15 }} >
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                name: 'firstname',
                type: 'text',
                textInputProps: {
                  label: 'First name',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'First name is required',
                  },
                },
              },
              {
                name: 'lastname',
                type: 'text',
                textInputProps: {
                  label: 'Last Name',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Last Name is required',
                  },
                },
              },
              {
                name: 'gender',
                type: 'select',
                textInputProps: {
                  label: 'Gender',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Gender is required',
                  },
                },
                options: [
                  {
                    value: 0,
                    label: 'Female',
                  },
                  {
                    value: 1,
                    label: 'Male',
                  },
                ],
              },
              {
                name: 'date_of_birth',
                type: 'text',
                textInputProps: {
                  label: 'Date of birth',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Date of birth is required',
                  },
                },
              },
              {
                name: 'nin',
                type: 'text',
                textInputProps: {
                  label: 'NIN',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'NIN is required',
                  },
                },
              },
              {
                name: 'immunization_status',
                type: 'select',
                textInputProps: {
                  label: 'Immunization Status',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Immunisation Status is required',
                  },
                },
                options: [
                  {
                    label: 'Fully Immunized',
                    value: 1,
                  },
                  {
                    label: 'Partially Immunized',
                    value: 2,
                  },
                  {
                    label: 'Not Immunized',
                    value: 3,
                  },
                ],
              },
              {
                name: 'disability',
                type: 'autocomplete',
                textInputProps: {
                  label: 'Disability',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Disability Status is required',
                  },
                },
                options: disabilities,
              },
              {
                name: 'chronic_condition',
                type: 'autocomplete',
                textInputProps: {
                  label: 'Chronic medical condition/allergies:',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'Condition is required',
                  },
                },
                options: conditions
              },
            ]}
          />
          <View style={styles.btnWrapper}>
            <View style={styles.btn}>
              <Button
                block
                color="grey" title="Cancel" onPress={() => { cancel() }} />

            </View>
            <View style={styles.btn}>
              {!isLoading ? <Button title="Register"
                block
                color="rgba(3, 136, 229, 1)"
                onPress={() => { savePatient() }}
              >
              </Button>
                :
                <TouchableOpacity
                  style={styles.activityIndicator}
                  underlayColor='rgba(3, 136, 229, 1)'
                >
                  <ActivityIndicator animating={isLoading} color="#fff" />
                </TouchableOpacity>}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%", height: "100%",
    paddingHorizontal: 20,
  },
  btnWrapper: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5,
    paddingTop: 25, marginBottom: 10
  },
  btn: {
    width: 80, marginBottom: 10
  },
  activityIndicator: {
    alignItems: "center", padding: 8, backgroundColor: "rgba(3, 136, 229, 1)"
  }
});