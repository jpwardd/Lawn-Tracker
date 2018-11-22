import React from 'react'
import { render } from 'react-dom'
import App from '../react/components/app'
import RedBox from 'redbox-react'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { amber } from '@material-ui/core/colors'



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: {
      main: "#f44336"
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')
  if (reactElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, reactElement)
      } catch (e) {
        render(<RedBox error={e} />, reactElement)
      }
    }
    else {
      render(
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
        , 
        reactElement
      )
    }
  }
})