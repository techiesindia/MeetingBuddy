import { TRY_AUTH } from "./actionTypes";

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignUp(authData));
  };
};

export const authSignUp = (authData) => {
  return dispatch => {
    fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBHf58_RIte-M-S41l0JNXY6pBBW4lWR2I",{
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert("Authentication failed, try again!!");
    })
    .then(res => res.json)
    .then(parsedRes => {
      console.log(parsedRes);
    })
  };
};
