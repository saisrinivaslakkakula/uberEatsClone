import { REST_LOGOUT, REST_REGISTER_REQUEST, REST_REGISTER_SUCCESS, REST_REGISTER_FAIL, REST_DETAILS_REQUEST, REST_DETAILS_SUCCESS, REST_DETAILS_FAIL, REST_PROFILE_UPDATE_REQUEST, REST_PROFILE_UPDATE_SUCCESS, REST_PROFILE_UPDATE_FAIL, REST_ALL_DETAILS_REQUEST, REST_ALL_DETAILS_SUCCESS, REST_ALL_DETAILS_FAIL, REST_SEARCH_REQUEST, REST_FILTER_BY_TYPE, REST_FILTER_BY_MODE} from '../constants//restaurantConstants'
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
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)
        //console.log(data)
        console.log("Dispatchin in getRestaurantDetails")
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

export const filterRestaurantResultsByDeliveryType = (deliverymode) => async(dispatch,getState) =>{

    const {data} = await axios.get(`/api/restaurant/`)
    
    dispatch({
        type : REST_ALL_DETAILS_SUCCESS,
        payload:data,
    })
    const {allRestaurants} = getState()
    //console.log(deliverymode)
    const {allRestaurants:allRestaurantsObj} = allRestaurants
    //console.log(allRestaurantsObj)
    let result = allRestaurantsObj.result.filter(
        (x)=>x.rest_type.toLowerCase().indexOf(deliverymode.toLowerCase()) !== -1
        
    )
    let results = {
        result
    }
  
        //results.push(result)
        dispatch({
            type:REST_FILTER_BY_MODE,
            payload:results
        })
        
}

export const filterRestaurantResultsByDeiteryType = (dieteryType) => async(dispatch,getState) =>{
    const {data} = await axios.get(`/api/restaurant/`)
    //const {allRestaurants} = getState()
    //const {allRestaurants:data} = allRestaurants
    dispatch({
        type : REST_ALL_DETAILS_SUCCESS,
        payload:data,
    })
    if((Object.values(dieteryType).every(item=>item === true)) || (Object.values(dieteryType).every(item=>item === false))){
        const {allRestaurants} = getState()
        const {allRestaurants:allRestaurantsObj} = allRestaurants
        //console.log(allRestaurantsObj)
        /*dispatch({
            type : REST_ALL_DETAILS_SUCCESS,
            payload:allRestaurantsObj,
        })*/
    }
    else{
        const {allRestaurants} = getState()
        const {allRestaurants:allRestaurantsObj} = allRestaurants
        let result = []
        if(dieteryType.Veg){
              const res1 =  allRestaurantsObj.result.filter((x)=>x.rest_category.trim() === 'Veg')
              result = result.concat(res1)
        }
        if (dieteryType.Vegan){
            const res2 =  allRestaurantsObj.result.filter((x)=>x.rest_category.trim() === 'Vegan')
            result = result.concat(res2)
        }
        if (dieteryType.nonVeg){
            const res3 =  allRestaurantsObj.result.filter((x)=>x.rest_category.trim() === 'nonVeg')
            result = result.concat(res3)
        }
        let results = {
            result
        }
        
        //console.log(result)
            //results.push(result)
            dispatch({
                type:REST_FILTER_BY_TYPE,
                payload:results
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