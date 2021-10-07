import { CART_ADD_ITEM_SUCCESS, CART_CHANGE_ITEM_FAIL, CART_CHANGE_ITEM_REQUEST, CART_DELETE_ITEM_SUCCESS } from "../constants/cartConstants"

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




