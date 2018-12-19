import React from 'react'
import PropTypes from 'prop-types'

class CheckSSO extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <div className='card-content white-text'>
        {this.props.children}
      </div>
    } else {
      return <div>
        <h3>Please login to view!!!</h3>
      </div>
    }
  }
}

CheckSSO.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node
}

export default CheckSSO
