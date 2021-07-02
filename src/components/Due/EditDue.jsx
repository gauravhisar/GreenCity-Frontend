import React, { useState, useEffect } from 'react'


export default function EditDue({ title, obj, index, setEditingView, updateItem }) {
	const [due_date, setDueDate] = useState(obj.due_date)
	const [payable_amount, setPayableAmount] = useState("")

    useEffect(() => {
        setDueDate(obj.due_date);
        setPayableAmount(obj.payable_amount)
    }, [obj])
    const editItem = (e) => {
        if (!due_date) {
            alert("Enter Due Date")
            return
        }
        if (!payable_amount) {
            alert("Enter Due Date")
            return
        }
        else {
            let new_obj = {
                due_date: due_date,
                payable_amount: payable_amount
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
        <tr onKeyPress={(e) => { if (e.key === 'Enter') { editItem() } }}>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={due_date} onChange={(e) => { setDueDate(e.target.value) }} placeholder="Due Date" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={payable_amount} onChange={(e) => { setPayableAmount(e.target.value) }} placeholder="Payable Amount" />
            </td>
            <td className="text-center">
                <button onClick={editItem} style={{ margin: '0px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
            </td>
            <td>
                <button onClick={(e) => { setEditingView(false); }} style={{ margin: '0px' }} className="btn btn-sm btn-danger">Cancel</button>
            </td>
        </tr>
    )
}
