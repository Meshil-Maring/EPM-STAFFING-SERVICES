import React, { useState } from "react";

export const Job_Form_Data_Context = React.createContext(null);

function Job_Form_data_authContext({ children }) {
  const [form_details, setform_details] = useState({
    position: "",
    Location: "",
    "number of Position": "",
    "years of Experience": "",
    "salary min": "",
    "salary max": "",
    "salary period": "",
    "job description": "",
  });

  return (
    <Job_Form_Data_Context.Provider value={{ form_details, setform_details }}>
      {children}
    </Job_Form_Data_Context.Provider>
  );
}

export default Job_Form_data_authContext;
