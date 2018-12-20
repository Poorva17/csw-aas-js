import React from 'react'
import aas from 'csw.auth'

class WriteConfig extends React.Component {
  static contextType = aas.TMTAuthContext;
  constructor(props) {
    super(props)
    this.state = {user: null}
  }

  componentWillMount = async () => {
    let loadUserInfo = await this.context.tmtAuth.loadUserInfo()
    loadUserInfo.success((user) => {
      this.setState({user})
    })
  }

  render() {
    return <div>
      {this.state.user && `Hello ${this.state.user.preferred_username}`}
      <br />
      Secured functionality - Writing Config
    </div>
  }
}

export default WriteConfig
