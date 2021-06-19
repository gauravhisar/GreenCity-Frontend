import React,{useState} from 'react'

export default function AddProject({title,setCreateView,saveItem}) {  // if obj is none we have to add new item, otherwise we have to update given item
    const [name,setName] = useState("")
    const [address, setAddress] = useState("")
    const [total_plots, setTotalPlots] = useState("")
    const [total_area, setTotalArea] = useState("")
    
    const addItem = (e) => {
        e.preventDefault()
        if(!name){
            alert("Enter Project Name")
            return
        }
        else{
            let obj = {
                name: name,
                address: address,
                total_plots: total_plots,
                total_area: total_area
            }
            if(saveItem(obj)){
                setName("")
                setAddress("")
                setTotalPlots("")
                setTotalArea("")
            }
        }
    }
    return (

        <form onSubmit={addItem}>
            <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={total_plots} onChange={(e) => { setTotalPlots(e.target.value) }} placeholder="No. of Plots" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={total_area} onChange={(e) => { setTotalArea(e.target.value) }} placeholder="Total Area" />
                    </div>
                    <div className="col">
                        <button type='submit' style={{ marginLeft: '80px' }} className="btn btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
                    </div>
                    <div className="col">
                        <button onClick={(e) => { e.preventDefault(); setCreateView(false) }} style={{ marginRight: '50px' }} className="btn btn-danger">Cancel</button>
                    </div>
            </div>
        </form>
    )
}
