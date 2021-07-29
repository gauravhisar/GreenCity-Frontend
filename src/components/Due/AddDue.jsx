import React, { useState } from 'react'



export default function AddDue({ title, setCreateView, saveItem }) {
	const [due_date, setDueDate] = useState(new Date().toISOString().substring(0, 10))
	const [payable_amount_percentage, setPayableAmountPercentage] = useState("")
	const addItem = (e) => {
		e.preventDefault()
		if (!due_date) {
			alert("Enter Due Date")
			return
		}
		if (!payable_amount_percentage) {
			alert("Enter Payable Amount(%)")
			return
		}
		const obj = {
			due_date: due_date,
			payable_amount_percentage: payable_amount_percentage
		}
		saveItem(obj).then((success) => {
			if (success) {
				setDueDate(new Date().toISOString().substring(0,10))
				setPayableAmountPercentage("")
				// setCreateView(false)
			}
		})
	}
	return (

		<form onSubmit={addItem}>
			<div className="row">
				<div className="col-sm-4">
					<input autoFocus style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={due_date} onChange={(e) => { setDueDate(e.target.value) }} placeholder="Due Date" />
				</div>
				<div className="col-sm-4">
					<input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={payable_amount_percentage} onChange={(e) => { setPayableAmountPercentage(e.target.value) }} placeholder="Payable Amount(%)" />
				</div>
				<div className="col-sm-2">
					{0}
				</div>
				<div className="col-sm-1" style={{ textAlign: "right" }}>
					<button style={{ marginRight: '2px' }} className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
				</div>
				<div className="col-sm-1">
					<button onClick={(e) => { e.preventDefault(); setCreateView(false); }} style={{ marginLeft: '2px' }} className="btn btn-sm btn-danger">Cancel</button>
				</div>
			</div>
		</form>
	)
}