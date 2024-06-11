import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  realm: 'laravel',
  url: 'http://keycloak.localhost',
  clientId: 'laravel',
})

try {
  const authenticated = await keycloak.init({
    onLoad: 'login-required',
  })

  console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`)

  const userInfo = await keycloak.loadUserInfo()

  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}
catch (error) {
  console.error('Failed to initialize adapter:', error)
}
