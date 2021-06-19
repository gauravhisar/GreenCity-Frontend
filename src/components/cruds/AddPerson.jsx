import React,{useState} from 'react'

export default function AddPerson({title,setCreateView,saveItem}) {
    const [name,setName] = useState("")
    const [contact_no, setContactno] = useState("")
    const [other_info, setOtherinfo] = useState("")
    const addItem = (e) => {
        e.preventDefault()
        if(!name){
            alert("Enter " + title.substring(0,title.length-1) + " Name")
            return
        }
        else{
            const obj = {
                name: name,
                contact_no: contact_no,
                other_info: other_info
            }
            if(!contact_no){
                obj.contact_no = null
            }
            if (saveItem(obj)){
                setName("")
                setContactno("")
                setOtherinfo("")
            }
        }
    }
    return (
        <form onSubmit = {addItem}>
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" value={name} onChange = {(e)=>{setName(e.target.value)}} placeholder="Name" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" value={contact_no} onChange = {(e)=>{setContactno(e.target.value)}} placeholder="Contact Number" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" value={other_info} onChange = {(e)=>{setOtherinfo(e.target.value)}} placeholder="Other Info" />
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