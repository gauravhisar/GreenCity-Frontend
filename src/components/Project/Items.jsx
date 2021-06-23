import axios from 'axios';
import React,{ useEffect, useState } from 'react'
import Item from './Item';
import AddProject from './AddProject';
import AddPerson from '../Person/AddPerson';

export default function Items({ title, base_url, ...props }) {


  const endpoint = {
    Projects: base_url + 'projects/',
    Dealers: base_url + 'dealers/',
    Customers: base_url + 'customers/'
  }

  const table_schema = {
    Projects: ['Name', 'Address', 'Total Plots', 'Total Area', 'Plots Sold', 'Area Sold'],
    Dealers: ['Name', 'Contact No', 'Other Info'],
    Customers: ['Name', 'Contact No', 'Other Info']

  }
  const [create_view, setCreateView] = useState(false)


  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [list, setList] = useState([])


  // GET ALL
  useEffect(() => {
    axios.get(endpoint[title])
      .then((response) => {
        setIsLoaded(true)
        setList(response.data)
      })
      .catch((errors) => {
        console.log(errors)
        setIsLoaded(true)
        setError(errors)
      })
  }, [])

  // POST
  const saveItem = (new_obj) => {   // returns True if request is successfull otherwise return false
    return axios.post(endpoint[title], new_obj)
      .then((response) => {
        console.log(response)
        // setCreateView(false)
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
  const updateItem = (id,index,new_obj)=>{  // returns True if request is successfull otherwise return false
    return axios.put(endpoint[title]+`${id}/`,new_obj)
    .then((response)=>{
    console.log(response.data)
    const new_list = [...list]
    // Object.keys(response.data).forEach((field)=>{
    //   new_list[index][field] = response.data[field]
    // })
    new_list[index] = response.data
    setList(new_list)
    return true
    })
    .catch((errors)=>{
      alert("Network Error! Start Server and Try Again")
      console.log(errors)
      return false
    })
}

//DELETE
const deleteItem = (id,index)=>{ // id,new_obj
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
          {table_schema[title].map((colName) => {
            return <th key={colName} scope="col"> {colName} </th>
          })}
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
    )
  }

  const listItems = () => {
    if (error) {
      return <tbody><tr><td> Error: {error.message} </td></tr></tbody>
    } else if (!isLoaded) {
      return <tbody><tr><td> Loading... </td></tr></tbody>
    } else {
      return (
        <tbody>
          {list.map((obj, index) => {
                return <Item key={obj.id} title={title} obj={obj} index = {index} updateItem={updateItem} deleteItem = {deleteItem}/>
          })}
        </tbody>
      )
    }
  }

  // returns 'add' form according to the title 
  const addItem = (title) => {
    if (title === 'Projects') {
      return <AddProject title={title} setCreateView={setCreateView} saveItem={saveItem} />
    }
    else {
      return <AddPerson title={title} setCreateView={setCreateView} saveItem={saveItem} />
    }
  }


  return (
    <div className='my-4 px-3'>
      <div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
        <h1> {title} </h1>
      </div>
      <div>
        <table className="table">
          {displayTableSchema()}
          {listItems()}
        </table>

        {create_view === true && addItem(title)}
        {create_view === false && <button onClick={() => { setCreateView(true) }} style={{ marginLeft: '10px' }} className="btn btn-primary">Add {title.substring(0, title.length - 1)} </button>}

      </div>
    </div>
  )

}
