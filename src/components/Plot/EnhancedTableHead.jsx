import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

const headCells = [
    {
      id: "actions",
      numeric: true,
      disablePadding: true,
      label: "Actions",
      align: "left",
    },
    {
      id: "plot_no",
      numeric: true,
      disablePadding: true,
      label: "PlotNo",
      align: "left",
    },
    {
      id: "area",
      numeric: true,
      disablePadding: true,
      label: "Area",
      align: "left",
    },
    {
      id: "rate",
      numeric: true,
      disablePadding: true,
      label: "Rate",
      align: "left",
    },
    {
      id: "plc",
      numeric: true,
      disablePadding: true,
      label: "PLC",
      align: "left",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: true,
      label: "Amount",
      align: "left",
    },
    {
      id: "dealer",
      numeric: false,
      disablePadding: false,
      label: "Dealer",
      align: "left",
    },
    {
      id: "customer",
      numeric: false,
      disablePadding: false,
      label: "Customer",
      align: "left",
    },
    {
      id: "commission",
      numeric: true,
      disablePadding: true,
      label: "Commission",
      align: "left",
    },
    {
      id: "balance",
      numeric: true,
      disablePadding: false,
      label: "Balance",
      align: "left",
    },
    {
      id: "next_due_date",
      numeric: true,
      disablePadding: false,
      label: "Next Due Date",
      align: "left",
    },
    {
      id: "next_due_amount",
      numeric: true,
      disablePadding: false,
      label: "Payable Amount",
      align: "left",
    },
  ];
  

export default function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.align}
              // padding={headCell.disablePadding ? 'none' : 'default'}
              padding="none"
              style={{ fontWeight: "bold" }}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };