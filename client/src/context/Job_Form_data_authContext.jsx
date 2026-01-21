import React, { useState } from "react";

export const Job_Form_Data_Context = React.createContext(null);

function Job_Form_data_authContext({ children }) {
  const [form_details, setform_details] = useState({
    "job title": "",
    urgent: "",
    location: "",
    "job type": "",
    "salary range": "",
    "experience required": "",
    "max applications": "",
    "application deadline": "",
    "job description": "",
    requirements: [],
    "key responsibilities": [],
    "benefits & perks": [],
  });

  return (
    <Job_Form_Data_Context.Provider value={{ form_details, setform_details }}>
      {children}
    </Job_Form_Data_Context.Provider>
  );
}

export default Job_Form_data_authContext;
