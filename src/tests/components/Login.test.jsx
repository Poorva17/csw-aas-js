import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Login from '../../components/Login'
import {Config} from '../../config/configs'
import fetchMock from 'fetch-mock'

describe('<Login />', () => {
  Enzyme.configure({ adapter: new Adapter() })

  it('should login', () => {
    const mockSuccessResponse = {
      'connection': {
        'componentId': {
          'name': 'AAS',
          'componentType': 'service'
        }
      },
      'type': 'HttpLocation',
      'uri': 'http://192.168.43.200:8081/auth'
    }
    //
    // const mockJsonPromise = Promise.resolve(mockSuccessResponse)
    // const mockFetchPromise = Promise.resolve({
    //   json: () => mockJsonPromise
    // })

    const AASLocationUrl = `${Config['location-server-url']}/location/resolve/${Config['AAS-server-name']}?within=5seconds`
    fetchMock.getOnce(AASLocationUrl, mockSuccessResponse)

    const props = {
      config: {
        'realm': 'test-realm',
        'clientId': 'test-app'
      },
      onAuthentication: jest.fn()
    }

    const mockKeycloak = {
      logout: jest.fn(),
      token: 'token string',
      tokenParsed: {name: 'test'},
      realmAccess: { roles: ['test-realm-roles'] },
      resourceAccess: ['test-resource-roles'],
      loadUserInfo: jest.fn(),
      authenticated: false
    }

    const mockAuthenticatedPromise = Promise.resolve(() => true)

    const mockAuthenticate = jest.fn().mockImplementation(() => {
      return {mockKeycloak, mockAuthenticatedPromise}
    })

    const mockTMTAuth = {
      logout: jest.fn(),
      token: 'token string',
      tokenParsed: {name: 'test'},
      realmAccess: { roles: ['test-realm-roles'] },
      resourceAccess: ['test-resource-roles'],
      loadUserInfo: jest.fn(),
      isAuthenticated: false
    }

    const mockfrom = jest.fn().mockImplementation(() => {
      return {mockTMTAuth}
    })

    jest.mock('../../components/TMTAuth', () => {
      return jest.fn().mockImplementation(() => {
        return {
          authenticate: mockAuthenticate,
          from: mockfrom
        }
      })
    })

    shallow(<Login {...props} />)

    expect(props.onAuthentication).toHaveBeenCalledWith({tmtAuth: mockTMTAuth, isAuthenticated: mockTMTAuth.isAuthenticated})
  })
})
