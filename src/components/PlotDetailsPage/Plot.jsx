import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';


export default function Plot({ title, base_url, project_id, plot_details, setPlotDetails, index }) {

	const endpoint = base_url + `projects/${project_id}/plots/${plot_details.id}/`

	const [editing_view, setEditingView] = useState(false)
	const [currentlyDeleting, setCurrentlyDeleting] = useState(false)
	const inputRef = React.useRef(null)
	const history = useHistory()

	const [plot_no, setPlotNo] = useState("")
	const [area, setArea] = useState("")
	const [rate, setRate] = useState("")
	const [plc, setPlc] = useState("")
	const [amount, setAmount] = useState("")

	useEffect(() => {  // whenever editing view turns to false, set the original values
		setPlotNo(plot_details.plot_no)
		setArea(plot_details.area)
		setRate(plot_details.rate)
		setAmount(plot_details.amount)
		setPlc(plot_details.plc)
		editing_view && inputRef.current && inputRef.current.focus()
	}, [plot_details, editing_view])


	// PUT
	const updatePlot = (new_obj) => {
		return axios.put(endpoint, new_obj)
			.then((response) => {
				console.log(response)
				const new_plot_details = { ...plot_details }
				Object.keys(response.data).forEach((field) => {
						new_plot_details[field] = response.data[field]
				})
				setPlotDetails(new_plot_details)
				return true
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
			})
	}

	//DELETE
	const deleteItem = () => {
		// id,new_obj
		return axios
		  .delete(endpoint)
		  .then((response) => {
			console.log("Successfully Deleted! ", response);
			history.push(`/projects/${project_id}`)
		  })
		  .catch((error) => {
			console.log(error.response);
			if (error.response && error.response.data.detail === "Authentication credentials were not provided.") {
				alert("Please Login First!");
			}
			else {
				alert("Some Error Occured while making request")
			}
			return false;
		  });
	  };


	const editItem = (e) => {
		e.preventDefault()
		if (!plot_no) {
			alert("Enter Plot No")
			return
		}
		else {
			let new_obj = {
				plot_no: plot_no,
				area: area,
				rate: rate, 
				plc: plc
			}
			updatePlot(new_obj).then((success) => {
				if (success) {
					setEditingView(false)
				}
			})
		}
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
	return (
		<>
			<WarningDialog/>
			<div className="card col-lg-11 mx-4">
				<div className="card-body">
					<h5 className="card-title border-bottom pb-2">Plot</h5>
					<div className="card-text">
						<form>
							<div className="row mb-3">
								<div className="col-sm-2" style={verticallyCenter}>
									<TextField inputRef = {inputRef} label="Plot No" InputProps={{ readOnly: !editing_view }} margin="dense" size="small" color="primary" variant="standard" value={plot_no || ""} onChange={(e) => setPlotNo(e.target.value)} />
								</div>
							{/* </div>
							<div className="row mb-3"> */}
							{/* </div>
							<div className="row mb-3"> */}
								<div className="col-sm-2" style={verticallyCenter}>
									<TextField label="Area" InputProps={{ readOnly: !editing_view }} margin="dense" size="small" color="primary" variant="standard" value={area  || ""} onChange={(e) => setArea(e.target.value)} />
								</div>
								<div className="col-sm-2" style={verticallyCenter}>
									<TextField label="Rate" InputProps={{ readOnly: !editing_view }} margin="dense" size="small" color="primary" variant="standard" value={rate || ""} onChange={(e) => setRate(e.target.value)}/>
								</div>
								<div className="col-sm-2" style={verticallyCenter}>
									<TextField label="PLC" InputProps={{ readOnly: !editing_view }} InputLabelProps={{ shrink: true}} margin="dense" size="small" color="primary" variant="standard" value={plc || ""} onChange={(e) => setPlc(e.target.value)}/>
								</div>
								<div className="col-sm-2" style={verticallyCenter}>
									<TextField label="Amount" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={amount || ""} onChange={(e) => setAmount(e.target.value)} />
								</div>
							{/* <div className="row mb-3">
							</div> */}
							{
								editing_view === false
								?
								// <div style={{ textAlign: 'right' }}>
									<div className="col-sm-2">
										<button onClick={(e) => { e.preventDefault(); setEditingView(true) }} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-primary">Edit</button>
										<button onClick={() => setCurrentlyDeleting(true)} style={{ margin: '5px 5px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
									</div>
									: <div className="col-sm-2">
										<button onClick={editItem} style={{ margin: '5px 5px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
										<button onClick={(e) => { e.preventDefault(); setEditingView(false); }} style={{ margin: '5px 5px' }} className="btn btn-sm btn-danger">Cancel</button>
									</div>
							}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)

}