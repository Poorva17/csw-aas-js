import {Link} from 'react-router-dom'
import React from 'react'

class NavComponent extends React.Component {
  render() {
    return <div className='white-text'>
      <Link style={{'color': 'white'}} to='/public'> Public </Link>
      <br />
      <Link style={{'color': 'white'}} to='/secured'> Secured </Link>
      <br />
      <Link style={{'color': 'white'}} to='/sso'> Show if logged in </Link>
      <br />
    </div>
  }
}

export default NavComponent
