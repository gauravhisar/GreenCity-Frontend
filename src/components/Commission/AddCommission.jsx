import React, { useState } from 'react'



export default function AddCommission({ title, setCreateView, saveItem }) {
	const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
	const [amount, setAmount] = useState("")
	const addItem = (e) => {
		e.preventDefault()
		if (!date) {
			alert("Enter Commission Date")
			return
		}
		if (amount === "") {
			alert("Enter Amount")
			return
		}
		const obj = {
			date: date,
			amount: amount
		}
		saveItem(obj).then((success) => {
			if (success) {
				setCreateView(false)
			}
		})
	}
	return (

		<form onSubmit={addItem}>
			<div className="row">
				<div className="col-sm-4">
					<input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={date} onChange={(e) => { setDate(e.target.value) }} placeholder="Date" />
				</div>
				<div className="col-sm-4">
					<input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={amount} onChange={(e) => { setAmount(e.target.value) }} placeholder="Amount" />
				</div>
				<div className="col-sm-2" style={{ textAlign: "right" }}>
					<button style={{ marginRight: '2px' }} className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
				</div>
				<div className="col-sm-2">
					<button onClick={(e) => { e.preventDefault(); setCreateView(false); }} style={{ marginLeft: '2px' }} className="btn btn-sm btn-danger">Cancel</button>
				</div>
			</div>
		</form>
	)
}