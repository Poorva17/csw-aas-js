import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import aas from 'csw.auth'
import NavComponent from './NavComponent'
import {AppConfig} from '../config/AppConfig'
import WriteConfig from './WriteConfig'
import ReadConfig from './ReadConfig'

class ConfigApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {authenticated: false}
  }

  render() {
    const config = {...AppConfig}
    return <BrowserRouter>
      <div style={{'textAlign': 'center'}} className=' row card blue-grey darken-1 col s12 m7'>
        <NavComponent />
        <Route path='/write' render={(_) => (<aas.Secured config={config} callback={this.setAuthenticated}>
          <WriteConfig />
        </aas.Secured>)} />

        <Route path='/readOnly' render={(_) => (<aas.CheckSSO isAuthenticated={this.state.authenticated}>
          <div>Secured read need to login</div>
          <ReadConfig />
        </aas.CheckSSO>)} />

        <Route exact path='/read' component={ReadConfig} />
      </div>
    </BrowserRouter>
  }

  setAuthenticated = (authenticated) => {
    this.setState({authenticated: authenticated})
  }
}

export default ConfigApp
