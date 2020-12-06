import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  label: {
    textTransform: "none",
  },
}));

const Button = ({ text, size, color, variant, onClick, ...other }) => {
  const classes = useStyles();
  return (
    <MuiButton
      classes={{ root: classes.root, label: classes.label }}
      variant={variant || "contained"}
      color={color || "primary"}
      onClick={onClick}
      size={size || "large"}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
