import axios from 'axios';
import React from 'react'
import {useEffect} from 'react';
import { useState } from 'react';
import ProjectItem from './ProjectItem';


export default function Projects(props) {
  const [input_row, setInputRow] = useState(null)
  const [pid, setPid] = useState("")

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [projectlist, setProjectList] = useState([])


  // getting all the projects when the page gets loaded
  useEffect(() => {
      axios.get(props.base_url + "projects/")
        .then((response) => {
          setIsLoaded(true)
          setProjectList(response.data)
        })
        .catch((errors) => {
          console.log(errors)
          setIsLoaded(true)
          setError(errors)
        })
      },[props.base_url])

  const ListProjects =()=>{
    if(error){
      return <tbody><tr><td> Error: {error.message} </td></tr></tbody>
    } else if (!isLoaded) {
      return <tbody><tr><td> Loading... </td></tr></tbody>
    } else {
      return (
        <tbody>
        {projectlist.map((project) => {
          return <ProjectItem project={project} key={project.id} input={false} />
        })}
        </tbody>
      )
    }
  }

  const saveProjectItem = (pname, address, total_plots, total_area) => {
    axios.post(props.base_url + "projects/", {
      name: pname,
      address: address,
      total_area: total_area,
      total_plots: total_plots
    })
      .then((response) => {
        console.log(response)
        setPid(response.data.id)  // we already have rest of the data
      })
      .catch((error) => {
        console.log(error, "Heeeeeeello")
      })
    setProjectList([...projectlist, {
      id: pid,
      name: pname,
      address: address,
      total_area: total_area,
      total_plots: total_plots
    }])

    setInputRow(null)
  }

    return (
      <div className='my-4 px-3'>
        <div className='projects-head' style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
          <h1 className="d-inline" >{props.title}</h1>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">No. of Plots</th>
                <th scope="col">Total Area</th>
                <th scope="col">Plots Sold</th>
                <th scope="col">Area Sold</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {ListProjects()}
          </table>
          <ProjectItem input={input_row} setInputRow={setInputRow} saveProjectItem={saveProjectItem} /> {/* input = false(simple table column)  true(input column) null(show nothing)  setProjectList = {setProjectList} projectlist = {projectlist} base_url={props.base_url}*/}
        </div>
      </div>
    )

  }
