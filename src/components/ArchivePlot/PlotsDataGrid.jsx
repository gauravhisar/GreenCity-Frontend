import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import AddPlot from "./AddPlot";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

// const rows = [
// ];

const columns = [
  { field: 'plot_no', title: 'PlotNo', width: 130},
  { field: 'area', title: 'Area', width: 130 },
  { field: 'rate', title: 'Rate', width: 130 },
  { field: 'plc', title: 'PLC', width: 130 },
  { field: 'amount', title: 'Amount', width: 130 },
  { field: "dealer", title: 'Dealer', width: 130},
  { field: 'customer', title: 'Customer', width: 130},
  { field: 'total_commission_paid', title: 'Commission Paid' , width: 130},
  { field: 'balance', title: 'Balance' , width: 130},
  { field: 'next_due_date', title: 'Next Due', width: 130 },
  { field: 'next_payable_amount', title: 'Due Amount', width: 130 },
];


// const table_schema = {
//   plot_no: "Plot No",
//   area: "Area",
//   rate: "Rate",
//   plc: "PLC",
//   amount: "Amount",
//   dealer: "Dealer",
//   customer: "Customer",
//   total_commission_paid: "Commission Paid", 
//   balance: "Balance",
//   next_due_date: "Next Due Date",
//   next_payable_amount: "Payable Amount"
// };

// const col_order = { col: "plot_no", order: 0 }; // 0--> without order   1--> ascending order    2--> descending order
export default function Plots({
  title,
  base_url,
  project_details,
  setProjectDetails,
}) {
  const endpoint = base_url + "plots/";
  const [create_view, setCreateView] = useState(false);
  const [plots, setPlots] = useState([]);

  useEffect(()=>{
    let new_plots = []
    Object.values(project_details.plots).forEach((plot)=>{
      if (plot.deal){
        new_plots.push({...plot, ...plot.deal, dealer: plot.deal.dealer.name, customer: plot.deal.customer.name})  
      }
      else{
        new_plots.push({...plot})
      }
    })
      
    setPlots([...new_plots])
  },[project_details])
  // const [filters, setFilters] = useState({
  //     only_sold_plots: true,  // if true only sold plots will be shown, otherwise only unsold plots will be shown
  //     customer_name: "",
  //     dealer_name: "",
  //     only_resolved: false, // if balance is paid and all the commission payments are done,
  //     pending: false, // only those whose due date is pending
  //     in_given_range: false
  // })

  // const sortPlots = () => {
  //   const { col, order } = col_order;
  //   if (order === 0) {
  //     let new_plots = [...Object.values(project_details.plots)];
  //     setPlots(new_plots);
  //   } else if (order === 1) {
  //     setPlots(
  //       [...plots].sort((x, y) => {
  //           if (x[col] === y[col]) return 0;
  //         if (x[col] === undefined) return -1;
  //         if (y[col] === undefined) return 1;
  //         return x[col] - y[col];
  //       })
  //     );
  //   } else if (order === 2) {
  //     setPlots(
  //       [...plots].sort((x, y) => {
  //           if (x[col] === y[col]) return 0;
  //         if (x[col] === undefined) return 1;
  //         if (y[col] === undefined) return -1;
  //         return y[col] - x[col];
  //       })
  //     );
  //   }
  // };

  // useEffect(sortPlots, [project_details]); // sorting will be done whenever project_details changes

  // const changeColOrder = (col) => {
  //   if (col === col_order.col) {
  //     console.log(col_order);
  //     col_order.order = (col_order.order + 1) % 3;
  //     console.log(col_order);
  //   } else {
  //     col_order.col = col;
  //     col_order.order = 1;
  //   }
  //   sortPlots();
  // };

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

  // PUT
  const updateItem = (id, index, new_obj, setEditingView) => {
    return axios
      .put(endpoint + `${id}/`, new_obj)
      .then((response) => {
        console.log(response.data);
        const new_project_details = { ...project_details };
        new_project_details.plots[id] = response.data;
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
  const deleteItem = (id, index) => {
    // id,new_obj
    alert("Deletion Not Compatible right now");
  };

  // const displayTableSchema = () => {
  //   return (
  //     <thead>
  //       <tr>
  //         {Object.keys(table_schema).map((col) => {
  //           return (
  //             <th key={col} onClick={col!=='balance' && col!=='customer' && col!=='dealer'? () => changeColOrder(col): ()=>{}} scope="col">
  //               {" "}
  //               {table_schema[col]}{" "}
  //             </th>
  //           );
  //         })}
  //         <th scope="col">
  //           <button onClick={() => console.log(plots)}>Test</button>
  //         </th>
  //         <th scope="col"></th>
  //       </tr>
  //     </thead>
  //   );
  // };

  return (
    <div style={{ marginTop: "40px" }}>
      <div>
        <h3> {title} </h3>
      </div>
      <div>
        {/* <table className="table">
          {displayTableSchema()}
          {listItems()}
        </table> */}
        <div style={{ height: 1000, width: '100%' }}>
        <DataGrid rows = {plots} columns = {columns}/>
        </div>

        {create_view === true && (
          <AddPlot
            title="Plots"
            setCreateView={setCreateView}
            saveItem={saveItem}
          />
        )}
        {create_view === false && (
          <button
            onClick={() => {
              setCreateView(true);
            }}
            style={{ marginLeft: "10px" }}
            className="btn btn-primary"
          >
            Add {title.substring(0, title.length - 1)}{" "}
          </button>
        )}
      </div>
    </div>
  );
}
