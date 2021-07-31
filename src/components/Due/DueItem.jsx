import React, { useState } from 'react'
import EditDue from './EditDue';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableRow,TableCell, IconButton } from '@material-ui/core';

export default function DueItem({ title, obj, base_url, project_id, index, updateItem, deleteIdx, setDeleteIdx, deleteItem, plotAmount }) {

    const [editing_view, setEditingView] = useState(false)

    if (editing_view === true) {
        return (
            <EditDue title={title} obj={obj} index={index} updateItem={updateItem} setEditingView={setEditingView} plotAmount = {plotAmount}/>
        )
    }
    else {
        return (
            <>
                <TableRow>
                    <TableCell style = {{padding: "0px"}}> {(()=>{let d = new Date(obj.due_date); return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`})()} </TableCell>
                    <TableCell style = {{padding: '0px 0px 0px 10px'}}> {obj.payable_amount_percentage + '%'} </TableCell>
                    <TableCell style = {{padding: '0px'}}> {obj.payable_amount} </TableCell>
                    <TableCell style = {{padding: '0px'}}>
                        <IconButton style = {{padding: '5px'}} onClick={() => setEditingView(true)}>
                        <EditIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell style = {{padding: '0px'}}>
                        <IconButton style = {{padding: '5px'}} onClick={() => setDeleteIdx(index)}>
                        <DeleteIcon/>
                        </IconButton>
                        {/* <EditIcon type = "button" onClick={() => setEditingView(true)} style={{ margin: '5px', cursor: 'pointer' }}/> */}
                        {/* <DeleteIcon type = "button" onClick={() => setDeleteIdx(index)} style={{ margin: '0px', cursor: 'pointer' }}/> */}
                    </TableCell>
                    {/* <TableCell className="text-center"><button onClick={() => setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></TableCell>
                    <TableCell><button onClick={() => seTableCelleleteIdx(index)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button></TableCell> */}
                </TableRow>
            </>
        )

    }
}