import React, { useState, useEffect } from 'react'

export default function EditProject({ title, obj, index, setEditingView, updateItem }) {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [total_plots, setTotalPlots] = useState("")
    const [total_area, setTotalArea] = useState("")

    useEffect(() => {
        setName(obj.name)
        setAddress(obj.address)
        setTotalPlots(obj.total_plots)
        setTotalArea(obj.total_area)
    }, [obj])

    const editItem = (e) => {
        // e.preventDefault()
        if (!name) {
            alert("Enter Project Name")
            return
        }
        else {
            let new_obj = {
                name: name,
                address: address,
                total_plots: total_plots,
                total_area: total_area
            }
            updateItem(obj.id, index, new_obj).then((success) => {
                if (success) {
                    setName("")
                    setAddress("")
                    setTotalPlots("")
                    setTotalArea("")
                    setEditingView(false)
                }
            })
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            editItem()
        }
    }

    return (

        // <form onSubmit={editItem}>
        <tr>
            <td onKeyPress={handleKeyPress}>
                <input autoFocus style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
            </td>
            <td onKeyPress={handleKeyPress}>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" />
            </td>
            <td onKeyPress={handleKeyPress}>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={total_plots} onChange={(e) => { setTotalPlots(e.target.value) }} placeholder="No. of Plots" />
            </td>
            <td onKeyPress={handleKeyPress}>
                <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="text" className="form-control" value={total_area} onChange={(e) => { setTotalArea(e.target.value) }} placeholder="Total Area" />
            </td>
            <td className="text-center" style={{ paddingLeft: '10px' }}>
                <button onClick={editItem} style={{ margin: '0px', }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
            </td>
            <td>
                <button onClick={(e) => {setEditingView(false); }} style={{ margin: '0px' }} className="btn btn-sm btn-danger">Cancel</button>
            </td>
            <td></td>
            <td></td>
        </tr>
    )
}
