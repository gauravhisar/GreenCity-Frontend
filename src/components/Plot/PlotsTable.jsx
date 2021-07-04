import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import InlineEditingForm, {
  InlineCreateForm,
  InlineWarning,
} from "./InlineForm";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    console.log("order", order);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  title,
  base_url,
  project_details,
  setProjectDetails,
}) {
  const endpoint = base_url + "plots/";
  const classes = useStyles();
  const history = useHistory();
  const [plots, setPlots] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [currentlyCreating, setCurrentlyCreating] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState(-1);
  const [deleteIdx, setDeleteIdx] = React.useState(-1);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("plot_no");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const saveItem = (new_obj) => {
    return axios
      .post(endpoint, new_obj)
      .then((response) => {
        console.log(response.data);
        // we need to add this code if we want to change total_area and total_plots hand to hand
        // new_project_details.total_plots += 1
        // new_project_details.total_area += response.data.area
        setProjectDetails({
          ...project_details,
          plots: {
            ...project_details.plots,
            [response.data.id]: response.data,
          },
        });
        return true;
      })
      .catch((error) => {
        alert("Network Error! Try Again");
        console.log(error);
        return false;
      });
  };

  const updateItem = (new_obj) => {
    return axios
      .put(endpoint + `${new_obj.id}/`, new_obj)
      .then((response) => {
        console.log(response.data);
        const new_project_details = { ...project_details };
        new_project_details.plots[response.data.id] = response.data;
        setProjectDetails(new_project_details);
        return true;
      })
      .catch((errors) => {
        alert("Network Error! Start Server and Try Again");
        console.log(errors);
        return false;
      });
  };

  const deleteItem = (plot) => {
    // id,new_obj
    return axios
      .delete(endpoint + `${plot.id}/`)
      .then((response) => {
        const new_project_details = { ...project_details };
        delete new_project_details.plots[plot.id];
        setProjectDetails(new_project_details);
        console.log("Successfully Deleted! ", response);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const deleteMultipleItems = () => {
    // will delete the selected elements in one go
    selected.forEach((plot_id) => {
      deleteItem({ id: plot_id });
    });
    setSelected([]);
  };

  React.useEffect(() => {
    setPlots([...Object.values(project_details.plots)]);
  }, [project_details]);
  React.useEffect(() => {
    setRowsPerPage(plots.length);
  }, [plots]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const goToPlotDetails = (plot) => {
    history.push(`/projects/${plot.project_id}/plots/${plot.id}`);
  };
  const goToDealerDetails = (plot) => {
    if (plot.deal){
      history.push(`/dealers/${plot.deal.dealer.id}`);
    }
  };
  const goToCustomerDetails = (plot) => {
    if (plot.deal){
      history.push(`/customers/${plot.deal.customer.id}`);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          setCurrentlyCreating={setCurrentlyCreating}
          deleteMultipleItems={deleteMultipleItems}
          plots={plots}
          rows={rows}
          setRows={setRows}
        />
        <TableContainer id="plots-table">
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {currentlyCreating && (
                <InlineCreateForm
                  setCurrentlyCreating={setCurrentlyCreating}
                  saveItem={saveItem}
                />
              )}

              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const currentlyEditing = row.id === editIdx;
                  const currentlyDeleting = row.id === deleteIdx;

                  if (currentlyDeleting) {
                    return (
                      <InlineWarning
                        key={row.id}
                        obj={row}
                        setDeleteIdx={setDeleteIdx}
                        deleteItem={deleteItem}
                      />
                    );
                  } else {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            fontSize="small"
                            onClick={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        {currentlyEditing ? (
                          <InlineEditingForm
                            title="Plots"
                            obj={row}
                            setEditIdx={setEditIdx}
                            updateItem={updateItem}
                          />
                        ) : (
                          <>
                            <TableCell align="left" padding="none">
                              <EditIcon
                                style={{
                                  cursor: "pointer",
                                  paddingRight: "5px",
                                }}
                                onClick={() => {
                                  setEditIdx(row.id);
                                }}
                              />
                              <DeleteIcon
                                style={{ cursor: "pointer" }}
                                fontSize="small"
                                onClick={() => {
                                  setDeleteIdx(row.id);
                                }}
                              />
                            </TableCell>
                           
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                style={{cursor: "pointer" ,fontWeight: "bold" }}
                                onClick={() => goToPlotDetails(row)}
                              >
                                {row.plot_no}
                              </TableCell>
                              <TableCell align="left" padding="none" style = {{cursor: "pointer"}} onClick={() => goToPlotDetails(row)}>
                                {row.area}
                              </TableCell>
                              <TableCell align="left" padding="none" style = {{cursor: "pointer"}} onClick={() => goToPlotDetails(row)}>
                                {row.rate}
                              </TableCell>
                              <TableCell align="left" padding="none" style = {{cursor: "pointer"}} onClick={() => goToPlotDetails(row)}>
                                {row.plc}
                              </TableCell>
                          </>
                        )}
                        <TableCell align="left" padding="none" style = {{cursor: "pointer"}} onClick={() => goToPlotDetails(row)}>
                          {row.amount}
                        </TableCell>
                        <TableCell align="center" padding="none" style = {{cursor: "pointer"}}  onClick = {()=>goToDealerDetails(row)}>
                          {row.dealer_name}
                        </TableCell>
                        <TableCell align="center" padding="none" style = {{cursor: "pointer"}} onClick = {()=>goToCustomerDetails(row)}>
                          {row.customer_name}
                        </TableCell>
                        <TableCell align="center" padding="none">
                          {row.total_commission_paid}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.balance}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.next_due_date
                            ? `${row.next_due_date.getDate()}-${
                                row.next_due_date.getMonth() + 1
                              }-${row.next_due_date.getFullYear()}`
                            : null}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.next_payable_amount}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[0, 5, plots.length]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
