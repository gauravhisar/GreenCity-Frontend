import React from 'react'

export default function InlineWarning({obj,index,setDeleteIdx, deleteItem}) {
    return (
        <>
            <tr>
                <td className = 'text-center' colSpan = {4} style = {{fontWeight: 'bold'}}>Are you sure?</td>
                <td className = 'text-center'>
                    <button onClick = {()=>{deleteItem(obj.id, index).then((success)=>success && setDeleteIdx(-1))}} className = "btn btn-sm btn-danger"> Yes&nbsp; </button>
                </td>
                <td>
                    <button onClick = {()=>{ setDeleteIdx(-1) }} className = "btn btn-sm btn-primary">&nbsp;No&nbsp;</button>
                </td>
            </tr>
        </>
    )
}
