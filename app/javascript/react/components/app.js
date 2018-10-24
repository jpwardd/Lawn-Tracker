import React from 'react'
import ContactIndexContainer from '../containers/ContactIndexContainer'
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import ContactFormContainer from '../containers/ContactFormContainer';
import Navbar from '../components/NavBar'



export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Navbar}>
      <IndexRoute component={ContactIndexContainer} />
      </Route>
    </Router>
  
  )
}

export default App