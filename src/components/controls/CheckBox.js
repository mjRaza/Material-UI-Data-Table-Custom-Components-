import {
  Checkbox as MuiCheckBox,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";

export const CheckBox = ({ name, label, value, onChange }) => {
  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckBox
            color="primary"
            name={name}
            checked={value}
            onChange={(e) =>
              onChange(convertToDefaultEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
};
{
  /* <Checkbox name={name} checked={value} onChange={onChange} /> */
}
