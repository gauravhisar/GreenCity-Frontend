import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditPlot from "./EditPlot";

export default function PlotItem({
  title,
  obj,
  base_url,
  project_id,
  index,
  updateItem,
  deleteItem,
}) {
  const [editing_view, setEditingView] = useState(false);

  const dealDetails = () => {
    if (obj.deal) {
      return (
        <>
          <td>
            <Link
              to={`/dealers/${obj.dealer_id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              {obj.deal.dealer.name}{" "}
            </Link>
          </td>
          <td>
            <Link
              to={`/customers/${obj.customer_id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              {obj.deal.customer.name}{" "}
            </Link>
          </td>
          <td> {obj.deal.total_commission_paid} </td>
          <td> {obj.deal.balance} </td>
          {obj.deal.dues.length ? (
            <>
              <td> {obj.deal.dues[0].due_date} </td>
              <td> {obj.deal.dues[0].payable_amount} </td>
            </>
          ): 
          <>
            <td></td>
            <td></td>
          </>
        }
        </>
      );
    } else {
      return (
        <>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
        </>
      );
    }
  };

  if (editing_view === true) {
    return (
      <EditPlot
        title={title}
        obj={obj}
        index={index}
        updateItem={updateItem}
        setEditingView={setEditingView}
      />
    );
  } else {
    return (
      <>
        <tr className={obj.deal && obj.deal.penalty ? "table-danger" : ""}>
          <th scope="row">
            <Link
              to={`/projects/${project_id}/plots/${obj.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {obj.plot_no}
            </Link>
          </th>
          <td> {obj.area} </td>
          <td> {obj.rate} </td>
          <td> {obj.plc} </td>
          <td> {obj.amount} </td>

          {dealDetails()}
          <td className="text-center">
            <button
              onClick={() => setEditingView(true)}
              style={{ margin: "0px" }}
              type="button"
              className="btn btn-sm btn-secondary"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => deleteItem()}
              style={{ margin: "0px" }}
              type="button"
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }
}
