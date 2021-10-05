import Realm from "realm";

class PatientSchema extends Realm.Object { }
PatientSchema.schema = {
  name: 'Patient',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    pat_first_name: 'string',
    pat_last_name: 'string',
    pat_gender: 'string?',
    pat_dob: 'string?',
    pat_nin: 'string?',
    pat_nin_hash: 'string?'
  }
};

// Create realm
let realm = new Realm({ schema: [PatientSchema], schemaVersion: 1 });

// Functions
let getAllPatients = () => {
  return realm.objects('Patient');
};

let addPatient = (fname, lname) => {
  realm.write(() => {
    var ID = realm.objects('Patient').length + 1;
    const patient = realm.create('Patient', {
      id: ID,
      pat_first_name: fname,
      pat_last_name: lname,
      // pat_gender: gender,
      // pat_dob: dob,
      // pat_nin: nin,
      // pat_nin_hash: nin_hash
    });
  });
}

// Exports
export default realm;

export {
  getAllPatients,
  addPatient,
}