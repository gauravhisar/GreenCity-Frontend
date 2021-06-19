import React, { useState } from 'react'
import {Link} from "react-router-dom"
import EditPlot from '../cruds/EditPlot';

export default function PlotItem({title,obj,index,updateItem,deleteItem}) {
   

    const [editing_view, setEditingView] = useState(false)

 
    const displayDetails = () => {
        let fields = Object.keys(obj)
        fields.shift() // to remove id
        fields.shift() // to remove plot_no
        console.log(fields)
        // if (fields[fields.length-1] === "plots" || fields[fields.length-1] === "deal"){
        //     // incase of put requests, someextra fields will be there, so we need to remove them
        //     fields.pop()
        // }
        return (
            <tr>
                <th scope="row">
                    <Link to={`/${title.toLowerCase()}/${obj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {obj.plot_no}
                    </Link>
                </th>
                {fields.map((field) => {
                    return <td key = {field}> {obj[field]} </td>
                })}
                <td className= "text-center"><button onClick={()=>setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                <td>
                    <button onClick={()=>deleteItem()} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        )
    }



    if (editing_view === true) {
        return (
        <EditPlot title = {title} obj = {obj} index = {index} updateItem = {updateItem} setEditingView = {setEditingView}/>
        )
    }
    else {
        console.log(obj)
        return (
            <tr>
                <th scope="row">
                    <Link to={`/${title.toLowerCase()}/${obj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {obj.plot_no}
                    </Link>
                </th>
                <td> {obj.area} </td>
                <td> {obj.rate} </td>
                <td> {obj.amount} </td>
                <td><Link to = {`/dealers/${obj.dealer_id}`}     style={{ textDecoration: 'none', color: 'inherit' }}> {obj.dealer_name}   </Link></td>
                <td><Link to = {`/customers/${obj.customer_id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {obj.customer_name} </Link></td>
                <td> {obj.balance} </td>
                <td className= "text-center"><button onClick={()=>setEditingView(true)} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-secondary">Edit</button></td>
                <td>
                    <button onClick={()=>deleteItem()} style={{ margin: '0px' }} type="button" className="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        )

    }
}