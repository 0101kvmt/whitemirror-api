import axios from 'axios';

import { NEWUSER_FAILURE, NEWUSER_REQUEST, NEWUSER_SUCCESS, AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from './types';

const apiUrl = "http://localhost:3131/v1/" ;

export const newUser = (username, password) => {

  const newUserConfiguration = {
    url: apiUrl + "user",
    method: 'post',
    payload: {
      "username": username,
      "password": password
    }

  }

  return dispatch => {
    dispatch({ type: NEWUSER_REQUEST });
    return axios.post(newUserConfiguration.url, newUserConfiguration.payload)
      .then(res => {
        dispatch({ type: NEWUSER_SUCCESS, currentUser: res.data.data.user});
      })
      .catch(err => {
        if(err.response){
          dispatch({ type: NEWUSER_FAILURE, errorMessage: err.response});
        }
        else{
          dispatch({ type: NEWUSER_FAILURE, errorMessage: 'Cannot connect to server. Please try again.'});
        }
      })
  }
};

export const authenticate = (username, password) => {

  const authConfiguration = {
    url: apiUrl,
    method: 'post',
    auth: {
      "username": username,
      "password": password
    }

  }

  return dispatch => {
    dispatch({ type: AUTH_REQUEST });
    return axios.post(authConfiguration.url, authConfiguration.auth)
      .then(res => {
        dispatch({ type: AUTH_SUCCESS, currentUser: res.data.data.user});
      })
      .catch(err => {
        if(err.response){
          dispatch({ type: AUTH_FAILURE, errorMessage: 'Invalid Username/Password combination. Please try again.'});
        }
        else{
          dispatch({ type: AUTH_FAILURE, errorMessage: 'Cannot connect to server. Please try again.'});
        }
      })
  }
};
