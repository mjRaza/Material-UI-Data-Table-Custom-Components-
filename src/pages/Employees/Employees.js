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
} from "@material-ui/core";
import useTable from "../../components/controls/useTable";
import * as employeeService from "../../Services/employeeService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
];
const Employees = () => {
  const classes = useStyles();

  const [records, setRecords] = React.useState(
    employeeService.getAllEmployees()
  );

  const {
    TableContianer,
    TableHeader,
    TablePaginationAction,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells);
  return (
    <>
      <PageHeader
        icon={<PeopleOutlineIcon fontSize="large" />}
        title="New Employee"
        subtitle="Form design with validations"
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
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
