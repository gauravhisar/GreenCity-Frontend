import React, { useState, useEffect } from 'react'

export default function EditDue({ title, obj, index, setEditingView, updateItem }) {
    const [plot_no, setDueNo] = useState("")
    const [area, setArea] = useState("")
    const [rate, setRate] = useState("")

    useEffect(() => {
        setDueNo(obj.plot_no)
        setArea(obj.area)
        setRate(obj.rate)
    }, [])
    const editItem = (e) => {
        // e.preventDefault()
        if (!plot_no) {
            alert("Enter Due No")
            return
        }
        else {
            let new_obj = {
                plot_no: plot_no,
                area: area,
                rate: rate
            }
            updateItem(obj.id, index, new_obj).then((success) => {
                if (success) {
                    setDueNo("")
                    setArea("")
                    setRate("")
                    setEditingView(false)
                }
            })
        }
    }

    return (

        // <form onSubmit={editItem}>
        <tr onKeyPress={(e) => { if (e.key === 'Enter') { editItem() } }}>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={plot_no} onChange={(e) => { setDueNo(e.target.value) }} placeholder="Due No" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={area} onChange={(e) => { setArea(e.target.value) }} placeholder="Area" />
            </td>
            <td>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={rate} onChange={(e) => { setRate(e.target.value) }} placeholder="Rate" />
            </td>
            <td className="text-center">
                <button onClick={editItem} style={{ margin: '0px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
            </td>
            <td>
                <button onClick={(e) => { setEditingView(false); }} style={{ margin: '0px' }} className="btn btn-sm btn-danger">Cancel</button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        // </form>
    )
}
