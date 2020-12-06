import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination,
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

const useTable = (records, headCells) => {
  const classes = useStyles();

  //adding Pagination properties
  //-----------------------------//
  const pages = [5, 10, 25];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
  //-----------------------------//

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

  //table Pagination COmponent
  //-----------------------------//
  const handleChangePage = (e, newPage) => {
    console.log("handleChangePage", newPage);

    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    console.log("handleRowsPerPage", e.target.value);
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const TablePaginationAction = (props) => {
    return (
      <TablePagination
        rowsPerPageOptions={pages}
        // colSpan={3}
        component="div"
        count={records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleRowsPerPage}
      />
    );
  };

  const recordsAfterPagingAndSorting = () => {
    return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  //-----------------------------//

  return {
    TableContianer,
    TableHeader,
    TablePaginationAction,
    recordsAfterPagingAndSorting,
  };
};
export default useTable;
