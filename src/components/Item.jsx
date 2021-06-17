import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios';
import EditProject from './EditProject';
import EditPerson from './EditPerson';


export default function Item({title,obj,index,updateItem,deleteItem}) {
   

    const [editing_view, setEditingView] = useState(false)

 
    const displayDetails = () => {
        let fields = Object.keys(obj)
        fields.shift() // to remove id
        fields.shift() // to remove name
        if (fields[fields.length-1] === "plots" || fields[fields.length-1] === "deal"){
            // incase of put requests, someextra fields will be there, so we need to remove them
            fields.pop()
        }
        return (
            <tr>
                <th scope="row">
                    <Link to={`/${title.toLowerCase()}/${obj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {obj.name}
                    </Link>
                </th>
                {fields.map((field) => {
                    return <td key = {field}> {obj[field]} </td>
                })}
                <td className= "text-center"><button onClick={()=>setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                <td>
                    {title === 'Projects'?<></>:
                    <button onClick={()=>deleteItem()} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
                    }
                
                </td>
            </tr>
        )
    }



    if (editing_view === true) {
        return (
        <>
        {title === 'Projects'?
        <EditProject title = {title} obj = {obj} index = {index} updateItem = {updateItem} setEditingView = {setEditingView}/>:
        <EditPerson  title = {title} obj = {obj} index = {index} updateItem = {updateItem} setEditingView = {setEditingView}/>
        }
        </>
        )
    }
    else {
        return (
            <>
                {displayDetails()}
            </>
        )

    }
}