import React from "react";
import xlsx from "xlsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import Filters from "./Filters";



function exportToExcel(plots) {
  let rows = plots.map((plot) => {
    return {
      PlotNo: plot.plot_no,
      Area: plot.area,
      Rate: plot.rate,
      PLC: plot.plc,
      Amount: plot.amount,
      Dealer: plot.dealer_name,
      Customer: plot.deal ? plot.deal.customer.name : "",
      Commission: plot.deal ? plot.deal.total_commission_paid : "",
      Balance: plot.deal ? plot.deal.balance : "",
      "Next Due Date":
        plot.deal && plot.deal.unpaid_dues.length
          ? plot.deal.unpaid_dues[0].due_date
          : "",
      "Payable Amount":
        plot.deal && plot.deal.unpaid_dues.length
          ? plot.deal.unpaid_dues[0].payable_amount
          : "",
      Penalty: plot.deal ? plot.deal.penalty : "",
    };
  });
  let plotsWS = xlsx.utils.json_to_sheet(rows);
  let wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, plotsWS, "PRoject_Name - PLOTS");
  xlsx.writeFile(wb, "plots.xlsx");
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));
export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected,  plots, rows, setRows ,setCurrentlyCreating, deleteMultipleItems} = props;
 
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Plots
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete"
            onClick = {()=>{
              deleteMultipleItems()
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Export">
              <IconButton
                aria-label="export"
                onClick={() => {
                  exportToExcel(rows);
                }}
              >
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Plot">
              <IconButton
                aria-label="add plot"
                onClick={() => {
                  setCurrentlyCreating(true);
                }}
              >
                <AddRoundedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>

      {/* Second Toolbar */}
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <Typography //just to add spacing
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
        <Filters plots={plots} rows={rows} setRows={setRows} />
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
