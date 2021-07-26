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
      id: "customer_name",
      numeric: false,
      disablePadding: false,
      label: "Customer",
      align: "left",
    },
    {
      id: "dealer_name",
      numeric: false,
      disablePadding: false,
      label: "Dealer",
      align: "left",
    },
    {
      id: "plot_no",
      numeric: true,
      disablePadding: false,
      label: "PlotNo",
      align: "right",
    },
    {
      id: "area",
      numeric: true,
      disablePadding: true,
      label: "Area",
      align: "right",
    },
    {
      id: "rate",
      numeric: true,
      disablePadding: true,
      label: "Rate",
      align: "right",
    },
    {
      id: "plc",
      numeric: true,
      disablePadding: true,
      label: "PLC",
      align: "right",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: true,
      label: "Amount",
      align: "right",
    },
    {
      id: "total_commission_paid",
      numeric: true,
      disablePadding: true,
      label: "Commission",
      align: "right",
    },
    {
      id: "total_rebate",
      numeric: true,
      disablePadding: true,
      label: "Rebate",
      align: "right",
    },
    {
      id: "total_interest_given",
      numeric: true,
      disablePadding: true,
      label: "Interest Given",
      align: "right",
    },
    {
      id: "total_amount_received",
      numeric: true,
      disablePadding: true,
      label: "Amount Received",
      align: "right",
    },
    {
      id: "balance",
      numeric: true,
      disablePadding: false,
      label: "Balance",
      align: "right",
    },
    {
      id: "next_due_date",
      numeric: true,
      disablePadding: true,
      // paddingLeft: "8px",
      label: "Next DueDate",
      align: "right",
    },
    {
      id: "next_payable_amount",
      numeric: true,
      disablePadding: false,
      paddingRight: "40px",
      // paddingLeft
      label: "Payable Amount",
      align: "right",
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
              align={headCell.align}
              // padding={headCell.disablePadding ? 'none' : 'default'}
              padding="none"
              style={{ fontWeight: "bold", paddingRight: headCell.paddingRight }}
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

  export {headCells}
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };