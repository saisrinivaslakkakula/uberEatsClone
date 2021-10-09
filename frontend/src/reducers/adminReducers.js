import { ADMIN_CHANGE_ORDER_STATUS_FAIL, ADMIN_CHANGE_ORDER_STATUS_REQUEST, ADMIN_CHANGE_ORDER_STATUS_SUCCESS, ADMIN_DETAILS_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_SUCCESS, ADMIN_GET_ALL_ORDER_DETAILS_FAIL, ADMIN_GET_ALL_ORDER_DETAILS_REQUEST, ADMIN_GET_ALL_ORDER_DETAILS_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_PROFILE_UPDATE_FAIL, ADMIN_PROFILE_UPDATE_REQUEST, ADMIN_PROFILE_UPDATE_SUCCESS, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS } from '../constants/adminConstants'
const adminLoginReducer = (state = {},action) =>{

    switch(action.type){
        case ADMIN_LOGIN_REQUEST:
            return({loading:true})
        case ADMIN_LOGIN_SUCCESS:
            return({loading:false,adminInfo:action.payload})
        case ADMIN_LOGIN_FAIL:
            return({loading:false, error:action.payload})
        case ADMIN_LOGOUT:
            return({})
            default:
                return state

    }

}

const adminRegisterReducer = (state = {},action) =>{

    switch(action.type){
        case ADMIN_REGISTER_REQUEST:
            return({loading:true})
        case ADMIN_REGISTER_SUCCESS:
            return({loading:false,adminInfo:action.payload})
        case ADMIN_REGISTER_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const adminDetailsReducer = (state = {user:{}},action) =>{

    switch(action.type){
        case ADMIN_DETAILS_REQUEST:
            return({...state,loading:true})
        case ADMIN_DETAILS_SUCCESS:
            return({loading:false,admin:action.payload})
        case ADMIN_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const adminUpdateProfileReducer = (state = {},action) =>{

    switch(action.type){
        case ADMIN_PROFILE_UPDATE_REQUEST:
            return({...state,loading:true})
        case ADMIN_PROFILE_UPDATE_SUCCESS:
            return({loading:false,success:true,admin:action.payload})
        case ADMIN_PROFILE_UPDATE_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const adminAllOrderDetailsReducer = (state={},action) =>{
    switch(action.type){
        case ADMIN_GET_ALL_ORDER_DETAILS_REQUEST:
            return({...state,loading:true})
        case ADMIN_GET_ALL_ORDER_DETAILS_SUCCESS:
            return({loading:false,success:true,adminOrders:action.payload})
        case ADMIN_GET_ALL_ORDER_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }
}

const adminChangeStatusReducer = (state={},action) =>{
    switch(action.type){
        case ADMIN_CHANGE_ORDER_STATUS_REQUEST:
            return({...state,loading:true})
        case ADMIN_CHANGE_ORDER_STATUS_SUCCESS:
            return({loading:false,success:true})
        case ADMIN_CHANGE_ORDER_STATUS_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }
}

export {adminLoginReducer,adminRegisterReducer,adminDetailsReducer,
    adminUpdateProfileReducer,adminAllOrderDetailsReducer,
    adminChangeStatusReducer
}