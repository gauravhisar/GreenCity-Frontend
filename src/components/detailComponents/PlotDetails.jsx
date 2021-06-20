import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlotItem from '../itemComponents/PlotItem'
import Plots from '../Plots';


export default function ProjectDetails({ base_url, match }) {
	const endpoint = base_url + "projects/" + match.params.project_id + '/plots/' + match.params.plot_id
	console.log(match)

	const [plot_details, setPlotDetails] = useState({ deal:[] })
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		axios.get(endpoint)
			.then((response) => {
				setIsLoaded(true)
				setPlotDetails(response.data)
				console.log(response.data)
			})
			.catch((errors) => {
				setIsLoaded(true)
				setError(errors)
				console.log(errors)
			})
	}, [endpoint])

	// PUT
	const updateItem = (id, index, new_obj) => {
		return axios.put(endpoint, new_obj)
			.then((response) => {
				console.log(response)
				const new_plot_details = {...plot_details}
				Object.keys(response.data).forEach((field)=>{
					new_plot_details[field] = response.data[field]
				})
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
	const deleteItem = (id, index) => {
		alert("Deletion Not Compatible Yet")
	 }  // will not be called because we cannot delete a Project, therefore not implemented


	const displayPlotDetails = () => {
		if (error) {
			return <tr><td> Error: {error.message} </td></tr>
		} else if (!isLoaded) {
			return <tr><td> Loading... </td></tr>
		} else {
			return (
				<PlotItem title='Plots' obj={plot_details} index={plot_details.id} updateItem={updateItem} deleteItem={deleteItem} />
			)
		}
	}

	return (
		<div className='my-4 px-3'>
			<div>
				<div style={{ paddingBottom: '10px'}}>
					<h1 className="d-inline" > {plot_details.plot_no} </h1>
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
							{displayPlotDetails()}
						</tbody>
					</table>
				</div>
			</div>
			{/* {project_details.plots[0].plot_no} */}
			{/* <Plots title="Plots" base_url={endpoint} plots={[...plot_details.deal]} /> */}

		</div>
	)
}
