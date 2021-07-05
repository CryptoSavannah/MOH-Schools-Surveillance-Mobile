import React, { useState, useEffect, useRef } from 'react';

import axios from "axios";
import { PATIENTS_KEY, PATIENT_KEY, CONDITIONS_KEY, CASE_KEY } from '../../env.json';

var servPatients =
{
  "status": 200,
  "data": [
    { "patient_id": 1, "fname": "Rachael", "lname": "Kembi", "nin": "TH1234", "nin_hash": "375B0072BEFC790CE0A3F6A9C2B27C75020B7A97BCCCBA52D000806E8959882A", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-27T02:16:32.544Z" },
    { "patient_id": 6, "fname": "Brian", "lname": "Aine", "nin": "TH123", "nin_hash": "375B0072BEFC790CE0A3F6A9C2B27C75020B7A97BCCCBA52D000806E895988A", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T13:59:01.826Z" },
    { "patient_id": 8, "fname": "Dee", "lname": "Obura", "nin": "TH12", "nin_hash": "375B0072BEFC790CE0A3F6A9C2B27C75020B7A97BCCCBA52D000806E895988", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T14:04:11.415Z" },
    // { "patient_id": 15, "fname": "Jane", "lname": "Doe", "nin": "${idNum}", "nin_hash": "${hash}", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T14:16:21.334Z" },
    { "patient_id": 16, "fname": "Jane", "lname": "Doe", "nin": "Mndtgff", "nin_hash": "a018e0133c9536a8233bc0cc083b24c0af8ef79615bb7ec7bbad8398506f3064", "gender": "F", "dob": "2020-09-14T21:00:00.000Z", "date_added": "2020-10-29T14:18:15.504Z" }
  ]
};

var servConditions = {
  "status": 200, "data": [
    { "condition_id": 2, "condition": "headache", "date_added": "2020-10-27T00:55:53.746Z" },
    { "condition_id": 3, "condition": "fever", "date_added": "2020-10-27T00:56:05.479Z" },
    { "condition_id": 4, "condition": "dysentry", "date_added": "2020-10-27T01:48:22.268Z" },
    { "condition_id": 5, "condition": "abdonimal pain", "date_added": "2020-10-27T00:55:53.746Z" },
    { "condition_id": 6, "condition": "cough", "date_added": "2020-10-27T00:56:05.479Z" },
    { "condition_id": 7, "condition": "flue", "date_added": "2020-10-27T01:48:22.268Z" },
    { "condition_id": 12, "condition": "vomiting", "date_added": "2020-10-27T00:55:53.746Z" },
    { "condition_id": 13, "condition": "weakness", "date_added": "2020-10-27T00:56:05.479Z" },
    { "condition_id": 14, "condition": "chest pain", "date_added": "2020-10-27T01:48:22.268Z" },
    { "condition_id": 15, "condition": "muscle pain", "date_added": "2020-10-27T00:55:53.746Z" },
    { "condition_id": 16, "condition": "drousiness", "date_added": "2020-10-27T00:56:05.479Z" },
    { "condition_id": 17, "condition": "forgetfullness", "date_added": "2020-10-27T01:48:22.268Z" }
  ]
}

export const fetchPatients = async () => {

//   let pats = [];

//   servPatients.data.map(x => {
//     let date = new Date(x.dob);
//     pats.push({
//       id: x.patient_id,
//       nin: x.nin,
//       nin_hash: x.nin_hash,
//       name: x.fname + ' ' + x.lname,
//       dob: date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1),
//       gender: x.gender
//     });
//   });

//   setPatients(pats);

//   var config = {
//     method: 'get',
//     url: PATIENTS_KEY,
//     headers: {
//       'Authorization': `Bearer ${userToken}`
//     }
//   };

  // console.log(JSON.stringify(config));

  // await axios(config)
  //   .then(res => {
  //     let ps = [];
  //     ps = res.data;

  //     let pats = [];

  //     console.log("Patients: " + JSON.stringify(ps));

  //     ps.map(x => {
  //       let date = new Date(x.dob);
  //       pats.push({
  //         id: x.patient_id,
  //         nin: x.nin,
  //         nin_hash: x.nin_hash,
  //         name: x.fname + ' ' + x.lname,
  //         dob: date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() + 1),
  //         gender: x.gender
  //       });
  //     });
  //     setPatients(pats);
  //   })
  //   .catch((error) => {
  //     console.error("Fetching Patients: " + error);
  //   });

  return servPatients
};

export const fetchChronicConditions = async () => {
  // let conds = [];

  // servConditions.data.map(x => {
  //   conds.push({
  //     id: x.condition_id,
  //     name: x.condition,
  //   });
  // });

//   setConditions(conds);

//   var config = {
//     method: 'get',
//     url: CONDITIONS_KEY,
//     headers: {
//       'Authorization': `Bearer ${userToken}`
//     }
//   };

  // console.log(JSON.stringify(config));

  // await axios(config)
  //   .then(res => {
  //     let ps = [];
  //     ps = res.data;
  //     let conds = [];
  //     console.log("Conditions: " + JSON.stringify(ps));
  //     ps.data.map(x => {
  //       conds.push({
  //         id: x.condition_id,
  //         name: x.condition,
  //       });
  //     });
  //     setConditions(conds);
  //   })
  //   .catch((error) => {
  //     console.error("Fetching Conditions: " + error);
  //   });

  return {"status": 200, "data": [{ "id":1,"condition_name": "Asthma"},
  {"id":2, "condition_name":"Sickle cell disease"},
  {"id":3, "condition_name":"TB on treatment"},
  {"id":4, "condition_name":"Cancer"},
  {"id":5, "condition_name":"Epilepsy"},
  {"id":6, "condition_name":"Chronic / congenital heart disease"},
  {"id":7, "condition_name":"Mental disorder"},
  {"id":8, "condition_name":"Diabetes"},
  {"id":9, "condition_name":"HIV/AIDS"},
  {"id":10, "condition_name":"Food/ medicine allergies"},
  {"id":11, "condition_name":"Other medical conditions/ allergies"},
  {"id":12, "condition_name":"Covid"},
]};
};

export const fetchConditions = async () => {
  // let conds = [];

  // servConditions.data.map(x => {
  //   conds.push({
  //     id: x.condition_id,
  //     name: x.condition,
  //   });
  // });

//   setConditions(conds);

//   var config = {
//     method: 'get',
//     url: CONDITIONS_KEY,
//     headers: {
//       'Authorization': `Bearer ${userToken}`
//     }
//   };

  // console.log(JSON.stringify(config));

  // await axios(config)
  //   .then(res => {
  //     let ps = [];
  //     ps = res.data;
  //     let conds = [];
  //     console.log("Conditions: " + JSON.stringify(ps));
  //     ps.data.map(x => {
  //       conds.push({
  //         id: x.condition_id,
  //         name: x.condition,
  //       });
  //     });
  //     setConditions(conds);
  //   })
  //   .catch((error) => {
  //     console.error("Fetching Conditions: " + error);
  //   });

  return servConditions;
};