import React, { useState } from 'react'


export default function AddDue({ title, setCreateView, saveItem }) {
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
    const [interest_given, setInterestGiven] = useState("")
    const [rebate, setRebate] = useState("")
    const [net_amount_paid,setNetAmountPaid] = useState("")
    const addItem = (e) => {
        e.preventDefault()
        if (!date) {
            alert("Enter Payment Date")
            return
        }
        if (interest_given === "") {
            alert("Enter interest Given")
            return
        }
        if (rebate === "") {
            alert("Enter Rebate")
            return
        }
        if (net_amount_paid === "") {
            alert("Enter Net Amount Paid!")
            return
        }
        const obj = {
            date: date,
            interest_given: interest_given,
            rebate: rebate,
            net_amount_paid: net_amount_paid
        }
        saveItem(obj).then((success) => {
            if (success) {
                setCreateView(false)
            }
        })
    }
    return (

        <form onSubmit={addItem}>
            <div className="row">
                <div className="col-sm-3">
                    <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="date" className="form-control" value={date} onChange={(e) => { setDate(e.target.value) }} placeholder="Date" />
                </div>
                <div className="col-sm-2">
                    <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={interest_given} onChange={(e) => { setInterestGiven(e.target.value) }} placeholder="Interest Given" />
                </div>
                <div className="col-sm-2">
                    <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={rebate} onChange={(e) => { setRebate(e.target.value) }} placeholder="Rebate" />
                </div>
                <div className="col-sm-2">
                    <input style={{ paddingTop: '3px', paddingBottom: '3px' }} type="number" className="form-control" value={net_amount_paid} onChange={(e) => { setNetAmountPaid(e.target.value) }} placeholder="Net Amount Paid" />
                </div>
                <div className="col-sm-3" style={{ textAlign: "right" }}>
                    <button style={{ marginRight: '2px' }} className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
                {/* </div>
                <div className="col-sm-2"> */}
                    <button onClick={(e) => { e.preventDefault(); setCreateView(false); }} style={{ marginLeft: '2px' }} className="btn btn-sm btn-danger">Cancel</button>
                </div>
            </div>
        </form>
    )
}