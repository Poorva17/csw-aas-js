import {Link} from 'react-router-dom'
import React from 'react'

class NavComponent extends React.Component {
  render() {
    return <div className='white-text'>
      <Link style={{'color': 'white'}} to='/read'>Read Config</Link> | <Link style={{'color': 'white'}} to='/write'>Login and Write Config</Link> | <Link style={{'color': 'white'}} to='/readOnly'>Read if logged in Config</Link>
    </div>
  }
}

export default NavComponent
