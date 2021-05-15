import {LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE} from './authTypes'
import axios from 'axios'

export const authenticateUser = (userName, password) =>{
    const credentials = {
        userName : userName,
        pass : password
    }
    return dispatch =>{
        dispatch(loginRequest());       
        axios.post("http://localhost:8080/home/login", credentials)
            .then(response =>{
                let token = response.data.token;
                let role = response.data.authorities;
                let email = response.data.name;
                let uName = credentials.userName;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userName', uName);
                localStorage.setItem('role', role);
                localStorage.setItem('email1', email);
                dispatch(success(true))
            })
            .catch(error =>{
                dispatch(failure())
            })
    }
}

export const logoutUser = () =>{
    return dispatch =>{
        dispatch(logoutRequest());
        dispatch(success(false));
        localStorage.clear();
    }
}

const loginRequest = () =>{
    return {
        type: LOGIN_REQUEST
    }
}

const logoutRequest = () =>{
    return {
        type: LOGOUT_REQUEST
    }
}

const success = isLoggedIn =>{
    return{
        type: SUCCESS,
        payload: isLoggedIn
    }
}

const failure = () =>{
    return{
        type: FAILURE,
        payload: false
    }
}
