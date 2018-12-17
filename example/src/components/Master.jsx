import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import index from 'csw.auth'
import NavComponent from './NavComponent'
import {AppConfig} from '../config/AppConfig'

class Master extends React.Component {
  render() {
    const config = {...AppConfig}
    return <BrowserRouter>
      <div style={{'textAlign': 'center'}} className=' row card blue-grey darken-1 col s12 m7'>
        <NavComponent />
        <Route path='/secured' render={(props) => (<index.SecuredComponent config={config} />)} />
      </div>
    </BrowserRouter>
  }
}

export default Master
