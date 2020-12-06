import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

const Select = ({ name, label, value, onChange, options, error = null }) => {
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect name={name} value={value} onChange={onChange} label={label}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {options.map((x, index) => (
          <MenuItem key={index} value={x.id}>
            {x.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
