import { CART_ADD_ITEM_SUCCESS, CART_CHANGE_ITEM_FAIL, CART_CHANGE_ITEM_REQUEST, CART_CLEAR_REQUEST, CART_DELETE_ITEM_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from '../constants/cartConstants'

const cartReducer = (state = {cartItems:[]},action) =>{
    switch(action.type){
        case CART_CHANGE_ITEM_REQUEST:
            return({...state,loading:true})
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload
            const existItem = state.cartItems.find(x=>x.item_id === item.item_id)
            
            if(existItem){
                return(
                    {
                        ...state,
                        cartItems: state.cartItems.map(x=>x.item_id === item.item_id? item:x)
                    }
                )
            }
            else{
                return({
                    loading:false,
                    cartItems:[...state.cartItems,item],
                    success:true
                })
            }
        case CART_DELETE_ITEM_SUCCESS:
            return {
                ...state,
                cartItems:state.cartItems.filter((x)=>x.item_id !== action.payload),
            }
        case CART_CHANGE_ITEM_FAIL:
            return({loading:false, error:action.payload})
        case CART_CLEAR_REQUEST:
            localStorage.removeItem('cartItems')
            return({
                ...state,
                clearCartSuccess:true,
                cartItems:[]
            })
        default:
                return state

    }
}


const cartPlaceOrderReducer = (state = {},action) =>{

    switch(action.type){
        case PLACE_ORDER_REQUEST:
            return({loading:true})
        case PLACE_ORDER_SUCCESS:
            return({loading:false,success:true})
        case PLACE_ORDER_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}



export {cartReducer,cartPlaceOrderReducer}