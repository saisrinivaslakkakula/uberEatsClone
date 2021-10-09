import { REST_LOGOUT, REST_REGISTER_REQUEST, REST_REGISTER_SUCCESS, REST_REGISTER_FAIL, REST_DETAILS_REQUEST, REST_DETAILS_SUCCESS, REST_DETAILS_FAIL, REST_PROFILE_UPDATE_REQUEST, REST_PROFILE_UPDATE_SUCCESS, REST_PROFILE_UPDATE_FAIL, REST_ALL_DETAILS_REQUEST, REST_ALL_DETAILS_SUCCESS, REST_ALL_DETAILS_FAIL, REST_SEARCH_REQUEST, REST_FILTER_BY_TYPE, REST_FILTER_BY_MODE, REST_FILTER_REQUEST, REST_SEARCH_BY_LOC_REQUEST} from '../constants//restaurantConstants'
import axios from 'axios'


export const register = (rest_name, rest_type, rest_category, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,rest_main_photo,checked) => async(dispatch,getState) =>{
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
        //console.log(rest_main_photo)
        const {data} = await axios.post('/api/restaurant/add',{rest_name, rest_type, rest_category, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,rest_main_photo,checked},config)
        
        
         dispatch({
            type : REST_REGISTER_SUCCESS,
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


export const updateRestaurantProfile = (rest_id, rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,checked) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_PROFILE_UPDATE_REQUEST
        })
        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`,
            }
        }
        const {data} = await axios.put('/api/restaurant/update',{rest_id,rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,checked},config)
        //console.log(data)
        
         dispatch({
            type : REST_PROFILE_UPDATE_SUCCESS,
            payload:data,
        })
        dispatch({
            type : REST_DETAILS_SUCCESS,
            payload:data,
        })
        
    } catch (error) {

         dispatch({
            type:REST_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getRestaurantDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_DETAILS_REQUEST
        })
     
    
        const {data} = await axios.get(`/api/restaurant/profile/${id}`)
        const menuData = await axios.get(`/api/restaurant/menu/${data.rest_id}`)
        //console.log(menuData.data)
        const payloadObject = {
            ...data,
            menu:menuData.data
        }
        //console.log(data)
         dispatch({
            type : REST_DETAILS_SUCCESS,
            payload:payloadObject,
        })
       
        
    } catch (error) {

         dispatch({
            type:REST_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}


export const getAllRestaurants = () => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_ALL_DETAILS_REQUEST
        })
     
        const {data} = await axios.get(`/api/restaurant/`)
        //console.log(data)
         dispatch({
            type : REST_ALL_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:REST_ALL_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getRestaurantsByLocation = (location) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:REST_ALL_DETAILS_REQUEST
        })
     
        const {data} = await axios.get(`/api/restaurant/${location}`)
        //console.log(data)
         dispatch({
            type : REST_SEARCH_BY_LOC_REQUEST,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:REST_ALL_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getsearchRestaurantResults = (keyWord) => async(dispatch,getState) =>{

    const {allRestaurants} = getState()
    //console.log(keyWord)
    const {allRestaurants:allRestaurantsObj} = allRestaurants
    let result = allRestaurantsObj.result.filter(
        (x)=>x.rest_name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
        
    )
    let results = {
        result
    }
    if(result.length >0 ){
        //results.push(result)
        dispatch({
            type:REST_SEARCH_REQUEST,
            payload:results
        })
    }      
}

export const filterData = (filters) => async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/restaurant/`)
        
         dispatch({
            type : REST_ALL_DETAILS_SUCCESS,
            payload:data,
        })
        const {allRestaurants} = getState()
        const {allRestaurants:allRestaurantsObject} = allRestaurants
    if(allRestaurantsObject){
        const {result} = allRestaurantsObject
        let resultOutStage1 = []
        //console.log(filters)
        if(filters.pickup){
        const {data} = await axios.get(`/api/restaurant/`)
        const res = data.result.filter(x =>(x.rest_type === 'pick-up' ))
        resultOutStage1 = resultOutStage1.concat(res)
    }
    else if (filters.delivery){
        const {data} = await axios.get(`/api/restaurant/`)
        const res = data.result.filter(x =>(x.rest_type === 'delivery'))
        resultOutStage1 = resultOutStage1.concat(res)
    }
    else{
        const {data} = await axios.get(`/api/restaurant/`)
        //const res = data.result.filter(x =>(x.rest_type === 'delivery'))
        resultOutStage1 = resultOutStage1.concat(data.result)

    }

    let resultOutStage2 = []
    if(filters.Veg){
        const res = resultOutStage1.filter(x =>(x.rest_category === 'Veg'))
        resultOutStage2 = resultOutStage2.concat(res)
        
    }
    if(filters.Vegan){
        const res = resultOutStage1.filter(x =>(x.rest_category === 'Vegan'))
        resultOutStage2 = resultOutStage2.concat(res)
        
    }
    if(filters.nonVeg){
        const res = resultOutStage1.filter(x =>(x.rest_category === 'nonVeg'))
        resultOutStage2 = resultOutStage2.concat(res)
        
    }
    if(resultOutStage2.length >0){
        var resultsOutFinal = {
            result:resultOutStage2
        }
    }
    else{
        var resultsOutFinal = {
            result:resultOutStage1
        }

    }

    dispatch({
        type:REST_FILTER_REQUEST,
        payload:resultsOutFinal
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
        //console.log("ADMIN:"+admin_id)
        const {data} = await axios.post(`/api/restaurant/profileadm`,{admin_id},config)
         dispatch({
            type : REST_DETAILS_SUCCESS,
            payload:data,
        })

        localStorage.setItem('restaurantInfo',JSON.stringify(data))
       
        
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