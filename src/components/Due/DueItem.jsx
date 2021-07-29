import React, { useState } from 'react'
import EditDue from './EditDue';

export default function DueItem({ title, obj, base_url, project_id, index, updateItem, deleteIdx, setDeleteIdx, deleteItem }) {

    const [editing_view, setEditingView] = useState(false)

    if (editing_view === true) {
        return (
            <EditDue title={title} obj={obj} index={index} updateItem={updateItem} setEditingView={setEditingView} />
        )
    }
    else {
        return (
            <>
                <tr>
                    <td> {(()=>{let d = new Date(obj.due_date); return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`})()} </td>
                    <td> {obj.payable_amount_percentage + '%'} </td>
                    <td> {obj.payable_amount} </td>
                    <td className="text-center"><button onClick={() => setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                    <td><button onClick={() => setDeleteIdx(index)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            </>
        )

    }
}