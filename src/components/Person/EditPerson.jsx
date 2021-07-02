import React,{useState,useEffect} from 'react'

export default function EditPerson({title,obj,index,setEditingView,updateItem}) { 
    const [name,setName] = useState("")
    const [contact_no, setContactno] = useState("")
    const [other_info, setOtherinfo] = useState("")

    useEffect(() => {
        setName(obj.name)
        if (obj.contact_no == null){
            setContactno("")
        }
        else{
            setContactno(obj.contact_no)
        }
        setOtherinfo(obj.other_info)
    }, [obj])
    const editItem = (e)=>{
        // e.preventDefault()
        if(!name){
            alert("Enter " + title.substring(0,title.length-1) + " Name")
            return
        }
        else{
            let new_obj = {
                name: name,
                contact_no: contact_no,
                other_info: other_info
            }
            if(!contact_no){
                new_obj.contact_no = null
            }
            updateItem(obj.id,index,new_obj).then((success)=>{
                if (success){
                    setName("")
                    setContactno("")
                    setOtherinfo("")
                    setEditingView(false)
                }
            })
        }
    }
    
    return (

        // <form onSubmit={editItem}>
            <tr  onKeyPress = {(e)=>{if(e.key === 'Enter'){editItem()}}}>
                <td>
                    <input style = {{paddingTop:'3px',paddingBottom: '3px'}} type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
                </td>
                <td>
                    <input style = {{paddingTop:'3px',paddingBottom: '3px'}} type="text" className="form-control" value={contact_no} onChange={(e) => { setContactno(e.target.value) }} placeholder="Contact No" />
                </td>
                <td>
                    <input style = {{paddingTop:'3px',paddingBottom: '3px'}} type="text" className="form-control" value={other_info} onChange={(e) => { setOtherinfo(e.target.value) }} placeholder="Other Info" />
                </td>
                <td className = "text-center">
                    <button onClick={editItem} style={{ margin: '0px' }} type='submit' className="btn btn-sm btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
                </td>
                <td>
                    <button onClick={(e) => {setEditingView(false); }} style={{ margin: '0px' }} className="btn btn-sm btn-danger">Cancel</button>
                </td>
            </tr>
        // </form>
    )
}
