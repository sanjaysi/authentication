import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({email, password}) {
  // helps to get direct access to the Dispatch method
  // it is provided by redux thunk; return function instead of object
  return function(dispatch) {
    // submit email, password to server
    axios.post(`${ROOT_URL}/signin`, {email, password});

    // if request is good, update state to indicate success authenticated
    //  save the jwt token
    //  and redirect to '/features'

    // if request is bad, show error to user
  }
}
