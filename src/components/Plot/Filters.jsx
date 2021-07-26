import React, { useState, useEffect, useContext} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { headCells } from "./EnhancedTableHead";
import { ProjectContext } from "../../Context";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Filters({ plots, rows, setRows }) {
  const classes = useStyles();
  const [search_query, setSearchQuery] = useState("");
  const [search_column, setSearchColumn] = useState("dealer_name");
  const lowerCaseQuery = search_query.toLowerCase();
  const {filters, setFilters} = useContext(ProjectContext)
  // useState({
  //   sold: false,
  //   unsold: false,
  //   pending: false,
  //   apply_dates: false,
  //   start_date: new Date().toISOString().substring(0, 10),
  //   end_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
  //     .toISOString()
  //     .substring(0, 10),
  // });

  useEffect(() => {
    let new_rows = [...plots];
    new_rows.forEach((row) => {
      // row.plot_no = row.plot_no
      if (row.deal) {
        row.balance = row.deal.balance;
        row.dealer_name = row.deal.dealer.name;
        row.customer_name = row.deal.customer.name;
        row.total_commission_paid = row.deal.total_commission_paid;
        row.total_interest_given = row.deal.total_interest_given;
        row.total_rebate = row.deal.total_rebate; 
        row.total_amount_received = row.deal.total_amount_paid
        // row.total_amount_received = row.deal.total_amount_paid;
        if (row.deal.unpaid_dues.length) {
          // row.next_due_date = row.deal.unpaid_dues[0].due_date;
          row.next_due_date = new Date(row.deal.unpaid_dues[0].due_date);
          row.next_payable_amount = row.deal.unpaid_dues[0].payable_amount - row.deal.unpaid_dues[0].paid;
        } else {
          row.next_due_date = null;
          row.next_payable_amount = null;
        }
      } else {
        row.balance = null;
        row.dealer_name = null;
        row.customer_name = null;
        row.total_commission_paid = null;
        row.total_interest_given = null;
        row.total_rebate = null; 
        row.total_amount_received = null;
      }
    });
    setRows(new_rows);
  }, [plots,setRows]);

  useEffect(() => {
    let new_rows = [];
    if (filters.sold) {
      if (filters.pending) {
        new_rows = [...plots].filter((row) => row.deal && row.deal.penalty);
      } else {
        new_rows = [...plots].filter((plot) => plot.deal);
      }
    }
    if (filters.unsold && !filters.pending) {
      new_rows = [...new_rows, ...[...plots].filter((plot) => !plot.deal)];
    }

    if (filters.apply_dates) {
      new_rows = new_rows.filter((row) => {
        return row.deal && row.deal.unpaid_dues.find((due) => {
          let due_date = new Date(due.due_date).getTime()
          return new Date(filters.start_date).getTime() <= due_date &&   due_date <= new Date(filters.end_date).getTime()
        });
      });
    }
    if (lowerCaseQuery) {
      new_rows = new_rows.filter((row) => {
        return (
          `${row[search_column]}` &&
          `${row[search_column]}`.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }
    setRows(new_rows);
  }, [
    plots,
    lowerCaseQuery,
    search_column,
    setRows,
    filters.sold,
    filters.unsold,
    filters.pending,
    filters.apply_dates,
    filters.start_date,
    filters.end_date,
  ]);

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="search-column">Column</InputLabel>
        <Select
          labelId="search-column"
          id="search-column"
          value={search_column}
          onChange={(e) => {
            setSearchColumn(e.target.value);
          }}
        >
          {headCells
            .filter((headCell) => {
              return headCell.id !== "actions";
            })
            .map((headCell) => {
              return (
                <MenuItem key={headCell.id} value={headCell.id}>
                  {headCell.label}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <TextField
        label="Query"
        style={{ margin: "0px 5px", minWidth: "120px" }}
        value={search_query}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <TextField
        label="Start Date"
        type="date"
        value={filters.start_date}
        onChange = {(e)=>{
          setFilters({...filters, start_date: e.target.value, apply_dates: false})
        }}
        InputLabelProps={{ shrink: true }}
        style={{ margin: "0px 5px", minWidth: "130px" }}
      />
      <TextField
        label="End Date"
        type="date"
        value={filters.end_date}
        onChange = {(e)=>{
          setFilters({...filters, end_date: e.target.value, apply_dates: false})
        }}
        InputLabelProps={{ shrink: true }}
        style={{ margin: "0px 5px", minWidth: "130px" }}
      />

      <FormControlLabel
        value="apply-dates"
        control={
          <Switch
            size="small"
            color="primary"
            checked={filters.apply_dates}
            onChange={() => {
              setFilters({
                ...filters,
                apply_dates: !filters.apply_dates,
              });
            }}
          />
        }
        label="ApplyDates"
        labelPlacement="top"
      />
      <FormControlLabel
        value="Sold"
        control={
          <Switch
            size="small"
            color="primary"
            checked={filters.sold}
            onChange={() => {
              setFilters({
                ...filters,
                sold: !filters.sold,
              });
            }}
          />
        }
        label="Sold"
        labelPlacement="top"
      />
      <FormControlLabel
        value="Unsold"
        control={
          <Switch
            size="small"
            color="primary"
            checked={filters.unsold}
            onChange={() => {
              setFilters({
                ...filters,
                unsold: !filters.unsold,
              });
            }}
          />
        }
        label="Unsold"
        labelPlacement="top"
      />
      <FormControlLabel
        value="Pending"
        control={
          <Switch
            size="small"
            color="primary"
            checked={filters.pending}
            onChange={() => {
              setFilters({
                ...filters,
                pending: !filters.pending,
              });
            }}
          />
        }
        label="Pending"
        labelPlacement="top"
      />
    </>
  );
}
