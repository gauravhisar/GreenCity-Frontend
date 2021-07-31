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
import Button from "@material-ui/core/Button";
import Filters from "./Filters";

function exportToExcel(plots, projectName) {
  let rows = plots.map((plot) => {
  let obj = {
      PlotNo: plot.plot_no,
      Area: plot.area,
      Rate: plot.rate,
      PLC: plot.plc,
      Amount: plot.amount,
      Dealer: plot.dealer_name,
      Customer: plot.deal ? plot.deal.customer.name : "",
      Commission: plot.deal ? plot.deal.total_commission_paid : "",
      Balance: plot.deal ? plot.deal.balance : "",
      "Oldest Due Date":plot.oldest_due_date ? plot.oldest_due_date.toISOString().substring(0,10).split('-').reverse().join('-') : "",
      "Next Due Date":plot.next_due_date ? plot.next_due_date.toISOString().substring(0,10).split('-').reverse().join('-') : "",
      "Payable Amount":plot.next_payable_amount || "",
      Penalty: plot.deal ? plot.deal.penalty : "",
      UnpaidDues : "",
    };
    plot.deal && plot.deal.unpaid_dues.forEach((due, index)=>{
      obj[`DueDate-${index+1}`] = due.due_date.split('-').reverse().join('-')
      obj[`Payable Amount-${index+1}`] = due.payable_amount - due.paid
    })
    return obj
  });

  let plotsWS = xlsx.utils.json_to_sheet(rows);
  let wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, plotsWS, `${projectName}-plots`);
  xlsx.writeFile(wb,projectName+'-plots.xlsx');
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
  const [currentlyDeleting, setCurrentlyDeleting] = React.useState(false);
  const {
    projectName,
    numSelected,
    plots,
    rows,
    totalPlots,
    setRows,
    setCurrentlyCreating,
    deleteMultipleItems,
  } = props;

  const MultipleDeleteWarning = () => {
    return (
      <>
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Are you sure you want to delete these {numSelected} plots?
        </Typography>
        <Button onClick={deleteMultipleItems}> Yes </Button>
        <Button
          onClick={() => {
            setCurrentlyDeleting(false);
          }}
        >
          No
        </Button>
      </>
    );
  };

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <>
            {currentlyDeleting ? (
              <MultipleDeleteWarning />
            ) : (
              <>
                <Typography
                  className={classes.title}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
                >
                  {numSelected} selected
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setCurrentlyDeleting(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </>
        ) : (
          <>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Plots
            </Typography>
            <Tooltip title="Export">
              <IconButton
                aria-label="export"
                onClick={() => {
                  exportToExcel(rows, projectName);
                }}
              >
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Plot">
              <IconButton
                disabled = {plots.length === totalPlots}
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
        style = {{overflowX: "scroll"}}
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
