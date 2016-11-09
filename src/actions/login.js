import { LOGGED_IN, LOGGED_OUT, AUTHENTICATED, AUTH_FAILED, STORE_TOKEN } from '../constants/ActionTypes'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk'
import { AUTHENTICATE } from '../constants/API'

export function login(info) {
  return dispatch => {
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_friends', 'email']).then(result => {
        if (result.isCancelled) {
          console.log("cancelled")
        }
        else {
          dispatch(loggedIn())
        }
      }, (error) => {
        console.log(error)
      }
    )
  }
}

export function logout() {
  return dispatch => {
    LoginManager.logOut()
    dispatch(loggedOut())
  }
}

function loggedIn() {
  return {
    type: LOGGED_IN,
  }
}

function loggedOut() {
  return {
    type: LOGGED_OUT,
  }
}

function authenticated(info) {
  return {
    type: AUTHENTICATED,
    info,
  }
}

function authFailed() {
  return {
    type: AUTH_FAILED
  }
}

export function authenticate() {
  return dispatch => {
    AccessToken.getCurrentAccessToken().then(token => {
      if (token && token.accessToken) {
        const infoRequest = new GraphRequest('/me?fields=id,name,email', null,
          (error, result) => {
            console.log(result);
            if (result.email) {
              fetch(AUTHENTICATE, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json', 'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  fb_id: result.id, name: result.name, email: result.email, access_token: token.accessToken
                })
              })
              .then(res => res.json())
              .then((res) => {
                if (!res.error) {
                  dispatch(authenticated({
                    id: res.id,
                    fb_id: res.fb_id,
                    name: res.name,
                    token: res.token
                  }));
                } else {
                  dispatch(authFailed())
                }
              })
              .catch(console.log);
            } else {
              console.log("No email permission");
              dispatch(authFailed())
            }
          }
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }else {
        console.log("not logged in");
        dispatch(authFailed())
      }
    })
  }
}
