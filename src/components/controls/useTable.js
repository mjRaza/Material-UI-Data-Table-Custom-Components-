import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: "blue",
      backgroundColor: "lightgray",
    },

    "& tbody td": {
      fontWeight: "600",
    },

    "& tbody tr:hover": {
      backgroundColor: "#fffb2f",
      cursor: "pointer",
    },
  },
}));

const useTable = (record, headCells) => {
  const classes = useStyles();

  //this is table Container
  const TableContianer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  //this is table header you can skip this if u want.
  const TableHeader = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return { TableContianer, TableHeader };
};
export default useTable;
