import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Patient from "../screens/Patient";
import PatientForm from "../screens/PatientForm";

export const createNavigation = props =>
    createStackNavigator(
      {
        Home: {
          // We have to use a little wrapper because React Navigation doesn't pass simple props (and withObservables needs that)
          screen: ({ navigation }) => {
            const { database } = props;
            return <Home database={database} navigation={navigation} />;
          },
          navigationOptions: { title: "Cases" }
        },
        Patient: {
          screen: ({ navigation }) => (
            <Patient
              patient={navigation.state.params.patient}
              navigation={navigation}
            />
          ),
          navigationOptions: ({ navigation }) => ({
            name: navigation.state.params.patient.name
          })
        },
        NewPatient: {
          screen: ({ navigation }) => {
            const { database } = props;
            return <PatientForm database={database} navigation={navigation} />;
          },
          navigationOptions: { title: "New Patient" }
        },
        EditPatient: {
          screen: ({ navigation }) => {
            return (
              <PatientForm
                patient={navigation.state.params.patient}
                navigation={navigation}
              />
            );
          },
          navigationOptions: ({ navigation }) => ({
            name: `Edit "${navigation.state.params.patient.name}"`
          })
        }
      },
      {
        initialRouteName: "Home",
        initialRouteParams: props
      }
  );
