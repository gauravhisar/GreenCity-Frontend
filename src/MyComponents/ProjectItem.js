import React,{useState} from 'react'
export default function ProjectItem({project,input,setInputRow,saveProjectItem}) {
    const [pname,setPname] = useState("")
    const [address, setAddress] = useState("")
    const [total_plots, setTotalPlots] = useState("")
    const [total_area, setTotalArea] = useState("")
    const addProjectItem = (e) => {
        e.preventDefault()
        if(!pname){
            alert("Enter Project Name")
            return
        }
        else if(!address){
            alert("Enter Address")
            return
        }
        else if(!total_plots){
            alert("Enter No. of Plots")
            return
        }
        else if(!total_area){
            alert("Enter Total Area")
            return
        }
        else{
            saveProjectItem(pname,address,total_plots,total_area)
            setPname("")
            setAddress("")
            setTotalPlots("")
            setTotalArea("")
        }
    }
  
    if (input === false){
        return (
        <tr>
            <th scope="row">
                <a  style = {{textDecoration:'none', color: 'inherit'}}>
                    {project.name}
                </a>
            </th>
            <td> {project.address} </td>
            <td> {project.total_plots} </td>
            <td> {project.total_area} </td>
            <td> {project.plots_sold} </td>
            <td> {project.area_sold} </td>
            {/* <td><button type = "button" className="btn btn-danger">Delete</button></td> */}
        </tr>
        )
    }
    else if (input === true){
        return (
            <form onSubmit = {addProjectItem}>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={pname} onChange = {(e)=>{setPname(e.target.value)}} placeholder="Name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={address} onChange = {(e)=>{setAddress(e.target.value)}} placeholder="Address" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={total_plots} onChange = {(e)=>{setTotalPlots(e.target.value)}} placeholder="No. of Plots" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={total_area} onChange = {(e)=>{setTotalArea(e.target.value)}} placeholder="Total Area" />
                    </div>
                    <div className="col">
                        <button type = 'submit' style = {{ marginLeft: '40px'}} className="btn btn-primary">&nbsp;Save&nbsp;&nbsp;</button>
                    </div>
                    <div className="col">
                        <button onClick = {(e)=>{e.preventDefault();setInputRow(null);}} style = {{ marginRight: '50px'}} className="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
    else{
        return (
            <button onClick = {()=>{setInputRow(true)}} style = {{ marginLeft: '10px'}} className="btn btn-primary">Add Project</button>

        )

    }
}


                    
ProjectItem.defaultProps = {
    input: false
}