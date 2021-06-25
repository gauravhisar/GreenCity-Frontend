import React, { useState } from 'react'

export default function AddDue({ title, setCreateView, saveItem }) {
    const [deal_id, setDealId] = useState("")
    const [plot_no, setPlotNo] = useState("")
    const addItem = (e) => {
        e.preventDefault()
        if (!deal_id) {
            alert("Enter Due No")
        }
        else {
            const obj = {
                deal_id: deal_id,
            }
            saveItem(obj).then((success) => {
                if (success) {
                    setDealId("")
                }
            })
        }
    }
    return (
        <form onSubmit={addItem}>
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" value={plot_no} onChange={(e) => { setDealId(e.target.value) }} placeholder="Due No" />
                </div>
                <div className="col">
                    <button type='submit' style={{ marginLeft: '80px' }} className="btn btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
                </div>
                <div className="col">
                    <button onClick={(e) => { e.preventDefault(); setCreateView(false); }} style={{ marginRight: '50px' }} className="btn btn-danger">Cancel</button>
                </div>
            </div>
        </form>
    )
}