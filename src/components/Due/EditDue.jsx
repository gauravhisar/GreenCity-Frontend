import React, { useState, useEffect } from 'react'
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import { TextField,TableRow,TableCell, IconButton } from '@material-ui/core';


export default function EditDue({ title, obj, index, setEditingView, updateItem, plotAmount }) {
	const [due_date, setDueDate] = useState(obj.due_date)
	const [payable_amount_percentage, setPayableAmountPercentage] = useState("")

    useEffect(() => {
        setDueDate(obj.due_date);
        setPayableAmountPercentage(obj.payable_amount_percentage)
    }, [obj])
    const editItem = (e) => {
        if (!due_date) {
            alert("Enter Due Date")
            return
        }
        if (!payable_amount_percentage) {
            alert("Enter Payable Amount(%)")
            return
        }
        if (payable_amount_percentage > 100){
            alert("Enter Valid Percentage")
            return
        }
        else {
            let new_obj = {
                due_date: due_date,
                payable_amount_percentage: payable_amount_percentage
            }
            updateItem(obj.id, index, new_obj).then((success) => {
                if (success) {
                    setEditingView(false)
                }
            })
        }
    }

    return (

        // <form onSubmit={editItem}>
        <TableRow onKeyPress={(e) => { if (e.key === 'Enter') { editItem() } }}>
            <TableCell style = {{padding:"0px"}}>
                <TextField autoFocus size = "small" margin = "dense" type="date" value={due_date} onChange={(e) => { setDueDate(e.target.value) }}/>
                {/* <input autoFocus style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={due_date} onChange={(e) => { setDueDate(e.target.value) }} placeholder="Due Date" /> */}
            </TableCell>
            <TableCell style = {{padding:"0px 0px 0px 10px"}}>
                <TextField style = {{maxWidth:"100px"}} type="number" size = "small" margin = "dense" value={payable_amount_percentage} onChange={(e) => { setPayableAmountPercentage(e.target.value) }} placeholder="Payable Amount" />
            </TableCell>
            <TableCell style = {{padding:"0px"}}>
                {/* {obj.payable_amount} */}
                {parseInt(plotAmount*payable_amount_percentage/100)}
            </TableCell>
            <TableCell style = {{padding:"0px"}}>
                <IconButton style = {{padding:"5px"}} onClick={editItem}>
                    <DoneIcon/>
                </IconButton>
            </TableCell>
            <TableCell style = {{padding:"0px"}}>
                <IconButton style = {{padding:"5px"}} onClick={(e) => { setEditingView(false); }}>
                    <CancelIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
