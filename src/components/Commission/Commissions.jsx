import axios from '../../axios';
import React, { useState,Fragment } from 'react'
import CommissionItem from './CommissionItem';
import AddCommission from './AddCommission';
import InlineWarning from './InlineWarning';

export default function Commissions({ title, base_url, project_id,plot_details, setPlotDetails,index }) {


    const commission_payments_endpoint = base_url + `projects/${project_id}/deals/${plot_details.deal.id}/commissions/`
    const table_schema = ['Date', 'Amount']

    const [create_view, setCreateView] = useState(false)
    const [deleteIdx, setDeleteIdx] = useState(-1)

    // POST
    const saveItem = (new_obj) => {
        return axios.post(commission_payments_endpoint, new_obj)
            .then((response) => {
                console.log(response.data)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.total_commission_paid = response.data.deal.total_commission_paid
                delete response.data.deal
                new_plot_details.deal.commission_payments.push(response.data)
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.data.detail === "Authentication credentials were not provided."){
                alert("Please Login First!");
                }
                else{
                alert("Some Error Occured while making request")
                }
                return false;
            })

    }

    // PUT
    const updateItem = (id, index, new_obj) => {
        return axios.put(commission_payments_endpoint + `${id}/`, new_obj)
            .then((response) => {
                console.log(response)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.total_commission_paid = response.data.deal.total_commission_paid
                delete response.data.deal
                new_plot_details.deal.commission_payments[index] = response.data
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.data.detail === "Authentication credentials were not provided."){
                alert("Please Login First!");
                }
                else{
                alert("Some Error Occured while making request")
                }
                return false;
            })
    }

    //DELETE
    const deleteItem = (id, index) => { // id,new_obj
        return axios.delete(commission_payments_endpoint + `${id}/`)
            .then( async (response) => {
                console.log("Deleted Successfully", response)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.total_commission_paid = response.data.deal.total_commission_paid
                delete response.data.deal
                new_plot_details.deal.commission_payments[index] = null
                await setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.data.detail === "Authentication credentials were not provided."){
                alert("Please Login First!");
                }
                else{
                alert("Some Error Occured while making request")
                }
                return false;
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
                {plot_details.deal.commission_payments && plot_details.deal.commission_payments.map((obj, index) => {
                    const currentlyDeleting = index === deleteIdx
                    if (obj){
                        if (currentlyDeleting){
                            return <InlineWarning key = {obj.id} obj = {obj}  index = {index} setDeleteIdx = {setDeleteIdx} deleteItem = {deleteItem}/>
                        }
                        return <CommissionItem key={obj.id} index={index} project_id={project_id} title={title} obj={obj} base_url={base_url} updateItem={updateItem} setDeleteIdx = {setDeleteIdx} />
                    }
                    else{
                        return <Fragment key = {"deleted-"  + index}></Fragment>
                    }
                })}
            </tbody>
        )
    }


    return (
        <div className="card col-xl-5">
        <div className="card-body">
            {/* <h5 className="card-title border-bottom pb-2"> {title} </h5> */}
            <div className="card-text">
                <table className="table">
                    {displayTableSchema()}
                    {listItems()}
                </table>

                {create_view === true && <AddCommission title="Commission Payments" setCreateView={setCreateView} saveItem={saveItem} />}
                {create_view === false && <button onClick={() => { setCreateView(true) }} style={{ marginLeft: '10px' }} className="btn btn-sm btn-primary">Add {title.substring(0, title.length - 1)} </button>}

            </div>
        </div>
        </div>
    )

}