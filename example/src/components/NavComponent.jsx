import {Link} from 'react-router-dom'
import React from 'react'

class NavComponent extends React.Component {
  render() {
    return <div className='white-text'>
      <Link style={{'color': 'white'}} to='/public'> Public - Read Config</Link>
      <br />
      <Link style={{'color': 'white'}} to='/write'> Secured - Write Config </Link>
      <br />
      <Link style={{'color': 'white'}} to='/login'> Login </Link>
      <br />
    </div>
  }
}

export default NavComponent
