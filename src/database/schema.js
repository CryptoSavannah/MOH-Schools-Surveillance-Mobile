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

const PatientSchema = {
  name: 'Patient',
  primaryKey: 'pat_id',
  properties:
  {
    pat_id: { type: 'int', default: 0 },
    pat_first_name: 'string',
    pat_last_name: 'string',
    pat_gender: 'string',
    pat_dob: 'string',
    pat_nin: 'string',
    pat_nin_hash: 'string'
  }
}

module.exports = {
  PatientSchema
};