import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import { Link } from "react-router-dom"
import Plot from './Plot'
// import PlotAndDeal from './PlotAndDeal'
import AddOrEditDeal from '../Deal/AddOrEditDeal';
import Deal from '../Deal/Deal';
import Dues from '../Due/Dues';
import Payments from '../Payment/Payments';
import CommissionPayments from '../Commission/Commissions';


export default function PlotDetails({ base_url, match }) {
	const project_id = match.params.project_id
	const plot_id = match.params.plot_id
	const endpoint = base_url + "projects/" + project_id + '/plots/' + plot_id

	const [plot_details, setPlotDetails] = useState({ deal: null })
	const [create_deal_view, setCreateDealView] = useState(false)
	// const [deal_created, setDealCreated] = useState(false)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		axios.get(endpoint)
			.then((response) => {
				setIsLoaded(true)
				setPlotDetails(response.data)
				// if (response.data.deal !== null) {
				// 	setDealCreated(true)
				// }
				console.log(response)
			})
			.catch((errors) => {
				setIsLoaded(true)
				setError(errors)
				console.log(errors)
			})
	}, [endpoint])


	const displayDeal = () => {
		return (
			<>
				<Deal title="Deals" base_url={base_url} project_id={project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.deal.id} />
				<Dues title="Dues" base_url={base_url} project_id={project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.deal.id} />
				<CommissionPayments  title="Commission Payments" base_url={base_url} project_id={project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.deal.id} />
				<Payments title="Payments" base_url={base_url} project_id={project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.deal.id} />
			</>
		)
	}


	const displayPlot = () => {
		if (error) {
			return <> Error: {error.message} </>
		} else if (!isLoaded) {
			return <> Loading... </>
		} else {
			return (
				<>

					<div className="row">
						<Plot title='Plots' base_url={base_url} project_id={project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.id} />
						{/* <PlotAndDeal title = "Plots" base_url = {base_url} project_id = {project_id} plot_details = {plot_details} setPlotDetails = {setPlotDetails} index = {plot_details.id}></PlotAndDeal> */}
						{plot_details.deal
							?
							displayDeal()
							: <></>
						}
						{!plot_details.deal && create_deal_view
							? <AddOrEditDeal title="Deals" base_url={base_url} project_id={project_id} plot_details={plot_details} setPlotDetails={setPlotDetails} index={plot_details.id} setEditingView={setCreateDealView} setDealCreated={/*setDealCreated*/""} />
							: <></>}
						{!plot_details.deal && !create_deal_view ? <div className="col-lg-7"><button onClick={() => { setCreateDealView(true) }} type="button" className="btn btn-primary m-3">Add Deal</button></div> : <></>}
					</div>
				</>
			)
		}
	}


	return (
		<div className='my-4 px-3'>
			<div>
				<div style={{ paddingBottom: 10 + 'px' }}>
					<h1> <Link to={`/projects/${plot_details.project_id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {plot_details.project_name} </Link></h1>
				</div>
				<div>
					{displayPlot()}
				</div>
			</div>
		</div>
	)
}
