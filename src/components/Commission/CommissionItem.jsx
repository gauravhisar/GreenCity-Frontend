import React, { useState } from 'react'
import EditCommission from './EditCommission';

export default function CommissionItem({ title, obj, base_url, project_id, index, updateItem, deleteItem }) {

    const [editing_view, setEditingView] = useState(false)

    if (editing_view === true) {
        return (
            <>
            <EditCommission title={title} obj={obj} index={index} updateItem={updateItem} setEditingView={setEditingView} />
            </>
        )
    }
    else {
        return (
            <>
                <tr>
                    <td> {(()=>{let d = new Date(obj.date); return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`})()} </td>
                    <td> {obj.amount} </td>
                    <td className="text-center"><button onClick={() => setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                    <td><button onClick={() => deleteItem(obj.id, index)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            </>
        )

    }
}