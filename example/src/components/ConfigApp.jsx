import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'

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

        <Route path='/secured' render={(_) => (<aas.Secured config={config} onAuthentication={this.setAuthenticated}>
          <Link style={{'color': 'white'}} to='/secured/profile'> profile </Link>
          <br />
          <Link style={{'color': 'white'}} to='/secured/list'> list </Link>
          <br />
          <Route exact path='/secured/profile' component={ReadConfig} />
          <Route exact path='/secured/list' component={WriteConfig} />
        </aas.Secured>)} />

        <Route exact path='/public' component={ReadConfig} />

        <Route exact path='/sso' render={(_) => {
          if (this.state.authenticated) {
            return <div>
              You are logged in!!!
              <ReadConfig />
              <WriteConfig />
            </div>
          } else {
            return null
          }
        }} />

      </div>
    </BrowserRouter>
  }

  setAuthenticated = (authenticated) => {
    this.setState({authenticated: authenticated})
  }
}

export default ConfigApp
