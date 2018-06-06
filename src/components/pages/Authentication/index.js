import Axios from 'axios'
import router from '@/router'

// holds path to API
const WorkoutAPI = `http://${window.location.hostname}:3000`

export default {
  user: { authenticated: false },

  // method performs POST request on API passing the credentials argument, destructures data response
  // stores token value as a cookie which expires in one day
  authenticate (context, credentials, redirect) {
    Axios.post(`${WorkoutAPI}/api/v1/auth`, credentials)
      .then(({data: {token}}) => {
        context.$cookie.set('token', token, '1D')
        context.validLogin = true
        this.user.authenticated = true

        if (redirect) router.push(redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  // method similar to first except the endpoint accessed is different
  signup (context, credentials, redirect) {
    Axios.post(`${WorkoutAPI}/api/v1/signup`, credentials)
      .then(({data: {token}}) => {
        context.$cookie.set('token', token, '1D')
        context.validSignUp = true
        this.user.authenticated = true

        if (redirect) router.push(redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  // method to check if the user is authenticated or not
  checkAuthentication () {
    const token = document.cookie

    if (token) this.user.authenticated = true
    else this.user.authenticated = false
  },

  // returns Authorization header
  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
