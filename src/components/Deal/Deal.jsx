import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'

// import EditPlot from './EditPlot';

export default function Deal({ title, base_url, project_id, plot_details, setPlotDetails, index }) {

	// const [plot_details,setPlotDetails] = useState({})

	const deal_endpoint      = base_url + `projects/${project_id}/plots/${plot_details.deal.id}/`
	const customers_endpoint = base_url + `customers/`
	const customer_endpoint  = `${plot_details.deal.customer.id}/`
	const dealers_endpoint   = base_url + `dealers/`
	const dealer_endpoint    = `${plot_details.deal.dealer.id}/`

	const [editing_view, setEditingView] = useState(false)

	

	const [customer, setCustomer] = useState(initial_customer)
	const [dealer, setDealer] = useState(initial_dealer)
	const [balance, setBalance] = useState("")

	const [all_customers, setAllCustomers] = useState([])
	const [all_dealers, setAllDealers] = useState([])
	// const [total_rebate, setTotalRebate] = useState("")
	// const [total_interest_given, setTotalInterestGiven] = useState("")
	// const [total_amount_paid,setTotalAmountPaid] = useState("")
	// const [total_commission_paid, setTotalCommissionPaid] = useState("")

	useEffect(() => {  // whenever editing view turns to false, set the original values
		const initial_customer = {...plot_details.deal.customer}
		const initial_dealer = {...plot_details.deal.dealer}
		if (initial_customer.contact_no === null){
			initial_customer.contact_no = ""
		}
		if (initial_dealer.contact_no === null){
			initial_dealer.contact_no = ""
		}
		setCustomer(initial_customer)
		setDealer(initial_dealer)
		setBalance(plot_details.deal.balance)
	}, [plot_details, editing_view])


	// PUT
	const updateDeal = (id, index, new_obj) => {
		return axios.put(deal_endpoint, new_obj)
			.then((response) => {
				console.log(response)
				const new_plot_details = { ...plot_details }
				Object.keys(response.data).forEach((field) => {
					new_plot_details[field] = response.data[field]
				})
				setPlotDetails(new_plot_details)
				return true
			})
			.catch((errors) => {
				// alert("Network Error! Start Server and Try Again")
				// console.log(errors)
				alert(errors)
				return false
			})
	}

	//DELETE
	const deleteItem = (id, index) => {
		alert("Deletion Not Compatible Yet")
	}


	const editItem = (e) => {
		e.preventDefault()
		if (!customer_name) {
			alert("Enter Customer Name")
			return
		}
		else if (!dealer_name) {
			alert("Enter Dealer Name")
			return
		}
		else {
			let new_obj = {
				customer_no: customer_no,
				customer_name: customer_name,
				dealer_name: dealer_name,
				dealer_no: dealer_no,
				balance: balance
			}
			updateDeal(plot_details.id, index, new_obj).then((success) => {
				if (success) {
					setEditingView(false)
				}
			})
		}
	}

	const verticallyCenter = {display:'flex',alignItems: 'center'}
	// const inputProps = {readOnly: }
	return (
		<>
			<div className="card col-lg-7 mx-3">
				<div className="card-body">
					<h5 className="card-title border-bottom pb-2">Deal</h5>
					<div className="card-text">
						<form>
							<div className="row mb-3">
								<div className="col-sm-4" style={verticallyCenter}>
									<TextField label="Customer Name" InputProps = {{readOnly: !editing_view }} margin = "dense" size = "small" color = "primary" variant="standard" value={customer_name || ""}  onChange={(e) => setCustomerName(e.target.value)} />
								</div>
								<label htmlFor="customer-no" className="col-sm-2 col-form-label" style= {verticallyCenter}>Customer PNo:</label>
								<div className="col-sm-4" style= {verticallyCenter}>
									<input type="text" className="form-control" id="customer-no" value={customer_no || ""} onChange={(e) => setCustomerNo(e.target.value)} disabled={!editing_view} />
								</div>
							{/* </div>
							<div className="row mb-3"> */}
								{/* <label htmlFor="customer-name" className="col-sm-2 col-form-label" style= {verticallyCenter}>Customer Name:</label>
								<div className="col-sm-4" style= {verticallyCenter}>
									<input type="text" className="form-control" id="customer-name" value={customer_name || ""} onChange={(e) => setCustomerName(e.target.value)} disabled={!editing_view} />
								</div> */}
							</div>
							<div className="row mb-3">
								<label htmlFor="dealer-no" className="col-sm-2 col-form-label" style= {verticallyCenter}>Dealer PNo:</label>
								<div className="col-sm-4" style= {verticallyCenter}>
									<input type="text" className="form-control" id="dealer-no" value={dealer_no || ""} onChange={(e) => setDealerNo(e.target.value)} disabled={!editing_view} />
								</div>
								<label htmlFor="dealer-name" className="col-sm-2 col-form-label" style= {verticallyCenter}>Dealer Name:</label>
								<div className="col-sm-4" style= {verticallyCenter}>
									<input type="text" className="form-control" id="dealer-name" value={dealer_name || ""} onChange={(e) => setDealerName(e.target.value)} disabled={!editing_view} />
								</div>
							</div>
							<div className="row mb-3">
								<label htmlFor="customer-no" className="col-sm-2 col-form-label" style= {verticallyCenter}  >Balance:</label>
								<div className="col-sm-4" style= {verticallyCenter}>
									<input type="text" className="form-control" id="customer-no" value={balance || ""} onChange={(e) => setBalance(e.target.value)} disabled={true} />
								</div>
							</div>
							{
								editing_view === false
									? <div style={{ textAlign: 'right' }}>
										<button onClick={(e) => { e.preventDefault(); setEditingView(true) }} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-secondary">Edit</button>
										<button onClick={() => deleteItem()} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
									</div>
									: <div style={{ textAlign: 'right' }}>
										<button onClick={editItem} style={{ margin: '5px 5px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
										<button onClick={(e) => { e.preventDefault(); setEditingView(false); }} style={{ margin: '5px 5px' }} className="btn btn-sm btn-danger">Cancel</button>
									</div>
							}
						</form>
					</div>
				</div>
			</div>
		</>
	)

}
