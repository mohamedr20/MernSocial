import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser =  (userData,history)=>(dispatch)=>{
    axios.post('/api/user/register',userData)
        .then(res=>history.push('/login'))
        .catch(err=>
            dispatch({
            type:GET_ERRORS,
            payload:err.response.data
            })
        )
}

export const loginUser = (userData) =>(dispatch)=>{
    axios.post('/api/user/login',userData)
    .then(res=>{
        //Save to localStorage
        const {token} = res.data;
        localStorage.setItem('jwtToken',token);
        //Set token to auth Header
        setAuthToken(token)
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}

//Set Current User
export const setCurrentUser = (decoded_token)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded_token
    }
}

export const logoutUser = ()=>(dispatch)=>{
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
    dispatch(setCurrentUser({}));
}