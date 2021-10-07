import { REST_ALL_DETAILS_FAIL, REST_ALL_DETAILS_REQUEST, REST_ALL_DETAILS_SUCCESS, REST_DETAILS_FAIL, REST_DETAILS_REQUEST, REST_DETAILS_SUCCESS, REST_FILTER_BY_MODE, REST_FILTER_BY_TYPE, REST_FILTER_REQUEST, REST_LOGIN_FAIL, REST_LOGIN_REQUEST, REST_LOGIN_SUCCESS, REST_LOGOUT, REST_PROFILE_UPDATE_FAIL, REST_PROFILE_UPDATE_REQUEST, REST_PROFILE_UPDATE_SUCCESS, REST_REGISTER_FAIL, REST_REGISTER_REQUEST, REST_REGISTER_SUCCESS, REST_SEARCH_REQUEST } from "../constants/restaurantConstants"


const restaurantLoginReducer = (state = {},action) =>{

    switch(action.type){
        case REST_LOGIN_REQUEST:
            return({loading:true})
        case REST_LOGIN_SUCCESS:
            return({loading:false,restaurantInfo:action.payload})
        case REST_LOGIN_FAIL:
            return({loading:false, error:action.payload})
        case REST_LOGOUT:
            return({})
            default:
                return state

    }

}

const restaurantRegisterReducer = (state = {},action) =>{

    switch(action.type){
        case REST_REGISTER_REQUEST:
            return({loading:true})
        case REST_REGISTER_SUCCESS:
            return({loading:false,restaurantInfo:action.payload})
        case REST_REGISTER_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const restaurantUpdateReducer = (state = {},action) =>{

    switch(action.type){
        case REST_PROFILE_UPDATE_REQUEST:
            return({loading:true})
        case REST_PROFILE_UPDATE_SUCCESS:
            return({loading:false,success:true})
        case REST_PROFILE_UPDATE_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const restaurantDetailsReducer = (state = {menu:[]},action) =>{

    switch(action.type){
        case REST_DETAILS_REQUEST:
            return({...state,loading:true})
        case REST_DETAILS_SUCCESS:
            return({loading:false,restaurantDetails:action.payload})
        case REST_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const restaurantUpdateProfileReducer = (state = {},action) =>{

    switch(action.type){
        case REST_PROFILE_UPDATE_REQUEST:
            return({...state,loading:true})
        case REST_PROFILE_UPDATE_SUCCESS:
            return({loading:false,success:true,restaurant:action.payload})
        case REST_PROFILE_UPDATE_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const getAllRestaurants = (state = {},action) =>{
    //console.log(action.payload)
    switch(action.type){
        case REST_ALL_DETAILS_REQUEST:
            return({...state,loading:true})
        case REST_ALL_DETAILS_SUCCESS:
            return({loading:false,allRestaurants:action.payload})
        case REST_ALL_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        case REST_SEARCH_REQUEST:
            return({loading:false,allRestaurants:action.payload})
        case REST_FILTER_REQUEST:
            return({loading:false,allRestaurants:action.payload})
        default:
                return state

    }

}

export {restaurantLoginReducer,restaurantRegisterReducer,
    restaurantUpdateReducer,restaurantDetailsReducer,
    restaurantUpdateProfileReducer, getAllRestaurants}