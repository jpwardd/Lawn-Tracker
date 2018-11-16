import React from 'react'

import { Route, IndexRoute, Router, browserHistory } from "react-router";

import Nav from './Nav';
import JobsContainer from "../containers/JobsContainer"
import CustomersContainer from '../containers/CustomersContainer';
import Weather from "../components/Weather"
import EmployeesContainer from "../containers/EmployeesContainer"

export const App = (props) => {
  return (
   
      <Router history={browserHistory}>
        <Route path="/" component={Nav}>
        <IndexRoute component={JobsContainer} />
        <Route path="/customers" component={CustomersContainer} />
        <Route path="/weather" component={Weather} />
        <Route path="/employees" component={EmployeesContainer} />
        </Route>
      </Router>
  
  )
}

export default App