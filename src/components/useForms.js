import { makeStyles } from "@material-ui/core";
import React, { Children } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export const useForms = (initialFValues,validateOnChange=false,validate) => {
  const [values, setValues] = React.useState(initialFValues);
  const [errors, setErrors] = React.useState({});

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({[name]:value})
    }
  };
  return { values, setValues, handleInputChange, setErrors, errors, resetForm };
};

export const Forms = ({ children, ...others }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off" {...others}>
      {children}
    </form>
  );
};
