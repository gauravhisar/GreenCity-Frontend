import React, { useState } from 'react'
import { Link } from "react-router-dom"
import EditDue from './EditDue';

export default function DueItem({ title, obj, base_url, project_id, index, updateItem, deleteItem }) {

    const [editing_view, setEditingView] = useState(false)

    if (editing_view === true) {
        return (
            <EditDue title={title} obj={obj} index={index} updateItem={updateItem} setEditingView={setEditingView} />
        )
    }
    else {
        console.log(obj)
        return (
            <>
                <tr className={obj.deal && obj.deal.penalty ? "table-danger" : ""}>
                    {/* <th scope="row">
                        <Link to={`/projects/${project_id}/deals/${deal_id}/dues/${obj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {obj.deal_id}
                        </Link>
                    </th> */}
                    <td> {obj.due_date} </td>
                    <td> {obj.payable_amount} </td>
                    {/* <td> {obj.amount} </td> */}

                    <td className="text-center"><button onClick={() => setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                    <td>
                        <button onClick={() => deleteItem()} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
                    </td>
                </tr>
            </>
        )

    }
}