import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';


export default function Plot({ title, base_url, project_id, plot_details, setPlotDetails, index }) {

	const endpoint = base_url + `projects/${project_id}/plots/${plot_details.id}/`

	const [editing_view, setEditingView] = useState(false)

	const [plot_no, setPlotNo] = useState("")
	const [area, setArea] = useState("")
	const [rate, setRate] = useState("")
	const [amount, setAmount] = useState("")

	useEffect(() => {  // whenever editing view turns to false, set the original values
		setPlotNo(plot_details.plot_no)
		setArea(plot_details.area)
		setRate(plot_details.rate)
		setAmount(plot_details.amount)
	}, [plot_details, editing_view])


	// PUT
	const updatePlot = (id, index, new_obj) => {
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
			.catch((errors) => {
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
		if (!plot_no) {
			alert("Enter Plot No")
			return
		}
		else {
			let new_obj = {
				plot_no: plot_no,
				area: area,
				rate: rate
			}
			updatePlot(plot_details.id, index, new_obj).then((success) => {
				if (success) {
					setEditingView(false)
				}
			})
		}
	}

	const verticallyCenter = { display: 'flex', alignItems: 'center' }
	return (
		<>
			<div className="card col-lg-5 mx-4">
				<div className="card-body">
					<h5 className="card-title border-bottom pb-2">Plot</h5>
					<div className="card-text">
						<form>
							<div className="row mb-3">

								{/* <label htmlFor="plot_no" className="col-sm-3 col-form-label" style={verticallyCenter} >PlotNo:</label> */}
								<div className="col-sm-6" style={verticallyCenter}>
									<TextField label="Plot No" InputProps={{ readOnly: !editing_view }} margin="dense" size="small" color="primary" variant="standard" value={plot_no || ""} onChange={(e) => setPlotNo(e.target.value)} />
									{/* <input type="text" className="form-control" id="plot_no" value={plot_no || ""} onChange={(e) => setPlotNo(e.target.value)} disabled={!editing_view} /> */}
								</div>
							{/* </div>
							<div className="row mb-3"> */}
								<div className="col-sm-6" style={verticallyCenter}>
									<TextField label="Amount" InputProps={{ readOnly: true }} margin="dense" size="small" color="primary" variant="standard" value={amount || ""} onChange={(e) => setAmount(e.target.value)} />
									{/* <input type="text" className="form-control" id="amount" value={amount || ""} onChange={(e) => setAmount(e.target.value)} disabled={true} /> */}
								</div>
								{/* <label htmlFor="area" className="col-sm-3 col-form-label" style={verticallyCenter}>Area:</label> */}
							</div>
							<div className="row mb-3">
								<div className="col-sm-6" style={verticallyCenter}>
									<TextField label="Area" InputProps={{ readOnly: !editing_view }} margin="dense" size="small" color="primary" variant="standard" value={area  || ""} onChange={(e) => setArea(e.target.value)} />
									{/* <input type="text" className="form-control" id="area" value={area || ""} onChange={(e) => setArea(e.target.value)} disabled={!editing_view} /> */}
								</div>
								{/* <label htmlFor="rate" className="col-sm-3 col-form-label" style={verticallyCenter}>Rate:</label> */}
								<div className="col-sm-6" style={verticallyCenter}>
									<TextField label="Rate" InputProps={{ readOnly: !editing_view }} margin="dense" size="small" color="primary" variant="standard" value={rate || ""} onChange={(e) => setRate(e.target.value)}/>
									{/* <input type="text" className="form-control" id="rate" value={rate || ""} onChange={(e) => setRate(e.target.value)} disabled={!editing_view} /> */}
								</div>
							{/* </div>
							<div className="row mb-3"> */}
								{/* <label htmlFor="amount" className="col-sm-3 col-form-label" style={verticallyCenter}>Amount:</label> */}
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