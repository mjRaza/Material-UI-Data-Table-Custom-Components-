import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination,
  TableSortLabel,
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

const useTable = (records, headCells, filterFn) => {
  const classes = useStyles();

  //adding Pagination properties
  //-----------------------------//
  const pages = [5, 10, 25];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
  //Sorting Properties
  //-----------------------------//
  const [orderBy, setOrderBy] = React.useState();
  const [order, setOrder] = React.useState();

  //this is table Container
  const TableContianer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  //this is table header you can skip this if u want.
  const TableHeader = (props) => {
    // Sorting
    //-----------------------------//
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell ? order : "asc"}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
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
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((e1) => e1[0]);
  };
  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => desendingComparator(a, b, orderBy)
      : (a, b) => -desendingComparator(a, b, orderBy);
  };
  const desendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
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
