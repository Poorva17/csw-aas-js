import React from 'react'
import PropTypes from 'prop-types'
import {TMTAuthContext} from './TMTAuth.jsx'

export class CheckLogin extends React.Component {
  static contextType = TMTAuthContext;

  render() {
    if (this.context.authenticated) {
      return <div className='card-content white-text'>
        {this.props.children}
      </div>
    } else {
      return null
    }
  }
}

CheckLogin.propTypes = {
  children: PropTypes.node
}
