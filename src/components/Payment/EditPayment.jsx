import React, { useState, useEffect } from 'react'


export default function EditDue({ title, obj, index, setEditingView, updateItem }) {
	const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
    const [interest_given, setInterestGiven] = useState(0)
    const [rebate, setRebate] = useState(0)
    const [net_amount_paid,setNetAmountPaid] = useState(0)

    useEffect(() => {
        setDate(obj.date)
        setInterestGiven(obj.interest_given)
        setRebate(obj.rebate)
        setNetAmountPaid(obj.net_amount_paid)
    }, [obj])
    const editItem = (e) => {
        if (!date) {
            alert("Enter Date")
            return
        }
        if (interest_given === '') {
            alert("Enter Interest Given")
            return
        }
        if (rebate === '') {
            alert("Enter Rebate")
            return
        }
        if (net_amount_paid === '') {
            alert("Enter Net Amount Paid")
            return
        }
        else {
            const new_obj = {
                date: date,
                interest_given: interest_given,
                rebate: rebate,
                net_amount_paid: net_amount_paid
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
                <input autoFocus style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={date} onChange={(e) => { setDate(e.target.value) }} placeholder="Date" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={interest_given} onChange={(e) => { setInterestGiven(e.target.value) }} placeholder="Interest Given" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={rebate} onChange={(e) => { setRebate(e.target.value) }} placeholder="Rebate" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={net_amount_paid} onChange={(e) => { setNetAmountPaid(e.target.value) }} placeholder="Net Amount Paid" />
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
