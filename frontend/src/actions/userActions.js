import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL, USER_ADD_FAV_REQUEST, USER_EDIT_FAV_SUCCESS, USER_EDIT_FAV_FAIL, USER_GET_FAV_REQUEST, USER_GET_FAV_SUCCESS, USER_GET_FAV_FAIL, USER_REMOVE_FAV_REQUEST} from '../constants/userConstants'
import axios from 'axios'

export const login = (email,password) => async(dispatch) =>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login',{email,password},config)
         dispatch({
            type : USER_LOGIN_SUCCESS,
            payload:data,
        })
        localStorage.setItem('userInfo',JSON.stringify(data)) 
        
    } catch (error) {

         dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const register = (firstName,lastName,email, password,phone,Street,City,State,Country,ZipCode,image) => async(dispatch) =>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        //console.log(image)
        const {data} = await axios.post('/api/users/adduser',{firstName,lastName,email, password,phone,Street,City,State,Country,ZipCode,image},config)
        //console.log(data)
         dispatch({
            type : USER_REGISTER_SUCCESS,
            payload:data,
        })
        
        localStorage.setItem('userInfo',JSON.stringify(data)) 
        
    } catch (error) {

         dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getUserDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)
        console.log(data)
         dispatch({
            type : USER_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const updateUserProfile = (user) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:USER_PROFILE_UPDATE_REQUEST
        })
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/users/profile`,user,config)
         dispatch({
            type : USER_PROFILE_UPDATE_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:USER_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}



export const addFavourites = (rest_id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:USER_ADD_FAV_REQUEST
        })
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const uri = `/api/users/addfavourite/${userInfo._id}/${rest_id}`
        const {data} = await axios.get(uri,config)
         dispatch({
            type : USER_EDIT_FAV_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:USER_EDIT_FAV_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const removeFavourites = (rest_id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:USER_REMOVE_FAV_REQUEST
        })
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const uri = `/api/users/removeFavourites/${userInfo._id}`
        const {data} = await axios.delete(uri,config)
         dispatch({
            type : USER_EDIT_FAV_SUCCESS,
            payload:data,
        })

        const {data:newData} = await axios.get(`/api/users/getFauvourites/${userInfo._id}`,config)
         dispatch({
            type : USER_GET_FAV_SUCCESS,
            payload:newData,
        })
       
        
    } catch (error) {

         dispatch({
            type:USER_EDIT_FAV_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getFavourites = () => async(dispatch,getState) =>{
    try {
        dispatch({
            type:USER_GET_FAV_REQUEST
        })
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const userID = encodeURI(userInfo._id)
        const {data} = await axios.get(`/api/users/getFauvourites/${userID}`,config)
         dispatch({
            type : USER_GET_FAV_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:USER_GET_FAV_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const logout = () =>(dispatch)=>{
    localStorage.clear();
    dispatch({
        type:USER_LOGOUT
    })
}