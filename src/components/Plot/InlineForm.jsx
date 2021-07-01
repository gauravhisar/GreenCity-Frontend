import React, { useState, useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

const InlineWarning = ({ obj, setDeleteIdx, deleteItem }) => {
  return (
    <TableRow key={obj.id}>
      <TableCell padding="checkbox"></TableCell>
      <TableCell padding="none">
        <DoneIcon
          style={{ cursor: "pointer", paddingRight: "5px" }}
          onClick={() => {
            deleteItem(obj).then(() => {
              setDeleteIdx(-1);
            });
          }}
        />
        <CancelIcon
          style={{ cursor: "pointer" }}
          onClick={() => setDeleteIdx(-1)}
        />
      </TableCell>
      <TableCell
        padding="none"
        style={{ padding: "9px", fontSize: "17px" }}
        colSpan={11}
      >
        Are you sure you want to delete this plot?
      </TableCell>
    </TableRow>
  );
};

const InlineCreateForm = ({ setCurrentlyCreating, saveItem }) => {
  const [plot, setPlot] = useState({
    plot_no: "",
    area: "",
    rate: "",
    plc: "",
  });

  const addItem = (e) => {
    // e.preventDefault();
    if (!plot.plot_no) {
      alert("Enter Plot No");
      return;
    }
    if (!plot.area) {
      alert("Enter Area! If not sure enter any value");
      return;
    } else {
      saveItem({ ...plot }).then((success) => {
        if (success) {
          setPlot({
            plot_no: "",
            area: "",
            rate: "",
            plc: "",
          });
        }
      });
    }
  };
  return (
    <>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        <TableCell padding="none">
          <DoneIcon onClick={addItem} style={{ cursor: "pointer" }} />
          <CancelIcon
            onClick={(e) => {
              setCurrentlyCreating(false)
            }}
            style={{ cursor: "pointer" }}
          />
        </TableCell>
        <TableCell padding="none">
          <TextField
            style={{ padding: "3px 3px" }}
            type="text"
            size="small"
            value={plot.plot_no || ""}
            onChange={(e) => {
              setPlot({ ...plot, plot_no: e.target.value });
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <TextField
            style={{ padding: "3px 3px" }}
            type="text"
            size="small"
            value={plot.area || ""}
            onChange={(e) => {
              setPlot({ ...plot, area: e.target.value });
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <TextField
            style={{ padding: "3px 3px" }}
            type="text"
            size="small"
            value={plot.rate || ""}
            onChange={(e) => {
              setPlot({ ...plot, rate: e.target.value });
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <TextField
            style={{ padding: "3px 3px" }}
            type="text"
            size="small"
            value={plot.plc || ""}
            onChange={(e) => {
              setPlot({ ...plot, plc: e.target.value });
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
};
export default function InlineEditingForm({ obj, setEditIdx, updateItem }) {
  const [plot, setPlot] = useState({});

  useEffect(() => {
    setPlot({ ...obj });
  }, [obj]);

  const editItem = (e) => {
    if (!plot.plot_no) {
      alert("Enter Plot No");
      return;
    } else {
      updateItem({ ...plot }).then((success) => {
        if (success) {
          setEditIdx(-1);
        }
      });
    }
  };

  return (
    <>
      {/* <tr
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          editItem();
        }
      }}
    > */}
      <TableCell padding="none">
        <DoneIcon onClick={editItem} style={{ cursor: "pointer" }} />
        <CancelIcon
          onClick={(e) => {
            setEditIdx(-1);
          }}
          style={{ cursor: "pointer" }}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          style={{ padding: "3px 3px" }}
          type="text"
          size="small"
          value={plot.plot_no || ""}
          onChange={(e) => {
            setPlot({ ...plot, plot_no: e.target.value });
          }}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          style={{ padding: "3px 3px" }}
          type="text"
          size="small"
          value={plot.area || ""}
          onChange={(e) => {
            setPlot({ ...plot, area: e.target.value });
          }}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          style={{ padding: "3px 3px" }}
          type="text"
          size="small"
          value={plot.rate || ""}
          onChange={(e) => {
            setPlot({ ...plot, rate: e.target.value });
          }}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          style={{ padding: "3px 3px" }}
          type="text"
          size="small"
          value={plot.plc || ""}
          onChange={(e) => {
            setPlot({ ...plot, plc: e.target.value });
          }}
        />
      </TableCell>
      {/* </tr> */}
    </>
  );
}

export { InlineWarning, InlineCreateForm };
