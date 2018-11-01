import React from 'react'

import { Route, IndexRoute, Router, browserHistory } from "react-router";
import MainContentContainer from '../containers/MainContentContainer';

import NavBar from './NavBar';




export const App = (props) => {
  return (
   
      <Router history={browserHistory}>
        <Route path="/" component={NavBar}>
        <IndexRoute component={MainContentContainer} />
        </Route>
      </Router>
  
  )
}

export default App