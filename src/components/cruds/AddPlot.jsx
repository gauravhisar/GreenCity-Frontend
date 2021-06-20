import React,{useState} from 'react'

export default function AddPerson({title,setCreateView,saveItem}) {
    const [plot_no,setPlotNo] = useState("")
    const [area, setArea] = useState("")
    const [rate, setRate] = useState("")
    const addItem = (e) => {
        e.preventDefault()
        if(!plot_no){
            alert("Enter Plot No")
            return
        }
        if(!area){
            alert("Enter Area! If not sure enter any value")
            return
        }
        else{
            const obj = {
                plot_no: plot_no,
                area: area,
                rate: rate
            }
            saveItem(obj).then((success)=>{
                if (success){
                    setPlotNo("")
                    setArea("")
                    setRate("")
                }
            })
        }
    }
    return (
        <form onSubmit = {addItem}>
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" value={plot_no} onChange = {(e)=>{setPlotNo(e.target.value)}} placeholder="Plot No" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" value={area} onChange = {(e)=>{setArea(e.target.value)}} placeholder="Area" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" value={rate} onChange = {(e)=>{setRate(e.target.value)}} placeholder="Rate" />
                </div>
                <div className="col">
                    <button type = 'submit' style = {{ marginLeft: '80px'}} className="btn btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
                </div>
                <div className="col">
                    <button onClick = {(e)=>{e.preventDefault();setCreateView(false);}} style = {{ marginRight: '50px'}} className="btn btn-danger">Cancel</button>
                </div>
            </div>
        </form>
    )
}   