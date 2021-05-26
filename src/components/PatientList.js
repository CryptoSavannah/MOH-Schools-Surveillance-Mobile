import React from "react";

import { Q } from "@nozbe/watermelondb";
import withObservables from "@nozbe/with-observables";

import RawPatientItem from './RawPatientItem';
import { List } from "native-base";

const PatientItem = withObservables(["patient"], ({ patient }) => ({
  patient: patient.observe()
}))(RawPatientItem);


const PatientList = ({ patients, navigation }) => (
  <List>
    {patients.map(patient => (
      <PatientItem
        key={patient.id}
        patient={patient}
        // countObservable={patient.reviews.observeCount()}
        onPress={() => navigation.navigate("Patient", { patient })}
      />
    ))}
  </List>
);

// withObservables is HOC(Higher Order Component) to make any React component reactive.
const enhance = withObservables(["search"], ({ database, search }) => ({
  patients: database.collections
    .get("patients")
    .query(Q.where("fname", Q.like(`%${Q.sanitizeLikeString(search)}%`)))
  // .query(Q.where("lname", Q.like(`%${Q.sanitizeLikeString(search)}%`)))

}));

export default enhance(PatientList);