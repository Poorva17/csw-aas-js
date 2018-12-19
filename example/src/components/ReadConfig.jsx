import React from 'react'
import aas from 'csw.auth'

class ReadConfig extends React.Component {
  static contextType = aas.AuthContext;
  render() {
    console.log(this.context)
    return <div>
      Open functionality - Reading Config
    </div>
  }
}

export default ReadConfig
