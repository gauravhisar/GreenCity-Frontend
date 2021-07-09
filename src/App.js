import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './components/Header'
import Login from './components/Login'
import Logout from './components/Logout'
import ProjectDetails from './components/ProjectDetailsPage/ProjectDetails'
import PlotDetails from './components/PlotDetailsPage/PlotDetails'
import Items from './components/Project/Items'
import Customer from "./components/Person/Customer"
import Dealer from "./components/Person/Dealer"
import { ProjectContext, UserContext } from "./Context"
const base_url = "http://localhost:8000/realestate/"
function App() {
  const [filters, setFilters] = React.useState({
    sold: false,
    unsold: false,
    pending: false,
    apply_dates: false,
    start_date: new Date().toISOString().substring(0, 10),
    end_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .substring(0, 10),
  }); 

  const [user, setUser] = React.useState(()=>{
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) return false;
    const payload = JSON.parse(atob(refreshToken.split(".")[1]))
    // console.log(new Date(payload.exp*1000), new Date(now))
    if (payload.exp*1000 > new Date().getTime()){
      console.log("Refresh Token Valid! Logged in")
      return true
    }
    else{
      console.log("Refresh Token Not Valid! Logged Out")
      return false
    }

  })
  return (
    <div>
      <Router>
          <UserContext.Provider value = {{user,setUser}}>
        <Header title="Rudra Estate" base_url={base_url} />
          </UserContext.Provider>

        <Switch>
            <Route exact path="/"          render={() => <Items title='Projects'  base_url={base_url} key='Projects'  />}></Route>
            <Route exact path="/projects"  render={() => <Items title='Projects'  base_url={base_url} key='Projects'  />}></Route>
            <Route exact path="/dealers"   render={() => <Items title='Dealers'   base_url={base_url} key='Dealers'   />}></Route>
            <Route exact path="/customers" render={() => <Items title='Customers' base_url={base_url} key='Customers' />}></Route>
            <Route exact path="/dealers/:dealer_id"   render={() => <Dealer title='Dealers' base_url={base_url} key='Dealers'   />}></Route>
            <Route exact path="/customers/:customer_id" render={() => <Customer title='Customers' base_url={base_url} key='Customers' />}></Route>
            <Route exact path="/projects/:project_id/plots/:plot_id" render = {(props)=><PlotDetails base_url = {base_url} match = {props.match}/>}></Route>

          {/* <Route path="/projects/:id" components = {ProjectDetails}></Route> */}
          <ProjectContext.Provider value = {{filters, setFilters}}>
            <Route exact path="/projects/:project_id" render = {(props)=><ProjectDetails base_url = {base_url} match = {props.match}  />}></Route>
          </ProjectContext.Provider>
        </Switch>
        <Switch>
          <UserContext.Provider value = {{user,setUser}}>
            <Route exact path="/login"          render={() => <Login title='Login'  base_url={base_url} key='Login'  />}></Route>
            <Route exact path="/logout"          render={() => <Logout title='Logout'  base_url={base_url} key='Logout'  />}></Route>
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
