import React from 'react'
import KeyCloak from 'keycloak-js'
import Logout from './Logout.jsx'
import PropTypes from 'prop-types'
import {AASConfig} from '../config/AASConfig'

class Secured extends React.Component {
  constructor(props) {
    super(props)
    this.state = {keycloak: null, authenticated: false}
  }

  async componentWillMount() {
    const keycloak = KeyCloak({...AASConfig, ...this.props.config})
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(0)
        .success(function () {
          console.info('token refreshed successfully')
        })
        .error(function() {
          console.error('Failed to refresh the token, or the session has expired')
        })
    }
    const authenticated = await keycloak.init({onLoad: 'login-required', flow: 'hybrid'})
    this.setState({keycloak, authenticated})
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        return <div className='card-content white-text'>
          {this.props.children}
          <Logout keycloak={this.state.keycloak} />
        </div>
      } else {
        return <div>
          <h3>Unable to authenticate!</h3>
        </div>
      }
    } else {
      return <div className='card-content white-text'>
        <h3>Initialising keycloak....</h3>
        <div>Logging in</div>
      </div>
    }
  }
}

Secured.propTypes = {
  config: PropTypes.object,
  children: PropTypes.node
}

export default Secured
