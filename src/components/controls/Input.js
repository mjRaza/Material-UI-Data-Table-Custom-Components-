import React from "react";
import { TextField } from "@material-ui/core";
export const Input = ({
  name,
  label,
  value,
  onChange,
  error = null,
  ...other
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
};
