import React, { useState, useEffect } from "react";
import axios from "../../axios";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory, useParams } from "react-router-dom";


export default function Customer({ title, base_url }) {
  const params = useParams();
  const history = useHistory()
  // const customers_endpoint = base_url + "customers/"
  const customer_endpoint = base_url + "customers/" + params.customer_id + "/";
  const [customer, setCustomer] = useState({
    // to store data
    name: "",
    contact_no: "",
    other_info: "",
  });
  const [name, setName] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [other_info, setOtherInfo] = useState("");
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [currentlyDeleting, setCurrentlyDeleting] = useState(false);

  useEffect(() => {
    axios
      .get(customer_endpoint)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((errors) => {
        console.log(errors);
        alert("Network Error");
      });
  }, [customer_endpoint]);

  useEffect(() => {
    // whenever editing view turns to false, set the original values
    setName(customer.name);
    setContactNo(customer.contact_no);
    setOtherInfo(customer.other_info);
  }, [customer, currentlyEditing]);

  // PUT
  const updateItem = (new_obj) => {
    return axios
      .put(customer_endpoint, new_obj)
      .then((response) => {
        console.log(response);
        setCustomer(response.data);
        return true;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.detail === "Authentication credentials were not provided.") {
            alert("Please Login First!");
        }
        else {
            alert("Some Error Occured while making request")
        }
        return false;
      });
  };

  //DELETE
  const deleteItem = () => {
    return axios
      .delete(customer_endpoint)
      .then((response) => {
        console.log("Deleted Successfully", response);
        history.goBack()
        return true;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.detail === "Authentication credentials were not provided.") {
            alert("Please Login First!");
        }
        else {
            alert("Some Error Occured while making request")
        }
        return false;
      });
  };

  const editItem = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Enter Name");
      return;
    }
    if (contact_no && contact_no.length !== 10) {
      alert("Enter Contact No of Length 10 or dont enter anything");
      return;
    }
    updateItem({
      name: name,
      contact_no: contact_no || null,
      other_info: other_info,
    }).then((success) => {
      if (success) {
        setCurrentlyEditing(false);
      }
    });
  };

  const WarningDialog = () => {
    const handleClose = () => {
        setCurrentlyDeleting(false)
    }
  return (
    <>
      <Dialog
        open={currentlyDeleting}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
          <Button onClick={deleteItem} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

  const verticallyCenter = { display: "flex", alignItems: "center" };
  return (
    <>
    <WarningDialog/>
      <div className="card m-4">
        <div className="card-body">
          <div className="card-text">
            <form>
              <div className="row mb-3">
                <div className="col-sm-4" style={verticallyCenter}>
                  <TextField
                    label="Name"
                    InputProps={{ readOnly: !currentlyEditing }}
                    margin="dense"
                    size="small"
                    color="primary"
                    variant="standard"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* </div>
							<div className="row mb-3"> */}
                <div className="col-sm-4" style={verticallyCenter}>
                  <TextField
                    label="Contact No"
                    InputProps={{ readOnly: !currentlyEditing }}
                    margin="dense"
                    size="small"
                    color="primary"
                    variant="standard"
                    value={contact_no || ""}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
                {/* </div>
              <div className="row mb-3"> */}
                <div className="col-sm-4" style={verticallyCenter}>
                  <TextField
                    label="Other Info"
                    InputProps={{ readOnly: !currentlyEditing }}
                    margin="dense"
                    size="small"
                    color="primary"
                    variant="standard"
                    value={other_info || ""}
                    onChange={(e) => setOtherInfo(e.target.value)}
                  />
                </div>
              </div>
              {currentlyEditing === false ? (
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentlyEditing(true);
                    }}
                    style={{ margin: "5px 5px" }}
                    type="button"
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setCurrentlyDeleting(true)}
                    style={{ margin: "5px 5px" }}
                    type="button"
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={editItem}
                    style={{ margin: "5px 5px" }}
                    type="submit"
                    className="btn btn-sm btn-primary"
                  >
                    &nbsp;Save&nbsp;&nbsp;
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentlyEditing(false);
                    }}
                    style={{ margin: "5px 5px" }}
                    className="btn btn-sm btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
