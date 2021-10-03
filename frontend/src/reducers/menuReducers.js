import { MENU_ADD_CLEAR, MENU_ADD_FAIL, MENU_ADD_REQUEST, MENU_ADD_SUCCESS, MENU_DELETE_FAIL, MENU_DELETE_REQUEST, MENU_DELETE_SUCCESS, MENU_DETAILS_FAIL, MENU_DETAILS_REQUEST, MENU_DETAILS_SUCCESS, MENU_GET_BY_ID_FAIL, MENU_GET_BY_ID_REQUEST, MENU_GET_BY_ID_SUCCESS, MENU_UPDATE_FAIL, MENU_UPDATE_REQUEST, MENU_UPDATE_SUCCESS } from "../constants/menuConstants"


const getItemsReducer = (state = {menu:{}},action) =>{

    switch(action.type){
        case MENU_DETAILS_REQUEST:
            return({loading:true})
        case MENU_DETAILS_SUCCESS:
            return({loading:false,menuInfo:action.payload})
        case MENU_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        case MENU_ADD_CLEAR:
            return({})
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

const getMenuByRestaurant = (state = {},action) =>{

    switch(action.type){
        case MENU_GET_BY_ID_REQUEST:
            return({loading:true})
        case MENU_GET_BY_ID_SUCCESS:
            return({loading:false,menu:action.payload})
        case MENU_GET_BY_ID_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const deleteMenuItemByIDReducer = (state = {},action) =>{

    switch(action.type){
        case MENU_DELETE_REQUEST:
            return({loading:true})
        case MENU_DELETE_SUCCESS:
            return({loading:false,success:true})
        case MENU_DELETE_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const updateMenuItemByIDReducer = (state = {},action) =>{

    switch(action.type){
        case MENU_UPDATE_REQUEST:
            return({loading:true})
        case MENU_UPDATE_SUCCESS:
            return({loading:false,success:true})
        case MENU_UPDATE_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const getMenuItemByItemId = (state={},action)=>{
    switch(action.type){
        case MENU_GET_BY_ID_REQUEST:
            return({loading:true})
        case MENU_GET_BY_ID_SUCCESS:
            return({loading:false,menuItemDetails:action.payload})
        case MENU_GET_BY_ID_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }
}

export {getItemsReducer,menuAddItemsReducer,updateMenuItemByIDReducer,getMenuByRestaurant,deleteMenuItemByIDReducer,getMenuItemByItemId}