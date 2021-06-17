import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Item from './Item';


export default function ProjectDetails({ history, location, match }) {
	const base_url = 'http://localhost:8000/realestate/'
	const endpoint = base_url + "projects/" + match.params.id + '/'

	const [plot_creation_view, setPlotCreationView] = useState(false)


	const [project_details, setProjectDetails] = useState({})
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		axios.get(endpoint)
			.then((response) => {
				setIsLoaded(true)
				setProjectDetails(response.data)
				console.log(response.data)
			})
			.catch((errors) => {
				setIsLoaded(true)
				setError(errors)
				console.log(errors)
			})
	}, [endpoint])

	// PUT
	const updateItem = (id, index, new_obj, setEditingView) => {
		axios.put(endpoint, new_obj)
			.then((response) => {
				console.log(response.data)
				setEditingView(false)
				setProjectDetails(response.data)
				return true
			})
			.catch((errors) => {
				alert("Network Error! Start Server and Try Again")
				console.log(errors)
				return false
			})
	}

	//DELETE
	const deleteItem = (id, index) => { }  // will not be called because we cannot delete a Project, therefore not implemented


	const displayProjectDetails = () => {
		if (error) {
			return <tbody><tr><td> Error: {error.message} </td></tr></tbody>
		} else if (!isLoaded) {
			return <tbody><tr><td> Loading... </td></tr></tbody>
		} else {
			return (
				<Item title = 'Projects' obj = {project_details} index={project_details.id} updateItem={updateItem} deleteItem={deleteItem} />
			)
		}
	}

	return (
		<div className='my-4 px-3'>
			<div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
				<h1 className="d-inline" > {project_details.name} </h1>
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
							<th scope="col"></th>

						</tr>
					</thead>
					<tbody>
						{displayProjectDetails()}
					</tbody>
				</table>


			</div>
			<div style={{ paddingBottom: '10px', paddingLeft: '10px' }}>
				<h3 className="d-inline" >Plots</h3>
			</div>
			<table>
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>haha</td>
						<td>haha</td>
						<td>haha</td>
					</tr>
				</tbody>
			</table>

		</div>
	)
}
