import React, { useState } from 'react'
import EditPayment from './EditPayment';

export default function PaymentItem({ title, obj, base_url, project_id, index, updateItem, setDeleteIdx }) {

    const [editing_view, setEditingView] = useState(false)

    if (editing_view === true) {
        return (
            <>
            <EditPayment title={title} obj={obj} index={index} updateItem={updateItem} setEditingView={setEditingView} />
            </>
        )
    }
    else {
        return (
            <>
                <tr>
                    <td> {(()=>{let d = new Date(obj.date); return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`})()} </td>
                    <td> {obj.interest_given} </td>
                    <td> {obj.rebate} </td>
                    <td> {obj.net_amount_paid} </td>
                    <td className="text-center"><button onClick={() => setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                    <td><button onClick={() => setDeleteIdx(index)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            </>
        )

    }
}