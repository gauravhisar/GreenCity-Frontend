import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PlotItem from './itemComponents/PlotItem';
import AddPlot from './cruds/AddPlot';

export default function Plots({ title, base_url, plots }) {


    const endpoint = base_url + 'plots/'
    const table_schema = ['Plot No', 'Area', 'Rate', 'Amount', 'Dealer', 'Customer', 'Balance']

    const [create_view, setCreateView] = useState(false)
    const [list, setList] = useState([])

    // const [error, setError] = useState(null)
    // const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        setList([...plots])
    }, [plots])

    // POST
    const saveItem = (new_obj) => {
        return axios.post(endpoint, new_obj)
            .then((response) => {
                console.log(response.data)
                setList([...list, response.data])
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
        return axios.put(endpoint + `${id}/`, new_obj)
            .then((response) => {
                console.log(response.data)
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
                {list.map((obj, index) => {
                    return <PlotItem key={obj.id} title={title} obj={obj} base_url={base_url} updateItem={updateItem} deleteItem={deleteItem} />
                })}
            </tbody>
        )
    }


    return (
        <div style={{ marginTop: '40px' }}>
            <div>
                <h3> {title} </h3>
            </div>
            <div>
                <table className="table">
                    {displayTableSchema()}
                    {listItems()}
                </table>

                {create_view === true && <AddPlot title="Plots" setCreateView={setCreateView} saveItem={saveItem} />}
                {create_view === false && <button onClick={() => { setCreateView(true) }} style={{ marginLeft: '10px' }} className="btn btn-primary">Add {title.substring(0, title.length - 1)} </button>}

            </div>
        </div>
    )

}