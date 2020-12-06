import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/controls/useTable";
import * as employeeService from "../../Services/employeeService";
import { Controls } from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  search: {
    width: "75%",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department", disableSorting: true },
];
const Employees = () => {
  const classes = useStyles();

  const [records, setRecords] = React.useState(
    employeeService.getAllEmployees()
  );
  const [filterFn, setFilterFn] = React.useState({ fn: (item) => item });

  const {
    TableContianer,
    TableHeader,
    TablePaginationAction,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    const target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == "") {
          return items;
        } else {
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
        }
      },
    });
  };
  return (
    <>
      <PageHeader
        icon={<PeopleOutlineIcon fontSize="large" />}
        title="New Employee"
        subtitle="Form design with validations"
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            name=""
            className={classes.search}
            label="Search Employee"
            // value={}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        <TableContianer>
          <TableHeader />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContianer>
        <TablePaginationAction />
      </Paper>
    </>
  );
};

export default Employees;
