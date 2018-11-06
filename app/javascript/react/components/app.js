import React from 'react'

import { Route, IndexRoute, Router, browserHistory } from "react-router";

import Nav from './Nav';
import JobsContainer from "../containers/JobsContainer"
import CustomersContainer from '../containers/CustomersContainer';




export const App = (props) => {
  return (
   
      <Router history={browserHistory}>
        <Route path="/" component={Nav}>
        <IndexRoute component={JobsContainer} />
        </Route>
        <Route path="/customers" component={CustomersContainer} />
        
      </Router>
  
  )
}

export default App