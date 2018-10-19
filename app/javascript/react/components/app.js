import React from 'react'
import ContactIndexContainer from '../containers/ContactIndexContainer'
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import ContactFormContainer from '../containers/ContactFormContainer';



export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={ContactIndexContainer} />
    </Router>
  
  )
}

export default App