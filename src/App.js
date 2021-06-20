import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './components/Header'
import ProjectDetails from './components/detailComponents/ProjectDetails'
import PlotDetails from './components/detailComponents/PlotDetails'
import Items from './components/Items'

const base_url = "http://localhost:8000/realestate/"
function App() {
  return (
    <div>
      <Router>
        <Header title="Rudra Estate" base_url={base_url} />

        <Switch>

          <Route exact path="/"          render={() => <Items title='Projects'  base_url={base_url} key='Projects'  />}></Route>
          <Route exact path="/projects"  render={() => <Items title='Projects'  base_url={base_url} key='Projects'  />}></Route>
          <Route exact path="/dealers"   render={() => <Items title='Dealers'   base_url={base_url} key='Dealers'   />}></Route>
          <Route exact path="/customers" render={() => <Items title='Customers' base_url={base_url} key='Customers' />}></Route>

          {/* <Route path="/projects/:id" components = {ProjectDetails}></Route> */}
          <Route path="/projects/:project_id" render = {(props)=><ProjectDetails base_url = {base_url} match = {props.match} history = {props.history} location = {props.location} />}></Route>
          <Route path="/projects/:project_id/plots/:plot_id" render = {(props)=><PlotDetails base_url = {base_url} match = {props.match} history = {props.history} location = {props.location}/>}></Route>

          

        </Switch>

      </Router>
    </div>
  );
}

export default App;
