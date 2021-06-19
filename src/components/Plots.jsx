import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PlotItem from './itemComponents/PlotItem';
import AddPlot from './cruds/AddPlot';

export default function Plots({ title, base_url, plots}) {


    const endpoint = base_url + 'plots/'
    const table_schema = ['Plot No', 'Area', 'Rate', 'Amount', 'Dealer', 'Customer', 'Balance']
    // console.log(plots)
    
    const constructedData = (plot) => {
        let obj = { ...plot }
        delete obj.project
        obj.deal = false
        if (plot.deal !== null) {
            obj.deal = true
            obj.dealer_id = plot.deal.dealer_id
            obj.dealer_name = plot.deal.dealer_name
            obj.customer_id = plot.deal.customer_id
            obj.customer_name = plot.deal.customer_name
            obj.balance = plot.deal.balance
            obj.penalty = plot.deal.penalty
        }
        return obj
    }

    const [create_view, setCreateView] = useState(false)
    const [list, setList] = useState([])

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
            setList([...plots.map(plot=>constructedData(plot))])
        }, [plots])
        
    // POST
    const saveItem = (new_obj) => {
        axios.post(endpoint, new_obj)
            .then((response) => {
                console.log(response)
                setCreateView(false)
                setList([...list, constructedData(response.data)])
                return true
            })
            .catch((error) => {
                alert("Network Error! Try Again")
                console.log(error)
                return false
            })

    }

    // PUT
    const updateItem = (id, index, new_obj, setEditingView) => {
        axios.put(endpoint + `${id}/`, new_obj)
            .then((response) => {
                console.log(response.data)
                setEditingView(false)
                const new_list = [...list]
                new_list[index] = response.data
                setList(new_list)
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
        alert("Deletion Not Compatible right now")
        // axios.put(endpoint[title]+`${id}/`,new_obj)
        // .then((response)=>{
        // console.log(response)
        // setEditingView(false)
        // setList((prevList)=>{
        //     prevList[id] = response.data
        //     return prevList
        //     })
        // })
        // .catch((errors)=>{
        //   alert("Network Error! Start Server and Try Again")
        //   console.log(errors)
        // })
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
        // if (error) {
        //     return <tbody><tr><td> Error: {error.message} </td></tr></tbody>
        // } else if (!isLoaded) {
        //     return <tbody><tr><td> Loading... </td></tr></tbody>
        // } else {
            return (
                <tbody>
                    {list.map((obj, index) => {
                        return <PlotItem key={obj.id} title={title} obj={obj} updateItem={updateItem} deleteItem={deleteItem} />
                    })}
                </tbody>
            )
        // }
    }

    // returns 'add' form according to the title

    return (
        <div style = {{marginTop:'40px'}}>
            <div>
                <h3> {title} </h3>
            </div>
            <div>
                <table className="table">
                    {displayTableSchema()}
                    {listItems()}
                </table>

                {/* {create_view === true && addItem(title)} */}
                {create_view === false && <button onClick={() => { setCreateView(true) }} style={{ marginLeft: '10px' }} className="btn btn-primary">Add {title.substring(0, title.length - 1)} </button>}

            </div>
        </div>
    )

}