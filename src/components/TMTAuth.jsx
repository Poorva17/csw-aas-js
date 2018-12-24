class TMTAuthStore {
  constructor() {
    this.token = null
    this.tokenParsed = null
    this.realmAccess = null
    this.resourceAccess = null
    this.authenticated = false
  }

  from = (keycloak) => {
    this.logout = keycloak.logout
    this.token = keycloak.token
    this.tokenParsed = keycloak.tokenParsed
    this.realmAccess = keycloak.realmAccess
    this.resourceAccess = keycloak.resourceAccess
    this.loadUserInfo = keycloak.loadUserInfo
    this.authenticated = keycloak.authenticated
    return this
  }
}

export const TMTAuth = new TMTAuthStore()
