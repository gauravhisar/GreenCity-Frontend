import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'

// import EditPlot from './EditPlot';

export default function AddDeal({ title, base_url, project_id, plot_details, setPlotDetails,setEditingView, index }) {

	// const [plot_details,setPlotDetails] = useState({})

	const deals_endpoint = base_url + `projects/${project_id}/deals/`
	const customers_endpoint = base_url + `customers/`
	const dealers_endpoint   = base_url + `dealers/`


	const obj_schema = {
		id: "",
		name: "",
		contact_no: "",
	}

	const [customer, setCustomer] = useState(null)
	const [dealer, setDealer] = useState(null)
	const [input_customer, setInputCustomer] = useState({...obj_schema})
	const [input_dealer, setInputDealer] = useState({...obj_schema})

	const [all_customers, setAllCustomers] = useState([])
	const [all_dealers, setAllDealers] = useState([])

	useEffect(() => {
		axios.get(customers_endpoint)
			.then((response) => {
				console.log("All Customers fetched")
				setAllCustomers(response.data)
				return true
			})
			.catch((errors) => {
				console.log(errors)
				alert("Network Error")
				return false
			})

		axios.get(dealers_endpoint)
			.then((response) => {
				console.log("All Dealers fetched")
				setAllDealers(response.data)
				return true
			})
			.catch((errors) => {
				console.log(errors)
				alert("Network Error")
				return false
			})
	}, [])

	const saveCustomer = (new_obj) => {
		return axios.post(customers_endpoint, new_obj)
			.then((response) => {
				console.log("Customer Saved")
				return response.data
			})
			.catch((errors) => {
				console.log(errors)
				alert("Network Error! Customer Not Saved!")
				return false
			})
	}

	const saveDealer = (new_obj) => {
		return axios.post(dealers_endpoint, new_obj)
			.then((response) => {
				console.log("Dealer Saved")
				return response.data
			})
			.catch((errors) => {
				console.log(errors)
				alert("Network Error! Dealer Not Saved!")
				return false
			})
	}

	const saveDeal = (deal) => {
		return axios.post(deals_endpoint, deal)
			.then((response) => {
				console.log(response)
				const new_plot_details = {...plot_details}
				new_plot_details.deal = response.data
				setPlotDetails(new_plot_details)
				return true
			})
			.catch((error) => {
				alert("Network Error! Try Again")
				console.log(error)
				return false
			})

	}

	const addDeal = (e) => {
		e.preventDefault()
		if (input_customer.name.length === 0 || input_dealer.name.length === 0) {
			alert("Enter Customer Name and Dealer Name")
			return
		}
		if (input_customer.contact_no.length !== 0 && input_customer.contact_no.length !== 10) {
			alert("You can either leave Contact No blank or fill it with a 10-digit Number")
			return
		}
		if (input_dealer.contact_no.length === 0 && input_dealer.contact_no.length !== 10) {
			alert("You can either leave Contact No blank or fill it with a 10-digit Number")
			return
		}
		let add_customer = false
		let add_dealer = false
		if(customer === null){ // that is we have to add new customer
			let customer_exists = all_customers.find((obj)=>{
				return input_customer.contact_no === obj.contact_no
			})
			if (customer_exists){
				alert("Customer With this Contact Number Already Exists. Please Select it from drop down!")
				return
			}
			add_customer = true
		}
		else{
			if(customer.contact_no === input_customer.contact_no){
				if (customer.name !== input_customer.name){
					alert("Customer With this Contact Number Already Exists With A Different Name")
					return
				}
				else{
					add_customer = false
				}
			}
			else{
				add_customer = true
			}
		}

		if(dealer === null){ // that is we have to add new customer
			let dealer_exists = all_dealers.find((obj)=>{
				return input_dealer.contact_no === obj.contact_no
			})
			if (dealer_exists){
				alert("Dealer With this Contact Number Already Exists! Please select it from the drop down!")
				return
			}
			add_dealer = true 
		}
		else{
			if(dealer.contact_no === input_dealer.contact_no){
				if (dealer.name !== input_dealer.name){
					alert("Dealer with this Contact Number already exists With a different name")
					return
				}
				else{
					add_dealer = false
				}
			}
			else{
				add_dealer = true
			}
		}
		console.log("Add Deal: == ",add_customer,add_dealer)
		if (add_customer){
			const new_customer = {...input_customer}
			if(new_customer.contact_no.length === 0){
				new_customer.contact_no = null
			}
			saveCustomer(new_customer).then((obj)=>{
				setCustomer(obj)
			})
		}
		if (add_dealer){
			const new_dealer = {...input_dealer}
			if(new_dealer.contact_no.length === 0){
				new_dealer.contact_no = null
			}
			saveDealer(new_dealer).then((obj)=>{
				setDealer(obj)
			})
		}
		
		const deal = {
			plot_id: plot_details.id,
			customer_id: customer.id,
			dealer_id: dealer.id
		}

			saveDeal(deal).then((success) => {
				if (success){
						// setDealCreated(true)
				}
			})
	}

	const verticallyCenter = { display: 'flex', alignItems: 'center' }

	return (
		<>
			<div className="card col-lg-7 mx-3">
				<div className="card-body">
					<h5 className="card-title border-bottom pb-2">Deal</h5>
					<div className="card-text">
						<form>
							<div className="row mb-3">
							<div className="col-sm-4" style={verticallyCenter}>
									<Autocomplete
										id="customer_name"
										freeSolo
										fullWidth
										options={all_customers.map((option) => option)}
										getOptionLabel = {option => option.name || ""}
										value ={customer}
										onChange = {(e,value,reason)=>{setCustomer(value);}}
										inputValue = {input_customer.name}
										onInputChange = {(e,value)=>{setInputCustomer({...input_customer, name: value})}}
										renderInput={(params) => (
											<TextField {...params} label="Customer Name" margin = "dense" size = "small" color = "primary" variant="standard"/>
											)}
											/>
								</div>
							<div className="col-sm-4" style={verticallyCenter}>
									<Autocomplete
										id="customer_contact"
										freeSolo
										fullWidth
										options={all_customers.filter(option=>option.contact_no).map(option => option)}
										getOptionLabel = {option => option.contact_no || ""}
										value ={customer}
										onChange = {(e,value,reason)=>setCustomer(value)}
										inputValue = {input_customer.contact_no || ""}
										onInputChange = {(e,value)=>{setInputCustomer({...input_customer, contact_no: value})}}
										renderInput={(params) => (
											<TextField {...params} label="Customer Contact" margin = "dense" size = "small" color = "primary" variant="standard" />
										)}
									/>
								</div>
								{/* </div>
							<div className="row mb-3"> */}
								{/* <label htmlFor="customer-name" className="col-sm-2 col-form-label" style={verticallyCenter}>Customer Name:</label>
								<div className="col-sm-4" style={verticallyCenter}>
									<input type="text" className="form-control" id="customer-name" value={customer.name || ""} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
								</div> */}
							</div>
							<div className="row mb-3">
							<div className="col-sm-4" style={verticallyCenter}>
									<Autocomplete
										id="dealer_name"
										freeSolo
										fullWidth
										options={all_dealers.map((option) => option)}
										getOptionLabel = {option=> option.name || ""}
										value ={dealer}
										onChange = {(e,value,reason)=>setDealer(value)}
										inputValue = {input_dealer.name || ""}
										onInputChange = {(e,value)=>{setInputDealer({...input_dealer, name: value})}}
										renderInput={(params) => (
											<TextField {...params} label="Dealer Name" margin = "dense" size = "small" color = "primary" variant="standard" />
											)}
											/>
								</div>
								<div className="col-sm-4" style={verticallyCenter}>
									<Autocomplete
										id="dealer_contact"
										freeSolo
										fullWidth
										options={all_dealers.filter(option=>option.contact_no).map(option => option)}
										getOptionLabel = {option=> option.contact_no || ""}
										value ={dealer}
										onChange = {(e,value,reason)=>setDealer(value)}
										inputValue = {input_dealer.contact_no || ""}
										onInputChange = {(e,value)=>{setInputDealer({...input_dealer, contact_no: value})}}
										renderInput={(params) => (
											<TextField {...params} label="Dealer Contact" margin = "dense" size = "small" color = "primary" variant="standard" />
											)}
											/>
									</div>
							</div>

							<div style={{ textAlign: 'right' }}>
								<button onClick = {addDeal} style={{ margin: '5px 5px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
								<button onClick={(e) => { e.preventDefault(); setEditingView(false); }} style={{ margin: '5px 5px' }} className="btn btn-sm btn-danger">Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)

}
