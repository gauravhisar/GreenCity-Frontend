import React, { useState, useEffect } from "react";

export default function EditPlot({
  title,
  obj,
  index,
  setEditingView,
  updateItem,
}) {
  const [plot_no, setPlotNo] = useState("");
  const [area, setArea] = useState("");
  const [rate, setRate] = useState("");
  const [plc, setPlc] = useState("");

  useEffect(() => {
    setPlotNo(obj.plot_no);
    setArea(obj.area);
    setRate(obj.rate);
    setPlc(obj.plc);
  }, []);
  const editItem = (e) => {
    // e.preventDefault()
    if (!plot_no) {
      alert("Enter Plot No");
      return;
    } else {
      let new_obj = {
        plot_no: plot_no,
        area: area,
        rate: rate,
        plc: plc,
      };
      updateItem(obj.id, index, new_obj).then((success) => {
        if (success) {
          setPlotNo("");
          setArea("");
          setRate("");
          setPlc("");
          setEditingView(false);
        }
      });
    }
  };

  return (
    // <form onSubmit={editItem}>
    <tr
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          editItem();
        }
      }}
    >
      <td>
        <input
          style={{ paddingTop: "3px", paddingBottom: "3px" }}
          type="text"
          className="form-control"
          value={plot_no || ""}
          onChange={(e) => {
            setPlotNo(e.target.value);
          }}
          placeholder="Plot No"
        />
      </td>
      <td>
        <input
          style={{ paddingTop: "3px", paddingBottom: "3px" }}
          type="text"
          className="form-control"
          value={area || ""}
          onChange={(e) => {
            setArea(e.target.value);
          }}
          placeholder="Area"
        />
      </td>
      <td>
        <input
          style={{ paddingTop: "3px", paddingBottom: "3px" }}
          type="text"
          className="form-control"
          value={rate || ""}
          onChange={(e) => {
            setRate(e.target.value);
          }}
          placeholder="Rate"
        />
      </td>
      <td>
        <input
          style={{ paddingTop: "3px", paddingBottom: "3px" }}
          type="text"
          className="form-control"
          value={plc || ""}
          onChange={(e) => {
            setPlc(e.target.value);
          }}
          placeholder="PLC"
        />
      </td>
      <td className="text-center">
        <button
          onClick={editItem}
          style={{ margin: "0px" }}
          type="submit"
          className="btn btn-sm btn-primary"
        >
          &nbsp;Save&nbsp;&nbsp;
        </button>
      </td>
      <td>
        <button
          onClick={(e) => {
            setEditingView(false);
          }}
          style={{ margin: "0px" }}
          className="btn btn-sm btn-danger"
        >
          Cancel
        </button>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    // </form>
  );
}
