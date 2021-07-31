import React, { useState } from 'react'
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';


export default function AddDue({ title, setCreateView, saveItem, plotAmount }) {
	const [due_date, setDueDate] = useState(new Date().toISOString().substring(0, 10))
	const [payable_amount_percentage, setPayableAmountPercentage] = useState("")
	const addItem = (e) => {
		// e.preventDefault()
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
<>
<TableRow onKeyPress={(e) => { if (e.key === 'Enter') { addItem() } }}>
            <TableCell style = {{padding:"0px"}}>
                <TextField autoFocus size = "small" margin = "dense" type="date" value={due_date} onChange={(e) => { setDueDate(e.target.value) }}/>
            </TableCell>
            <TableCell style = {{padding:"0px 0px 0px 10px"}}>
                <TextField style = {{maxWidth:"100px"}} type="number" size = "small" margin = "dense" value={payable_amount_percentage} onChange={(e) => { setPayableAmountPercentage(e.target.value) }} placeholder="Payable Amount" />
            </TableCell>
            <TableCell style = {{padding:"0px"}}>
                {parseInt(plotAmount*payable_amount_percentage/100)}
            </TableCell>
            <TableCell style = {{padding:"0px"}}>
                <IconButton style = {{padding:"5px"}} onClick={addItem}>
                    <DoneIcon/>
                </IconButton>
            </TableCell>
            <TableCell style = {{padding:"0px"}}>
                <IconButton style = {{padding:"5px"}} onClick={(e) => { setCreateView(false); }}>
                    <CancelIcon />
                </IconButton>
            </TableCell>
        </TableRow>
		 {/* <form onSubmit={addItem}>
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
		 			<button onClick = {addItem} style={{ marginRight: '2px' }} className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
		 		</div>
		 		<div className="col-sm-1">
		 			<button onClick={(e) => { e.preventDefault(); setCreateView(false); }} style={{ marginLeft: '2px' }} className="btn btn-sm btn-danger">Cancel</button>
		 		</div>
		 	</div>
		</form> */}
		</>
	)
}