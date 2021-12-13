const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

let req = {
  Progress: "all",
  DateRangeField: "submitted",
  StartDateUnixEpochNumber: 1638738000000,
  EndDateUnixEpochNumber: 1639342799999,
};

fs.appendFile(
  "output.csv",
  "pdonline_id|application_number|description|decision_desc|group_code|group_desc|category_desc|assessment_officer|appeal_result|progress|date_received|date_determined|application_type|assessment_level|uselevel1|uselevel2|date_created|land_no|land_parcel_relationship|submissionindicator|newfiledate|from_layer|category|kindofrecord\n",
  function (err) {
    if (err) console.log(err);
  }
);

axios
  .post(
    "https://developmenti.brisbane.qld.gov.au/Geo/GetApplicationFilterResults",
    req
  )
  .then((res) => {
    res.data.features.map((item) => {
      let out = `${item.properties.pdonline_id}|${item.properties.application_number}|${item.properties.description}|${item.properties.decision_desc}|${item.properties.group_code}|${item.properties.group_desc}}|${item.properties.category_desc}|${item.properties.project_officer}|${item.properties.appeal_result}|${item.properties.progress}|${item.properties.date_received}|${item.properties.date_determined}|${item.properties.application_type}|${item.properties.assessment_level}|${item.properties.uselevel1}|${item.properties.uselevel2}|${item.properties.date_created}|${item.properties.land_no}|${item.properties.land_parcel_relationship}|${item.properties.submissionindicator}|${item.properties.newfiledate}|${item.properties.from_layer}|${item.properties.category}|${item.properties.kindofrecord}\n`;
      fs.appendFile("output.csv", out, function (err) {
        if (err) console.log(err);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
