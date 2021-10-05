
export const fetchChronicConditions = async () => {
  return {
    "status": 200, "data": [{ "id": 1, "condition_name": "Asthma" },
    { "id": 2, "condition_name": "Sickle cell disease" },
    { "id": 3, "condition_name": "TB on treatment" },
    { "id": 4, "condition_name": "Cancer" },
    { "id": 5, "condition_name": "Epilepsy" },
    { "id": 6, "condition_name": "Chronic / congenital heart disease" },
    { "id": 7, "condition_name": "Mental disorder" },
    { "id": 8, "condition_name": "Diabetes" },
    { "id": 9, "condition_name": "HIV/AIDS" },
    { "id": 10, "condition_name": "Food/ medicine allergies" },
    { "id": 11, "condition_name": "Other medical conditions/ allergies" },
    { "id": 12, "condition_name": "Covid" },
    ]
  };
};

export const fetchDisabilities = async () => {
  return {
    "status": 200, "data": [{ "id": "0", "disability_name": "None" },
    { "id": "1", "disability_name": "Difficulty in seeing" },
    { "id": "2", "disability_name": "Albinism" },
    { "id": "3", "disability_name": "Difficulty in hearing" },
    { "id": "4", "disability_name": "Delayed age specific motor development" },
    { "id": "5", "disability_name": "Delayed age specific height for age (dwarfism)" },
    { "id": "6", "disability_name": "Difficulty understanding" },
    { "id": "7", "disability_name": "Difficulty in remembering" },
    { "id": "8", "disability_name": "Difficulty in writing" },
    { "id": "9", "disability_name": "Difficulty washing all over or dressing" },
    { "id": "10", "disability_name": "Mentally impared" },
    { "id": "11", "disability_name": "Emotionally impared" },
    ]
  };
};

export const fetchReportFields = async () => {
  return {
    "status": 200, "data": [
      {
        "Description": "Serial No",
        "IndicatorID": "17",
        "Name": "Serial No",
        "data": [{
          "dataLabel": "text",
          "dataType": null,
          "varID": "17"
        }]
      },
      {
        "Description": "Nin or Unique ID",
        "IndicatorID": "18",
        "Name": "NIN",
        "data": [{
          "dataLabel": "text",
          "dataType": null,
          "varID": "18"
        }]
      },
      {
        "Description": "Date Of Birth",
        "IndicatorID": "191",
        "Name": "DOB",
        "data": [
          {
            "dataLabel": "DOB",
            "dataType": "date",
            "varID": "191"
          }
        ]
      },
      {
        "Description": "National or Refugee",
        "IndicatorID": "20",
        "Name": "Category",
        "data": [
          {
            "dataLabel": "National",
            "dataType": "radio",
            "varID": "20"
          },
          {
            "dataLabel": "Refugee",
            "dataType": "radio",
            "varID": "21"
          }
        ]
      },
      {
        "Description": "Immunization Status",
        "IndicatorID": "21",
        "Name": "Immunization Status",
        "data": [
          {
            "dataLabel": "radio",
            "dataType": null,
            "varID": "27"
          },
          {
            "dataLabel": "(N) Not Immunized",
            "dataType": "radio",
            "varID": "28"
          },
          {
            "dataLabel": "(P) Partially Immunized",
            "dataType": "radio",
            "varID": "29"
          },
          {
            "dataLabel": "(F) Fully Immunized",
            "dataType": "radio",
            "varID": "30"
          }
        ]
      }
    ]

  }
}

