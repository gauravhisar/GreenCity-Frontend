import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import AddorEditDeal from './AddOrEditDeal'

export default function Deal({ title, base_url, project_id, plot_details, setPlotDetails, index }) {

	const deal_endpoint      = base_url + `projects/${project_id}/deals/${plot_details.deal.id}/`
	const customers_endpoint = base_url + `customers/`
	const customer_endpoint  = `${plot_details.deal.customer.id}/`
	const dealers_endpoint   = base_url + `dealers/`
	const dealer_endpoint    = `${plot_details.deal.dealer.id}/`

	const [editing_view, setEditingView] = useState(false)

	const deleteItem = (e) => {
		e.preventDefault()
		return axios.delete(deal_endpoint)
		.then((response)=>{
			setPlotDetails({...plot_details, deal:null})
			console.log("Successfully Deleted")
		})
		.catch((errors)=>{
			alert(errors)
			console.log(errors)
		})
	}

	const verticallyCenter = {display:'flex',alignItems: 'center'}

	if (editing_view){
		return <AddorEditDeal title = "Deals" base_url={base_url} project_id = {project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.id} setEditingView={setEditingView}  />
	}
	else{
		return (
			<>
				<div className="card col-lg-7 mx-3">
					<div className="card-body">
						<h5 className="card-title border-bottom pb-2">Deal</h5>
						<div className="card-text">
							<form>
								<div className="row mb-3">
									{/* <label htmlFor="customer-no" className="col-sm-2 col-form-label" style= {verticallyCenter}>Customer PNo:</label> */}
									<div className="col-sm-4" style= {verticallyCenter}>
										<TextField label="Customer Name" InputProps = {{readOnly: true }} margin = "dense" size = "small" color = "primary" variant="standard" value = {plot_details.deal.customer.name || ""} />
										{/* <input type="text" className="form-control" id="customer-no" value = {plot_details.deal.customer.contact_no} disabled={true} /> */}
									</div>
									<div className="col-sm-4" style= {verticallyCenter}>
										<TextField label="Customer Contact" InputProps = {{readOnly: true }} margin = "dense" size = "small" color = "primary" variant="standard" value = {plot_details.deal.customer.contact_no || ""} />
										{/* <input type="text" className="form-control" id="customer-no" value = {plot_details.deal.customer.contact_no} disabled={true} /> */}
									</div>
								</div>
								<div className="row mb-3">
									{/* <label htmlFor="dealer-no" className="col-sm-2 col-form-label" style= {verticallyCenter}>Dealer PNo:</label> */}
									<div className="col-sm-4" style= {verticallyCenter}>
										<TextField label="Dealer Name" InputProps = {{readOnly: true }} margin = "dense" size = "small" color = "primary" variant="standard" value = {plot_details.deal.dealer.name || ""} />
										{/* <input type="text" className="form-control" id="dealer-no" value={plot_details.deal.dealer.contact_no || ""} disabled={true} /> */}
									</div>
									{/* <label htmlFor="dealer-name" className="col-sm-2 col-form-label" style= {verticallyCenter}>Dealer Name:</label> */}
									<div className="col-sm-4" style= {verticallyCenter}>
										<TextField label="Dealer Contact" InputProps = {{readOnly: true }} margin = "dense" size = "small" color = "primary" variant="standard" value = {plot_details.deal.dealer.contact_no || ""} />
										{/* <input type="text" className="form-control" id="dealer-name" value={plot_details.deal.dealer.name || ""} disabled={true} /> */}
									</div>
								</div>
								<div className="row mb-3">
									{/* <label htmlFor="customer-no" className="col-sm-2 col-form-label" style= {verticallyCenter}  >Balance:</label> */}
									<div className="col-sm-4" style= {verticallyCenter}>
										<TextField label="Balance" InputProps = {{readOnly: true }} margin = "dense" size = "small" color = "primary" variant="standard" value = {plot_details.deal.balance || ""} />
										{/* <input type="text" className="form-control" id="customer-no" value={plot_details.deal.balance || ""}  disabled={true} /> */}
									</div>
								</div>
								<div style={{ textAlign: 'right' }}>
									<button onClick={(e) => { e.preventDefault(); setEditingView(true) }} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-secondary">Edit</button>
									<button onClick={(e) => deleteItem(e)} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		)
	}


}

								// <div style={{ textAlign: 'right' }}>
								// 	<button onClick={editItem} style={{ margin: '5px 5px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
								// 	<button onClick={(e) => { e.preventDefault(); setEditingView(false); }} style={{ margin: '5px 5px' }} className="btn btn-sm btn-danger">Cancel</button>
								// </div>