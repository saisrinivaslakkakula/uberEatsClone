import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer,userRegisterReducer,userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducers'
import {adminDetailsReducer,adminRegisterReducer,adminLoginReducer,adminUpdateProfileReducer} from './reducers/adminReducers'
import {restaurantDetailsReducer,restaurantLoginReducer,restaurantRegisterReducer} from './reducers/restaurantReducers'
import{menuAddItemsReducer,getMenuByRestaurant,deleteMenuItemByIDReducer} from './reducers/menuReducers'
const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const adminInfoFromStorage = localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo')?JSON.parse(localStorage.getItem('restaurantInfo')):null
const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    adminRegister : adminRegisterReducer,
    adminDetails:adminDetailsReducer,
    adminLogin : adminLoginReducer,
    restaurantRegister : restaurantRegisterReducer,
    restaurantDetails:restaurantDetailsReducer,
    restaurantLogin : restaurantLoginReducer,
    restaurantMenuAdd : menuAddItemsReducer,
    restaurantMenu:getMenuByRestaurant,
    restaurantMenuDeleteItem: deleteMenuItemByIDReducer,

})

const initialState = {
    userLogin: {
        userInfo:userInfoFromStorage,
    } ,
    adminLogin: {
        adminInfo:adminInfoFromStorage,
        restaurantInfo:restaurantInfoFromStorage
    }
}

const middleWare = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))

)

export default store