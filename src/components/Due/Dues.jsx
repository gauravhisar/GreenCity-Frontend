import axios from 'axios';
import React, { useState,Fragment } from 'react'
import DueItem from './DueItem';
import AddDue from './AddDue';

export default function Dues({ title, base_url, project_id,plot_details, setPlotDetails,index }) {


    const dues_endpoint = base_url + `projects/${project_id}/deals/${plot_details.deal.id}/dues/`
    const table_schema = ['Due Date', 'Payable Amount']

    const [create_view, setCreateView] = useState(false)

    // POST
    const saveItem = (new_obj) => {
        return axios.post(dues_endpoint, new_obj)
            .then((response) => {
                console.log(response.data)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.dues.push(response.data)
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                alert("Network Error! Try Again")
                console.log(error)
                return false
            })

    }

    // PUT
    const updateItem = (id, index, new_obj) => {
        return axios.put(dues_endpoint + `${id}/`, new_obj)
            .then((response) => {
                console.log(response)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.dues[index] = response.data
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((errors) => {
                alert("Network Error! Start Server and Try Again")
                console.log(errors)
                return false
            })
    }

    //DELETE
    const deleteItem = (id, index) => { // id,new_obj
        return axios.delete(dues_endpoint + `${id}/`)
            .then((response) => {
                console.log("Deleted Successfully", response)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.dues[index] = null
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((errors) => {
                alert("Network Error! Start Server and Try Again")
                console.log(errors)
                return false
            })
    }

    const displayTableSchema = () => {
        return (
            <thead>
                <tr>
                    {table_schema.map((colName) => {
                        return <th key={colName} scope="col"> {colName} </th>
                    })}
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
        )
    }


    const listItems = () => {
        return (
            <tbody>
                {plot_details.deal.dues && plot_details.deal.dues.map((obj, index) => {
                    if (obj){
                        return <DueItem key={index} index={index} project_id={project_id} title={title} obj={obj} base_url={base_url} updateItem={updateItem} deleteItem={deleteItem} />
                    }
                    else{
                        return <Fragment key = {index}></Fragment>
                    }
                })}
            </tbody>
        )
    }


    return (
        <div className="card col-lg-6 mx-4 my-3">
        <div className="card-body">
            <h5 className="card-title border-bottom pb-2"> {title} </h5>
            <div className="card-text">
                <table className="table">
                    {displayTableSchema()}
                    {listItems()}
                </table>

                {create_view === true && <AddDue title="Dues" setCreateView={setCreateView} saveItem={saveItem} />}
                {create_view === false && <button onClick={() => { setCreateView(true) }} style={{ marginLeft: '10px' }} className="btn btn-primary">Add {title.substring(0, title.length - 1)} </button>}

            </div>
        </div>
        </div>
    )

}