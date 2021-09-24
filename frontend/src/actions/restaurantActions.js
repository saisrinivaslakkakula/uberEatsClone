import { REST_LOGOUT, REST_REGISTER_REQUEST, REST_REGISTER_SUCCESS, REST_REGISTER_FAIL, REST_DETAILS_REQUEST, REST_DETAILS_SUCCESS, REST_DETAILS_FAIL, REST_PROFILE_UPDATE_REQUEST, REST_PROFILE_UPDATE_SUCCESS, REST_PROFILE_UPDATE_FAIL} from '../constants//restaurantConstants'
import axios from 'axios'


export const register = (rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,rest_main_photo) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_REGISTER_REQUEST
        })
        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`,
            }
        }
        const {data} = await axios.post('/api/restaurant/add',{rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,rest_main_photo},config)
        console.log(data)
        
         dispatch({
            type : REST_REGISTER_SUCCESS,
            payload:data,
        })
        dispatch({
            type : REST_DETAILS_SUCCESS,
            payload:data,
        })
        localStorage.setItem('restaurantInfo',JSON.stringify(data)) 
        
    } catch (error) {

         dispatch({
            type:REST_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getRestaurantDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_DETAILS_REQUEST
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
            type : REST_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:REST_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getRestaurantDetailsforAdmin = (admin_id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_DETAILS_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json',
            }
        }
        const {data} = await axios.post(`/api/restaurant/profileadm`,{admin_id},config)
         dispatch({
            type : REST_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:REST_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const updateUserProfile = (user) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_PROFILE_UPDATE_REQUEST
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
            type : REST_PROFILE_UPDATE_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:REST_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}


export const logout = () =>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type:REST_LOGOUT
    })
}