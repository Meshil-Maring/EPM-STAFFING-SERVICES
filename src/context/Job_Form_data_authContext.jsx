import React, { useState, useContext } from "react";

export const Job_Form_Data_Context = React.createContext();
function Job_Form_data_authContext({ children }) {
  let [form_details, setform_details] = useState({
    position: "",
    Location: "",
    number_of_Position: "",
    years_of_Experience: "",
    salary_min: "",
    salary_max: "",
    salary_period: "",
    job_description: "",
  });

  return (
    <Job_Form_Data_Context.Provider value={{ form_details, setform_details }}>
      {children}
    </Job_Form_Data_Context.Provider>
  );
}

export default Job_Form_data_authContext;

export const useJobForm = () => useContext(Job_Form_Data_Context);
