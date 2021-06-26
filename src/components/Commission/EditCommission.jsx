import React, { useState, useEffect } from 'react'


export default function EditDue({ title, obj, index, setEditingView, updateItem }) {
	const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
	const [amount, setAmount] = useState("")

    useEffect(() => {
        setDate(obj.date);
        setAmount(obj.amount)
    }, [])
    const editItem = (e) => {
        e.preventDefault()
		if (!date) {
			alert("Enter Commission Date")
			return
		}
		if (amount === "") {
			alert("Enter Amount")
			return
		}
		const new_obj = {
			date: date,
			amount: amount
		}
        updateItem(obj.id, index, new_obj).then((success) => {
            if (success) {
                setEditingView(false)
            }
        })
    }

    return (

        // <form onSubmit={editItem}>
        <tr onKeyPress={(e) => { if (e.key === 'Enter') { editItem() } }}>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={date} onChange={(e) => { setDate(e.target.value) }} placeholder="Date" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={amount} onChange={(e) => { setAmount(e.target.value) }} placeholder="Amount" />
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
