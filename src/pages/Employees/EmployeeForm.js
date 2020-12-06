import { Grid } from "@material-ui/core";
import React from "react";
import { Controls } from "../../components/controls/Controls";
import { useForms, Forms } from "../../components/useForms";
import * as employeeService from "./../../Services/employeeService";
const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  ispermanent: false,
};
const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const EmployeeForm = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x == "");
  };

  const { values, setErrors, errors, handleInputChange, resetForm } = useForms(
    initialFValues,
    true,
    validate
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employeeService.getAllEmployees());
    if (validate()) {
      employeeService.insertEmployees(values);
      resetForm();
    }
  };

  return (
    <Forms onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Full Name"
            value={values.fullName}
            name="fullName"
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label="Email"
            value={values.email}
            name="email"
            error={errors.email}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Mobile"
            value={values.mobile}
            name="mobile"
            error={errors.mobile}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="City"
            value={values.city}
            name="city"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            items={genderItems}
            onChange={handleInputChange}
          />
          <Controls.Select
            name="departmentId"
            value={values.departmentId}
            onChange={handleInputChange}
            error={errors.departmentId}
            label="Department"
            options={employeeService.getDepartmentCollection()}
          />

          <Controls.DatePicker
            name="hireDate"
            value={values.hireDate}
            onChange={handleInputChange}
            label="Hire Date"
          />
          <Controls.CheckBox
            name="ispermanent"
            value={values.ispermanent}
            onChange={handleInputChange}
            label="Permanent Employee"
          />

          <div>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Forms>
  );
};

export default EmployeeForm;
