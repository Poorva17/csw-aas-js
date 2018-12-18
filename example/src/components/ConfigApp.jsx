import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import aas from 'csw.auth'
import NavComponent from './NavComponent'
import {AppConfig} from '../config/AppConfig'
import WriteConfig from './WriteConfig'
import ReadConfig from './ReadConfig'

class ConfigApp extends React.Component {
  render() {
    const config = {...AppConfig}
    return <BrowserRouter>
      <div style={{'textAlign': 'center'}} className=' row card blue-grey darken-1 col s12 m7'>
        <NavComponent />
        <Route path='/write' render={(props) => (<aas.Secured config={config}>
          <WriteConfig />
        </aas.Secured>)} />
        <Route exact path='/read' component={ReadConfig} />
      </div>
    </BrowserRouter>
  }
}

export default ConfigApp
