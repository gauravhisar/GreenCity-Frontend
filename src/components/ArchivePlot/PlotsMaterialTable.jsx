import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
// import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const columns = [
  {
    field: "plot_no",
    title: "PlotNo",
    render: (rowData) => {
      return (
        <Link
          to={`/projects/${rowData.project_id}/plots/${rowData.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {rowData.plot_no}
        </Link>
      );
    },
  },
  { field: "area", title: "Area" },
  { field: "rate", title: "Rate" },
  {
    field: "plc",
    title: "PLC(%)",
  },
  {
    field: "amount",
    title: "Amount",
    editable: "never",
  },
  {
    field: "deal.dealer.name",
    title: "Dealer",
    editable: "never",
    export: true,
    render: (rowData) => {
      if (rowData.deal) {
        return (
          <Link
            to={`/dealers/${rowData.deal.dealer.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            {rowData.deal.dealer.name}{" "}
          </Link>
        );
      }
      return null;
    },
  },
  {
    field: "deal.customer.name",
    title: "Customer",
    editable: "never",
    export: true,
    render: (rowData) => (rowData.deal ? rowData.deal.customer.name : null),
  },
  {
    field: "deal.total_commission_paid",
    title: "Commission Paid",
    editable: "never",
    export: true,
    render: (plot) => {
      if (plot.deal) {
        return plot.deal.total_commission_paid;
      }
      return null;
    },
  },
  {
    field: "deal.balance",
    title: "Balance",
    editable: "never",
    export: true,
    //   defaultFilter: (term, plot)=>{
    //       if(plot.deal) {
    //           return true
    //        } else{
    //            return false
    //        }
    //     },
    render: (plot) => {
      if (plot.deal) {
        return plot.deal.balance;
      }
      return null;
    },
  },
  {
    field: "deal.next_due.due_date",
    title: "Next DueDate",
    type: "date",
    editable: "never",
    export: true,
    render: (plot) => {
      if (plot.deal && plot.deal.unpaid_dues.length) {
        const newDate = new Date(plot.deal.unpaid_dues[0].due_date);
        return `${newDate.getDate()}-${
          newDate.getMonth() + 1
        }-${newDate.getFullYear()}`;
      }
      return null;
    },
  },
  {
    field: "deal.next_due.payable_amount",
    title: "Due Amount",
    editable: "never",
    export: true,
    render: (plot) => {
      if (plot.deal && plot.deal.unpaid_dues.length) {
        return (
          plot.deal.unpaid_dues[0].payable_amount -
          plot.deal.unpaid_dues[0].paid
        );
      }
      return null;
    },
  },
];

export default function Plots({
  title,
  base_url,
  project_details,
  setProjectDetails,
}) {
  const classes = useStyles();

  const endpoint = base_url + "plots/";
  const [plots, setPlots] = useState([]);
  const [sold_plots, setSoldPlots] = useState([]);
  const [unsold_plots, setUnsoldPlots] = useState([]);

  const [filters, setFilters] = useState({
    show_sold_plots: false, // if true only sold plots will be shown, otherwise only unsold plots will be shown
    show_unsold_plots: false, // if true only sold plots will be shown, otherwise only unsold plots will be shown
    // only_resolved: false, // if balance is paid and all the commission payments are done,
    dues_pending: false, // only those whose due date is pending
    starting_date: new Date().toISOString().substring(0, 10),
    ending_date: new Date().toISOString().substring(0, 10),
    apply_dates: false,
  });

  useEffect(() => {
    setSoldPlots([
      ...Object.values(project_details.plots).filter((plot) => plot.deal),
    ]);
    setUnsoldPlots([
      ...Object.values(project_details.plots).filter((plot) => !plot.deal),
    ]);
    // setPlots([...Object.values(project_details.plots)])
  }, [project_details]);

  const changePlotsToShow = () => {
    const { show_sold_plots, show_unsold_plots, dues_pending, apply_dates } =
      filters;
    console.log({
      show_sold_plots,
      show_unsold_plots,
      dues_pending,
      apply_dates,
    });
    if (show_sold_plots && show_unsold_plots) {
      if (dues_pending) {
        // setPlots([...[...sold_plots].filter((plot) => plot.deal.penalty)]);
        return [...[...sold_plots].filter((plot) => plot.deal.penalty)]
      } else {
        // setPlots([...sold_plots, ...unsold_plots]);
        return [...sold_plots, ...unsold_plots]
      }
    }
    if (show_sold_plots) {
      console.log("I am in Show Sold Plots");
      if (dues_pending) {
        // setPlots([...[...sold_plots].filter((plot) => plot.deal.penalty)]);
        return [...[...sold_plots].filter((plot) => plot.deal.penalty)]
      } else {
        // setPlots([...sold_plots]);
        console.log("I am Returin");
        return [...sold_plots]
      }
    }
    if (show_unsold_plots) {
      // setPlots([...unsold_plots]);
      return [...unsold_plots]
    }
    if (!show_sold_plots && !show_unsold_plots) {
      // setPlots([]);
      return [];
    }
  };

  // useEffect(changePlotsToShow, [
  //   sold_plots,
  //   unsold_plots,
  //   filters.show_sold_plots,
  //   filters.show_unsold_plots,
  //   filters.dues_pending,
  //   filters.apply_dates,
  // ]);

  // useEffect(()=>{
  //   if(show_sold_plots){

  //   }
  // },[
  //   sold_plots,
  //   unsold_plots,
  //   filters.apply_dates
  // ])

  const saveItem = (new_obj) => {
    return axios
      .post(endpoint, new_obj)
      .then((response) => {
        console.log(response);
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

  // PUT
  const updateItem = (newPlot) => {
    return axios
      .put(endpoint + `${newPlot.id}/`, newPlot)
      .then((response) => {
        console.log(response);
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

  //DELETE
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

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={columns}
          data={changePlotsToShow()}
          title="Plots"
          editable={{
            onRowAdd: (newPlot) => {
              return saveItem(newPlot);
            },
            onRowUpdate: (newPlot) => {
              return updateItem(newPlot);
            },
            onRowDelete: (plot) => {
              return deleteItem(plot);
            },
          }}
          options={{
            filtering: true,
            addRowPosition: "first",
            headerStyle: { fontWeight: "bold" },
            exportButton: true,
            exportFileName: `${project_details.name}-Plots`,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <FormControlLabel
                  value="Sold"
                  control={
                    <Switch
                      size="small"
                      color="primary"
                      checked={filters.show_sold_plots}
                      onChange={() => {
                        setFilters({
                          ...filters,
                          show_sold_plots: !filters.show_sold_plots,
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
                      checked={filters.show_unsold_plots}
                      onChange={() => {
                        setFilters({
                          ...filters,
                          show_unsold_plots: !filters.show_unsold_plots,
                        });
                      }}
                    />
                  }
                  label="Unsold"
                  labelPlacement="top"
                />
              </div>
            ),
          }}
          actions={[]}
        />
      </div>
    </div>
  );
}
