import Realm from "realm";

// Declare Book Schema
// class BookSchema extends Realm.Object {}
// BookSchema.schema = {
//     name: 'Book',
//     properties: {
//         title: 'string',
//         pages:  'int',
//         edition: 'int?',
//         author: 'Author?'
//     }
// };

// const UserSchema = {
//   name: 'User',
//   properties: {
//     userName: 'string',
//     userToken: 'string',
//     role: 'string',
//     indicatorList: { type: 'string?[]' }
//   },
// };

// const SubmisionSchema = {
//   name: 'Submission',
//   properties: {
//     IndicatorN: 'string',
//     variableList: { type: 'string?[]' }
//   },
// };

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
// Return all patients
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
// Export the realm so other files can access it
export default realm;

// Export other functions so other files can access it
export {
  getAllPatients,
  addPatient,
}