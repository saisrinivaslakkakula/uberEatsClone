import { MENU_ADD_FAIL, MENU_ADD_REQUEST, MENU_ADD_SUCCESS, MENU_DETAILS_FAIL, MENU_DETAILS_REQUEST, MENU_DETAILS_SUCCESS } from "../constants/menuConstants"


const getItemsReducer = (state = {menu:{}},action) =>{

    switch(action.type){
        case MENU_DETAILS_REQUEST:
            return({loading:true})
        case MENU_DETAILS_SUCCESS:
            return({loading:false,menuInfo:action.payload})
        case MENU_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const menuAddItemsReducer = (state = {},action) =>{

    switch(action.type){
        case MENU_ADD_REQUEST:
            return({loading:true})
        case MENU_ADD_SUCCESS:
            return({loading:false,menuInfo:action.payload})
        case MENU_ADD_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

export {getItemsReducer,menuAddItemsReducer}