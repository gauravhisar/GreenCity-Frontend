import axios from '../../axios';
import React, { useState, Fragment } from 'react'
import DueItem from './DueItem';
import AddDue from './AddDue';
import InlineWarning from './InlineWarning';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const headCells = [
    {
        id: 'due_date',
        label: 'Due Date',
        style: {fontWeight: 'bold', padding: '0px 0px 0px 0px', minWidth: '164px'}
    },
    {
        id: 'payable_amount_percentage',
        label: 'Payable Amount(%)',
        style: {fontWeight: 'bold', padding: '0px 0px 0px 10px'}
    },
    {
        id: 'payable_amount',
        label: 'Payable Amount',
        style:{fontWeight: 'bold', padding: '0px'}
    }
]

export default function Dues({ title, base_url, project_id, plot_details, setPlotDetails, index }) {


    const dues_endpoint = base_url + `projects/${project_id}/deals/${plot_details.deal.id}/dues/`
    const [deleteIdx, setDeleteIdx] = useState(-1)

    const [create_view, setCreateView] = useState(false)

    // POST
    const saveItem = (new_obj) => {
        return axios.post(dues_endpoint, new_obj)
            .then((response) => {
                console.log(response.data)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.dues = response.data.deal.dues
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response && error.response.data.detail === "Authentication credentials were not provided.") {
                    alert("Please Login First!");
                }
                else {
                    alert("Some Error Occured while making request")
                }
                return false;
            })

    }

    // PUT
    const updateItem = (id, index, new_obj) => {
        return axios.put(dues_endpoint + `${id}/`, new_obj)
            .then((response) => {
                console.log(response)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.dues = response.data.deal.dues
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response && error.response && error.response.data.detail === "Authentication credentials were not provided.") {
                    alert("Please Login First!");
                }
                else {
                    alert("Some Error Occured while making request")
                }
                return false;
            })
    }

    //DELETE
    const deleteItem = (id, index) => { // id,new_obj
        return axios.delete(dues_endpoint + `${id}/`)
            .then((response) => {
                console.log("Deleted Successfully", response)
                const new_plot_details = { ...plot_details }
                new_plot_details.deal.dues = response.data.deal.dues
                // new_plot_details.deal.dues[index] = null
                setPlotDetails(new_plot_details)
                return true
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    alert(JSON.stringify(error.response.data));
                }
                else {
                    alert("Some Error Occured while making request")
                }
                return false;
            })
    }

    const displayTableSchema = () => {
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => {
                        return <TableCell component = {"th"} style = {headCell.style} key={headCell.id}> {headCell.label} </TableCell>
                    })}
                    <TableCell style = {{padding: '0px'}}></TableCell>
                    <TableCell style = {{padding: '0px'}}></TableCell>
                    {/* <th scope="col"></th> */}
                </TableRow>
            </TableHead>
        )
    }


    const listItems = () => {
        return (
            <TableBody>
                {plot_details.deal.dues && plot_details.deal.dues.map((obj, index) => {
                    const currentlyDeleting =  index === deleteIdx;
                    if (obj) {
                        if (currentlyDeleting){
                            return <InlineWarning key = {obj.id} obj = {obj} index = {index} deleteItem = {deleteItem} setDeleteIdx = {setDeleteIdx} />
                        }
                        return <DueItem key={obj.id} index={index} project_id={project_id} title={title} obj={obj} base_url={base_url} updateItem={updateItem} setDeleteIdx = {setDeleteIdx} plotAmount={plot_details.amount} />
                    }
                    else {
                        return <Fragment key={"deleted-" + index}></Fragment>
                    }
                })}
                {create_view === true && <AddDue title="Dues" setCreateView={setCreateView} saveItem={saveItem} plotAmount={plot_details.amount} />}
            </TableBody>
        )
    }


    return (
        <div className="card col-lg-5 my-2 mx-2">
            <div className="card-body">
                {/* <h5 className="card-title border-bottom pb-2"> {title} </h5> */}
                <div className="card-text">
                    <Table className="table">
                        {displayTableSchema()}
                        {listItems()}
                    </Table>

                    {create_view === false && <button onClick={() => { setCreateView(true) }} style={{ marginLeft: '10px' }} className="btn btn-sm btn-primary">Add {title.substring(0, title.length - 1)} </button>}

                </div>
            </div>
        </div>
    )

}