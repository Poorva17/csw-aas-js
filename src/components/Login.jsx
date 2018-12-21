import React from 'react'
import KeyCloak from 'keycloak-js'
import PropTypes from 'prop-types'
import {AASConfig, Config} from '../config/configs.js'
import fetch from 'isomorphic-fetch'
import {TMTAuth} from './TMTAuth.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tmtAuth: null, authenticated: false}
  }

  static async resolveAAS() {
    const response = await fetch(`${Config['location-server-url']}/location/resolve/${Config['AAS-server-name']}?within=5seconds`)
    let url = Config['AAS-server-url']
    if (response.status === 200) {
      const a = await response.json()
      url = a.uri
    }
    return url
  }

  instantiateAAS = async (url) => {
    console.info('instantiating AAS')
    const keycloakConfig = {...AASConfig, ...this.props.config, ...url}
    const keycloak = KeyCloak(keycloakConfig)
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
    await authenticated.success(() => {
      const tmtAuth = TMTAuth.from(keycloak)
      this.setState({tmtAuth, authenticated: tmtAuth.authenticated})
      this.props.onAuthentication({tmtAuth: this.state.tmtAuth, authenticated: this.state.authenticated})
    }).error(() => {
      this.props.onAuthentication({tmtAuth: this.state.tmtAuth, authenticated: this.state.authenticated})
    })
  }

   componentWillMount = async () => {
     const url = await Login.resolveAAS()
     await this.instantiateAAS({url: url})
   }

   render() {
     return null
   }
}

Login.propTypes = {
  config: PropTypes.object,
  onAuthentication: PropTypes.func
}

export default Login
