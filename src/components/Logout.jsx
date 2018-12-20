import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

class Logout extends React.Component {
  render() {
    return <button onClick={() => this.logout()} >Logout</button>
  }

  logout = () => {
    this.props.history.push('/')
    this.props.tmtAuth.logout()
  }
}

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired
  }).isRequired,
  tmtAuth: PropTypes.object
}

export default withRouter(Logout)
