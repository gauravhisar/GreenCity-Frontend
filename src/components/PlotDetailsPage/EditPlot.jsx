import React, { useState, useEffect } from 'react'

export default function EditPlot({ title, obj, index, setEditingView, updatePlot }) {
	const [plot_no, setPlotNo] = useState("")
	const [area, setArea] = useState("")
	const [rate, setRate] = useState("")
	const [amount, setAmount] = useState("")

	useEffect(()=>{
		setPlotNo(obj.plot_no)
		setArea(obj.area)
		setRate(obj.rate)
		setAmount(obj.amount)
	},[obj])


	const editItem = (e) => {
		// e.preventDefault()
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
			updatePlot(obj.id, index, new_obj).then((success) => {
				if (success) {
					setPlotNo("")
					setArea("")
					setRate("")
					setEditingView(false)
				}
			})
		}
	}

	const layout = () => {
		return (
			<>
				<form>
					<div className="row mb-3">
						<label htmlFor="plotno" className="col-sm-3 col-form-label">Plot No:</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" id="plotno" value = {plot_no} onChange = {(e)=>{setPlotNo(e.target.value)}}/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="area" className="col-sm-3 col-form-label">Area:</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" id="area" value={area} onChange={(e)=>{setArea(e.target.value)}} />
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="rate" className="col-sm-3 col-form-label">Rate:</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" id="rate" value={rate} onChange={(e)=>{setRate(e.target.value)}} />
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="amount" className="col-sm-3 col-form-label">Amount:</label>
						<div className="col-sm-9">
							<input type="text" className="form-control" id="amount" value={amount} disabled />
						</div>
					</div>

					<div style={{textAlign: 'right'}}>
						<button onClick={editItem} style={{ margin: '5px 5px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
						<button onClick={(e) => { e.preventDefault(); setEditingView(false); }} style={{ margin: '5px 5px' }} className="btn btn-sm btn-danger">Cancel</button>
					</div>
				</form>
			</>
		)
	}

	return (
		<>
		{layout()}
		</>

		// <tr onKeyPress={(e) => { if (e.key === 'Enter') { editItem() } }}>
		// 	<td>
		// 		<input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={plot_no} onChange={(e) => { setPlotNo(e.target.value) }} placeholder="Plot No" />
		// 	</td>
		// 	<td>
		// 		<input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={area} onChange={(e) => { setArea(e.target.value) }} placeholder="Area" />
		// 	</td>
		// 	<td>
		// 		<input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={rate} onChange={(e) => { setRate(e.target.value) }} placeholder="Rate" />
		// 	</td>
		// 	<td className="text-center">
		// 	</td>
		// 	<td>
		// 	</td>
		// 	<td></td>
		// 	<td></td>
		// 	<td></td>
		// 	<td></td>
		// </tr>
	)
}
