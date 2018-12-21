import React from 'react'
import {TMTAuthContext} from 'csw.auth'

class WriteConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: null}
  }

  componentWillMount = async () => {
    if (this.context.tmtAuth) {
      let loadUserInfo = await this.context.tmtAuth.loadUserInfo()
      loadUserInfo.success((user) => {
        this.setState({user})
      })
    }
  }

  render() {
    return <div>
      {this.state.user && `Hello ${this.state.user.preferred_username}`}
      <br />
      Secured functionality - Writing Config
    </div>
  }
}

WriteConfig.contextType = TMTAuthContext

export default WriteConfig
