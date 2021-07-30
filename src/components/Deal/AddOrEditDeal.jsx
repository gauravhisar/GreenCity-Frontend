import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "../../axios";

export default function AddOrEditDeal({
  title,
  base_url,
  project_id,
  plot_details,
  setPlotDetails,
  setEditingView,
  index,
}) {
  const deals_endpoint = base_url + `projects/${project_id}/deals/`;
  const customers_endpoint = base_url + `customers/`;
  const dealers_endpoint = base_url + `dealers/`;

  const obj_schema = {
    id: "",
    name: "",
    contact_no: "",
    other_info: ""
  };

  const [customer, setCustomer] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [input_customer, setInputCustomer] = useState({ ...obj_schema });
  const [input_dealer, setInputDealer] = useState({...obj_schema});

  const [all_customers, setAllCustomers] = useState([]);
  const [all_dealers, setAllDealers] = useState([]);

  useEffect(() => {
    axios
      .get(customers_endpoint)
      .then((response) => {
        console.log("All Customers fetched");
        setAllCustomers(response.data);
        return true;
      })
      .catch((errors) => {
        console.log(errors);
        alert("Network Error");
        return false;
      });

    axios
      .get(dealers_endpoint)
      .then((response) => {
        console.log("All Dealers fetched");
        setAllDealers(response.data);
        return true;
      })
      .catch((errors) => {
        console.log(errors);
        alert("Network Error");
        return false;
      });
  }, [customers_endpoint, dealers_endpoint]);

  useEffect(() => {
    if (plot_details.deal) {
      const new_customer = { ...plot_details.deal.customer };
      setCustomer(new_customer);
      setInputCustomer({
        ...new_customer,
        contact_no: new_customer.contact_no || "",
      });
      // if (input_customer.contact_no === null) {
      // 	input_customer.contact_no = ""
      // }
      const new_dealer = { ...plot_details.deal.dealer };
      setDealer(new_dealer);
      setInputDealer({
        ...new_dealer,
        contact_no: new_dealer.contact_no || "",
      });
    }
  }, [plot_details.deal]);
  const saveCustomer = (new_obj) => {
    console.log("Customer to be Saved: ", new_obj);
    return axios
      .post(customers_endpoint, new_obj)
      .then((response) => {
        console.log("Customer Saved ", response);
        setAllCustomers([...all_customers, response.data]);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.detail ===
          "Authentication credentials were not provided."
        ) {
          alert("Please Login First!");
        } else {
          alert("Some Error Occured while making request! Customer not saved!");
        }
        return false;
      });
  };

  const saveDealer = (new_obj) => {
    console.log("Dealer to be Saved: ", new_obj);
    return axios
      .post(dealers_endpoint, new_obj)
      .then((response) => {
        console.log("Dealer Saved ", response);
        setAllDealers([...all_dealers, response.data]);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.detail ===
          "Authentication credentials were not provided."
        ) {
          alert("Please Login First!");
        } else {
          alert("Some Error Occured while making request! Customer Not Saved");
        }
        return false;
      });
  };

  let save_or_update;
  if (!plot_details.deal) {
    const saveDeal = (deal) => {
      return axios
        .post(deals_endpoint, deal)
        .then((response) => {
          console.log(response);
          const new_plot_details = { ...plot_details };
          new_plot_details.deal = response.data;
          setPlotDetails(new_plot_details);
          return true;
        })
        .catch((error) => {
          console.log(error.response);
          if (
            error.response.data.detail ===
            "Authentication credentials were not provided."
          ) {
            alert("Please Login First!");
          } else {
            alert("Some Error Occured while making request");
          }
          return false;
        });
    };
    save_or_update = saveDeal;
  } else {
    const deal_endpoint =
      base_url + `projects/${project_id}/deals/${plot_details.deal.id}/`;

    const updateDeal = (new_obj) => {
      return axios
        .put(deal_endpoint, new_obj)
        .then((response) => {
          console.log(response);
          const new_plot_details = { ...plot_details };
          new_plot_details.deal = response.data;
          // Object.keys(response.data).forEach((field) => {
          // 	new_plot_details['deal'][field] = response.data[field]
          // })
          setPlotDetails(new_plot_details);
          return true;
        })
        .catch((error) => {
          console.log(error.response);
          if (
            error.response.data.detail ===
            "Authentication credentials were not provided."
          ) {
            alert("Please Login First!");
          } else {
            alert("Some Error Occured while making request");
          }
          return false;
        });
    };
    save_or_update = updateDeal;
  }

  const addEditDeal = async (e) => {
    e.preventDefault();
    if (input_customer.name.length === 0) {
      alert("Enter Customer Name");
      return;
    }
    if (input_dealer.name.length === 0) {
      alert("Enter Dealer Name");
      return;
    }
    if (
      input_customer.contact_no.length !== 0 &&
      input_customer.contact_no.length !== 10
    ) {
      alert(
        "You can either leave Contact No blank or fill it with a 10-digit Number"
      );
      return;
    }
    if (
      input_dealer.contact_no.length !== 0 &&
      input_dealer.contact_no.length !== 10
    ) {
      alert(
        "You can either leave Contact No blank or fill it with a 10-digit Number"
      );
      return;
    }
    console.log(customer, dealer);
    let add_customer = false;
    let add_dealer = false;
    if (customer === null) {
      // that is we have to add new customer
      let customer_exists = input_customer.contact_no && all_customers.find((obj) => {
        return input_customer.contact_no === obj.contact_no;
      })
      if (customer_exists) {
        alert(
          "Customer With this Contact Number Already Exists. Please Select it from drop down!"
        );
        return;
      }
      add_customer = true;
    } else {
      if (
        customer.name === input_customer.name &&
        (customer.contact_no === input_customer.contact_no ||
          (customer.contact_no === null && input_customer.contact_no === ""))
      ) {
        add_customer = false;
      } else {
        alert(
          "You cannot edit an existing customer's details. If you want to add a new customer, enter their details manually without selecting anything from the dropdown"
        );
        return;
      }
    }

    if (dealer === null) {
      // that is we have to add new customer
      let dealer_exists = input_dealer.contact_no && all_dealers.find((obj) => {
        return input_dealer.contact_no === obj.contact_no;
      });
      if (dealer_exists) {
        alert(
          "Dealer With this Contact Number Already Exists! Please select it from the drop down!"
        );
        return;
      }
      add_dealer = true;
    } else {
      if (
        dealer.name === input_dealer.name &&
        (dealer.contact_no === input_dealer.contact_no ||
          (dealer.contact_no === null && input_dealer.contact_no === ""))
      ) {
        add_dealer = false;
      } else {
        alert(
          "You cannot edit an existing dealer's details. If you want to add a new customer, enter their details manually without selecting anything from the dropdown"
        );
        return;
      }
    }
    const deal = {
      plot_id: plot_details.id,
    };
    console.log("Add Deal: == ", add_customer, add_dealer);

    if (add_customer) {
      const new_customer = { ...input_customer };
      delete new_customer.id;
      console.log(new_customer);
      await saveCustomer(new_customer).then((obj) => {
        deal.customer_id = obj.id;
      });
    } else {
      deal.customer_id = customer.id;
    }
    if (add_dealer) {
      const new_dealer = { ...input_dealer };
      delete new_dealer.id;
      console.log(input_dealer);
      await saveDealer(new_dealer).then((obj) => {
        deal.dealer_id = obj.id;
      });
    } else {
      deal.dealer_id = dealer.id;
    }

    console.log(deal);
    await save_or_update(deal).then((success) => {
      if (success) {
        setEditingView(false);
      }
    });
  };

  const verticallyCenter = { display: "flex", alignItems: "center" };

  const handlePersonChange = (e,value,reason, field, person, input_person, setPerson ) => { // create-option, select-option, remove-option, clear, blur
    console.log("Change",value,reason)
    if (reason !== "create-option"){
      setPerson(value)
    }
    console.log(person, input_person)
  }
  const handleInputPersonChange = (e,value,reason, field, person, input_person, setInputPerson ) => { // input, reset, clear
    console.log("some")
    console.log("Input Change",e && e.type,  value, reason)
    if (reason === "clear"){
      setInputPerson({id:"", name: "", contact_no: "", other_info: ""})
    }
    else if ((e &&  e.type === "change")  || (!e && value)) {
      if (reason === 'reset'){
        setInputPerson({...person})
      }
      else{
        setInputPerson({ ...input_person, [field]: value })
      }
    }
      console.log(person, input_person)
  }

  return (
    <>
      <div className="card col-lg-12 my-2">
        <div className="card-body">
          {/* <h5 className="card-title border-bottom pb-2">Deal</h5> */}
          <div className="card-text">
            <form>
              <div className="row mb-3">
                <div className="col-sm-2" style={verticallyCenter}>
                  <Autocomplete
                    id="customer_name"
                    autoHighlight
                    freeSolo
                    fullWidth
                    options={all_customers.map((option) => option)}
                    getOptionLabel={(option) => option.name || ""}
                    value={customer}
                    onChange={(e, value, reason) => {handlePersonChange(e,value,reason, "name", customer, input_customer, setCustomer)}}
                    inputValue={input_customer.name}
                    onInputChange={(e, value,reason) => {handleInputPersonChange(e,value,reason, "name", customer, input_customer, setInputCustomer)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        autoFocus
                        label="Customer Name"
                        margin="dense"
                        size="small"
                        color="primary"
                        variant="standard"
                      />
                    )}
                  />
                </div>
                <div className="col-sm-2" style={verticallyCenter}>
                  <Autocomplete
                    autoHighlight
                    id="customer_contact"
                    freeSolo
                    fullWidth
                    options={all_customers
                      .filter((option) => option.contact_no)
                      .map((option) => option)}
                    getOptionLabel={(option) => option.contact_no || ""}
                    value={customer}
                    onChange={(e, value, reason) => {handlePersonChange(e,value,reason, "contact_no", customer, input_customer, setCustomer)}}
                    inputValue={input_customer.contact_no || ""}
                    onInputChange={(e, value,reason) => {handleInputPersonChange(e,value,reason, "contact_no", customer, input_customer, setInputCustomer)}}
                    // onInputChange={(e, value) => {
                    //   if ((e && e.type === "change")  || (!e && value)) {
                    //     setInputCustomer({
                    //       ...input_customer,
                    //       contact_no: value,
                    //     });
                    //   }
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer Contact"
                        margin="dense"
                        size="small"
                        color="primary"
                        variant="standard"
                      />
                    )}
                  />
                </div>
                {/* </div>
							<div className="row mb-3"> */}
                {/* <label htmlFor="customer-name" className="col-sm-2 col-form-label" style={verticallyCenter}>Customer Name:</label>
								<div className="col-sm-4" style={verticallyCenter}>
									<input type="text" className="form-control" id="customer-name" value={customer.name || ""} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
								</div> */}
                {/* </div>
              <div className="row mb-3"> */}
                <div className="col-sm-2" style={verticallyCenter}>
                  <Autocomplete
                    autoHighlight
                    id="dealer_name"
                    freeSolo
                    fullWidth
                    options={all_dealers.map((option) => option)}
                    getOptionLabel={(option) => option.name || ""}
                    value={dealer}
                    onChange={(e, value, reason) => {handlePersonChange(e,value,reason, "name", dealer, input_dealer, setDealer)}}
                    inputValue={input_dealer.name}
                    onInputChange={(e, value,reason) => {handleInputPersonChange(e,value,reason, "name", dealer, input_dealer, setInputDealer)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dealer Name"
                        margin="dense"
                        size="small"
                        color="primary"
                        variant="standard"
                      />
                    )}
                  />
                </div>
                <div className="col-sm-2" style={verticallyCenter}>
                  <Autocomplete
                    id="dealer_contact"
                    freeSolo
                    fullWidth
                    options={all_dealers
                      .filter((option) => option.contact_no)
                      .map((option) => option)}
                    getOptionLabel={(option) => option.contact_no || ""}
                    value={dealer}
                    onChange={(e, value, reason) => {handlePersonChange(e,value,reason, "contact_no", dealer, input_dealer, setDealer)}}
                    inputValue={input_dealer.contact_no || ""}
                    onInputChange={(e, value,reason) => {handleInputPersonChange(e,value,reason, "contact_no", dealer, input_dealer, setInputDealer)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dealer Contact"
                        margin="dense"
                        size="small"
                        color="primary"
                        variant="standard"
                      />
                    )}
                  />
                </div>
              <div className = "col-sm-2" style={{ textAlign: "left" }}>
                <button
                  onClick={(e) => {
                    addEditDeal(e);
                  }}
                  style={{ margin: "5px 5px" }}
                  type="submit"
                  className="btn btn-sm btn-primary"
                >
                  &nbsp;Save&nbsp;&nbsp;
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingView(false);
                  }}
                  style={{ margin: "5px 5px" }}
                  className="btn btn-sm btn-danger"
                >
                  Cancel
                </button>
              </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
