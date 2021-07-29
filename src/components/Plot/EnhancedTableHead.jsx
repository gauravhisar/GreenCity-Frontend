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
      padding: "0px 0px 0px 0px",
      label: "Actions",
      align: "left",
    },
    {
      id: "customer_name",
      numeric: false,
      disablePadding: true,
      padding: "0px 0px 0px 0px",
      label: "Customer",
      align: "left",
    },
    {
      id: "dealer_name",
      numeric: false,
      disablePadding: true,
      padding: "0px 0px 0px 0px",
      label: "Dealer",
      align: "left",
    },
    {
      id: "plot_no",
      numeric: true,
      disablePadding: true,
      paddingRight: "10px",
      padding: "0px 0px 0px 12px",
      label: "PlotNo",
      align: "left",
    },
    {
      id: "area",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      label: "Area",
      align: "left",
    },
    {
      id: "rate",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      paddingRight: "16px",
      label: "Rate",
      align: "left",
    },
    {
      id: "plc",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      label: "PLC",
      align: "left",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 0px",
      paddingRight: '16px',
      label: "Amount",
      align: "left",
    },
    {
      id: "total_commission_paid",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      label: "Commission",
      align: "left",
    },
    {
      id: "total_rebate",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 0px",
      label: "Rebate",
      align: "left",
    },
    {
      id: "total_interest_given",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      label: "Interest Given",
      align: "left",
    },
    {
      id: "total_amount_received",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      label: "Amount Received",
      align: "left",
    },
    {
      id: "balance",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      label: "Balance",
      align: "left",
    },
    {
      id: "oldest_due_date",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      // paddingLeft: "8px",
      label: "Oldest DueDate",
      align: "left",
    },
    {
      id: "next_due_date",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 12px",
      // paddingLeft: "8px",
      label: "Next DueDate",
      align: "left",
    },
    {
      id: "next_payable_amount",
      numeric: true,
      disablePadding: true,
      padding: "0px 0px 0px 0px",
      paddingRight: "30px",
      // paddingLeft
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
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'default'}
              // padding="none"
              style={{ fontWeight: "bold", padding: headCell.padding }}
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