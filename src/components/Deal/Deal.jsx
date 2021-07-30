import React, { useState } from 'react'
import { useHistory } from 'react-router';
import axios from '../../axios'
import TextField from '@material-ui/core/TextField';
import AddorEditDeal from './AddOrEditDeal'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

export default function Deal({ title, base_url, project_id, plot_details, setPlotDetails, index }) {

	const deal_endpoint      = base_url + `projects/${project_id}/deals/${plot_details.deal.id}/`
	const history = useHistory()
	const [editing_view, setEditingView] = useState(false)
	const [currentlyDeleting, setCurrentlyDeleting] = useState(false)

	const deleteItem = (e) => {
		e.preventDefault()
		return axios.delete(deal_endpoint)
		.then((response)=>{
			setPlotDetails({...plot_details, deal:null})
			console.log("Successfully Deleted", response)
		})
		.catch((error)=>{
			console.log(error.response);
			if(error.response.data.detail === "Authentication credentials were not provided."){
			alert("Please Login First!");
			}
			else{
			alert("Some Error Occured while making request")
			}
			return false;
		})
	}

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

	const verticallyCenter = { display: 'flex', alignItems: 'center' }

	if (editing_view){
		return <AddorEditDeal title = "Deals" base_url={base_url} project_id = {project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.id} setEditingView={setEditingView}  />
	}
	else {
		return (
			<>
				<WarningDialog/>
				<div className="card col-lg-12 my-2">
					<div className="card-body">
						{/* <h5 className="card-title border-bottom pb-2">Deal</h5> */}
						<div className="card-text">
							<form>
								<div className="row mb-3">
									<div className="col-sm-2" style={verticallyCenter} onClick = {()=>{ history.push(`/customers/${plot_details.deal.customer.id}`) }}>
										<TextField label="Customer Name" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.customer.name} />
									</div>
									{/* <div className="col-sm-1" style={verticallyCenter}>
										<TextField label="Contact No" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true}} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.customer.contact_no} />
									</div> */}
								{/* </div>
								<div className="row mb-3"> */}
									<div className="col-sm-2" style={verticallyCenter} onClick = {()=>{ history.push(`/dealers/${plot_details.deal.dealer.id}`)}}>
										<TextField label="Dealer Name" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.dealer.name} />
									</div>
									{/* <div className="col-sm-1" style={verticallyCenter}>
										<TextField label="Contact No" InputProps={{ readOnly: true}} InputLabelProps={{ shrink: true}} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.dealer.contact_no} />
									</div> */}
								{/* </div>
								<div className="row mb-3"> */}
									<div className="col-sm-1" style={verticallyCenter}>
										<TextField label="Commission" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.total_commission_paid} />
									</div>
									<div className="col-sm-1" style={verticallyCenter}>
										<TextField label="Rebate" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.total_rebate} />
									</div>
									<div className="col-sm-1" style={verticallyCenter}>
										<TextField label="Interest Given" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.total_interest_given} />
									</div>
									<div className="col-sm-2" style={verticallyCenter}>
										<TextField label="Amount Received" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.total_amount_paid} />
									</div>
									<div className="col-sm-1" style={verticallyCenter}>
										<TextField label="Balance" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={plot_details.deal.balance} />
									</div>
									<div className="col-sm-2" style={{ textAlign: 'left' }}>
										<button onClick={(e) => { e.preventDefault(); setEditingView(true) }} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-primary">Edit</button>
									{/* </div>
									<div className="col-sm-1" style={{ textAlign: 'right' }}> */}
										<button onClick={(e) => { e.preventDefault(); setCurrentlyDeleting(true)}} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		)
	}


}