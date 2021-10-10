import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer,userRegisterReducer,userDetailsReducer, userGetFavouritesReducer,userUpdateProfileReducer,userFavouritesReducer} from './reducers/userReducers'
import {adminDetailsReducer,adminRegisterReducer,adminLoginReducer,adminUpdateProfileReducer, adminAllOrderDetailsReducer, adminChangeStatusReducer} from './reducers/adminReducers'
import {restaurantDetailsReducer,restaurantLoginReducer,restaurantRegisterReducer,restaurantUpdateProfileReducer,getAllRestaurants} from './reducers/restaurantReducers'
import{menuAddItemsReducer,getMenuByRestaurant,deleteMenuItemByIDReducer,getMenuItemByItemId,updateMenuItemByIDReducer} from './reducers/menuReducers'
import { cartReducer,cartPlaceOrderReducer } from './reducers/cartReducers'
const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const adminInfoFromStorage = localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo')?JSON.parse(localStorage.getItem('restaurantInfo')):null
const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userEditFavourites:userFavouritesReducer,
    userGetFavourites: userGetFavouritesReducer,
    adminRegister : adminRegisterReducer,
    adminDetails:adminDetailsReducer,
    adminLogin : adminLoginReducer,
    restaurantRegister : restaurantRegisterReducer,
    restaurantDetails:restaurantDetailsReducer,
    restaurantUpdateProfile:restaurantUpdateProfileReducer,
    restaurantLogin : restaurantLoginReducer,
    restaurantMenuAdd : menuAddItemsReducer,
    restaurantMenu:getMenuByRestaurant,
    restaurantMenuDeleteItem: deleteMenuItemByIDReducer,
    allRestaurants: getAllRestaurants,
    menuItemDetail:getMenuItemByItemId,
    updateMenuItem:updateMenuItemByIDReducer,
    cartItems:cartReducer,
    placedOrder:cartPlaceOrderReducer,
    adminOrders:adminAllOrderDetailsReducer,
    adminChangeOrderStatus: adminChangeStatusReducer


})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initialState = {
    userLogin: {
        userInfo:userInfoFromStorage,
    } ,
    adminLogin: {
        adminInfo:adminInfoFromStorage,
        restaurantInfo:restaurantInfoFromStorage
    },
    cartItems:{cartItems:cartItemsFromStorage}

}

const middleWare = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))

)

export default store