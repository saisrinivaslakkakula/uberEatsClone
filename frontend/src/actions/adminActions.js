import {ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGIN_FAIL, ADMIN_LOGOUT, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ADMIN_REGISTER_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS, ADMIN_DETAILS_FAIL, ADMIN_PROFILE_UPDATE_REQUEST, ADMIN_PROFILE_UPDATE_SUCCESS, ADMIN_PROFILE_UPDATE_FAIL, ADMIN_GET_ALL_ORDER_DETAILS_REQUEST, ADMIN_GET_ALL_ORDER_DETAILS_SUCCESS, ADMIN_CHANGE_ORDER_STATUS_REQUEST, ADMIN_CHANGE_ORDER_STATUS_SUCCESS, ADMIN_CHANGE_ORDER_STATUS_FAIL} from '../constants/adminConstants'
import axios from 'axios'

export const login = (email,password) => async(dispatch) =>{
    try {
        console.log(email)
        dispatch({
            type:ADMIN_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post('/api/admin/login',{email,password},config)
        console.log(data)
         dispatch({
            type : ADMIN_LOGIN_SUCCESS,
            payload:data,
        })
        localStorage.setItem('adminInfo',JSON.stringify(data)) 
        
    } catch (error) {
         dispatch({
            type:ADMIN_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const register = (firstName,lastName,email, password,phone,image) => async(dispatch) =>{
    try {
        dispatch({
            type:ADMIN_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post('/api/admin/register',{firstName,lastName,email, password,phone,image},config)
        //console.log(data)
         dispatch({
            type : ADMIN_REGISTER_SUCCESS,
            payload:data,
        })
        
        localStorage.setItem('adminInfo',JSON.stringify(data)) 
        
    } catch (error) {

         dispatch({
            type:ADMIN_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getAdminDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:ADMIN_DETAILS_REQUEST
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
            type : ADMIN_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:ADMIN_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getAdminOrderDetailsAction = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:ADMIN_GET_ALL_ORDER_DETAILS_REQUEST
        })
     
        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/order/getOrderByRestaurant/${id}`,config)
        console.log(data)
         dispatch({
            type : ADMIN_GET_ALL_ORDER_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:ADMIN_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}


export const adminEditOrderStatusAction = (id,rest_id,status) => async(dispatch,getState) =>{
    try {
        console.log(id+"|"+rest_id+"|"+status)
        dispatch({
            type:ADMIN_CHANGE_ORDER_STATUS_REQUEST
        })
        
        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/order/changeOrderStatus/${id}/${status}`,config)
        console.log(data)
         dispatch({
            type : ADMIN_CHANGE_ORDER_STATUS_SUCCESS,
            payload:data,
        })
        const {data2} = await axios.get(`/api/order/getOrderByRestaurant/${rest_id}`,config)
         dispatch({
            type : ADMIN_GET_ALL_ORDER_DETAILS_SUCCESS,
            payload:data2,
        })
       
        
    } catch (error) {

         dispatch({
            type:ADMIN_CHANGE_ORDER_STATUS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const updateUserProfile = (user) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:ADMIN_PROFILE_UPDATE_REQUEST
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
            type : ADMIN_PROFILE_UPDATE_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:ADMIN_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}


export const logout = () =>(dispatch)=>{
    localStorage.clear();
    dispatch({
        type:ADMIN_LOGOUT
    })
}