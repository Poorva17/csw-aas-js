import React from 'react'
import { Logout } from '../../components/Logout'
import {shallow} from 'enzyme'

describe('<Logout />', () => {
  it('should call logout', () => {
    const props = {
      tmtAuth: {
        logout: jest.fn()
      },
      onLogout: jest.fn(),
      history: {
        push: jest.fn()
      }
    }
    shallow(<Logout {...props} />)

    expect(props.history.push).toHaveBeenCalledWith('/')
    expect(props.tmtAuth.logout).toHaveBeenCalled()
    expect(props.onLogout).toHaveBeenCalled()
  })
})
