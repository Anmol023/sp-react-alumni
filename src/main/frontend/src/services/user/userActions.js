import {FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS} from './userTypes'
import axios from 'axios';

export const fetchUsers = () =>{
    return dispatch =>{
        dispatch(fetchUserRequest());
        let jwtToken = localStorage.getItem("jwtToken");
        console.log(jwtToken)
        axios.get("http://localhost:8080/admin/all_alumni", {headers:{"Authorization": jwtToken}})
            .then(response =>{
                dispatch(fetchUserSuccess(response.data))
            })
            .catch(error =>{
                dispatch(fetchUserFailure(error.message))
            })
    }
}



const fetchUserRequest = () =>{
    return {
        type : FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = users =>{
    return {
        type : FETCH_USER_SUCCESS,
        payload : users
    }
}

const fetchUserFailure = error =>{
    return {
        type : FETCH_USER_FAILURE,
        payload : error
    }
}

