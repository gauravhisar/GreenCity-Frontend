import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './MyComponents/Header'
import Projects from './MyComponents/Projects'
import Customers from './MyComponents/Customers'
import Dealers from './MyComponents/Dealers'
function App() {
  let base_url = "http://192.168.1.5:8000/realestate/"
  return (
    <div>
      <Router>
        <Header title="Rudra Estate" base_url = {base_url}/>

        <Switch>

            <Route exact path="/">
              <Projects title = "Projects" base_url = {base_url}/>
            </Route>
            <Route exact path="/customers/">
              <Customers />
            </Route>
            <Route exact path="/dealers">
              <Dealers />
            </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
