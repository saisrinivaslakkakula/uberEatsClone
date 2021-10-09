import { CART_ADD_ITEM_SUCCESS, CART_CHANGE_ITEM_FAIL, CART_CHANGE_ITEM_REQUEST, CART_CLEAR_REQUEST, CART_DELETE_ITEM_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/cartConstants"
import axios from "axios"
export const addCartItem = (item) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:CART_CHANGE_ITEM_REQUEST
        })
        const {cartItems:cartItemsState} = getState()
        console.log(cartItemsState)
        const {cartItems:state} = cartItemsState
        const DifferentRestaurant = state.find(x=>x.rest_id !== item.rest_id)
        if(DifferentRestaurant){
            dispatch({
                type:CART_CHANGE_ITEM_FAIL,
                payload:" Items found from Different Restaurants, Please clear the cart before proceeding."
            }) 
        }
        else{
            dispatch({
                type:CART_ADD_ITEM_SUCCESS,
                payload:item
            })

            localStorage.setItem('cartItems',JSON.stringify(getState().cartItems.cartItems))
        }

        
        
        
    } catch (error) {

         dispatch({
            type:CART_CHANGE_ITEM_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}


export const removeCartItem = (item) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:CART_CHANGE_ITEM_REQUEST
        })
        
            dispatch({
                type:CART_DELETE_ITEM_SUCCESS,
                payload:item
            }) 
        
        

            localStorage.setItem('cartItems',JSON.stringify(getState().cartItems.cartItems))
        

        
        
        
    } catch (error) {

         dispatch({
            type:CART_CHANGE_ITEM_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const placeOrderAction = (dataObject) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:PLACE_ORDER_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        //console.log(dataObject)
        const {data} = await axios.post('api/order/add',dataObject,config)
        //console.log(data)
         dispatch({
            type : PLACE_ORDER_SUCCESS,
            payload:data,
        })
        localStorage.removeItem('cartItems')
        dispatch({
            type : CART_CLEAR_REQUEST
        })
        
        
    } catch (error) {

         dispatch({
            type:PLACE_ORDER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const clearCartAction = () => async(dispatch) =>{
    localStorage.removeItem('cartItems')
    dispatch({
        type : CART_CLEAR_REQUEST,
    })
}

