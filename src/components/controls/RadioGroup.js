import React from "react";
import {
  FormControl,
  RadioGroup as MUIRadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";

export const RadioGroup = ({ name, label, value, onChange, items }) => {
  return (
    <div>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <MUIRadioGroup row name={name} value={value} onChange={onChange}>
          {items.map((x, index) => (
            <FormControlLabel
              key={index}
              value={x.id}
              control={<Radio />}
              label={x.title}
            />
          ))}
        </MUIRadioGroup>
      </FormControl>
    </div>
  );
};
