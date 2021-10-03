import { MENU_ADD_CLEAR, MENU_ADD_FAIL, MENU_ADD_REQUEST, MENU_ADD_SUCCESS, MENU_DELETE_FAIL, MENU_DELETE_REQUEST, MENU_DELETE_SUCCESS, MENU_DETAILS_FAIL, MENU_DETAILS_REQUEST, MENU_DETAILS_SUCCESS, MENU_GET_BY_ID_FAIL, MENU_GET_BY_ID_REQUEST, MENU_GET_BY_ID_SUCCESS, MENU_UPDATE_FAIL, MENU_UPDATE_REQUEST, MENU_UPDATE_SUCCESS } from "../constants/menuConstants"
import axios from "axios"
export const getMenuDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:MENU_GET_BY_ID_REQUEST
        })
     
        let uri = '/api/restaurant/'+encodeURIComponent(id)
        console.log(uri)
        const {data} = await axios.get(uri)
        console.log(data)
         dispatch({
            type : MENU_GET_BY_ID_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:MENU_GET_BY_ID_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const addmenuItem = (rest_id,item_name,item_category,item_type,item_photo_path,item_desc) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:MENU_ADD_REQUEST
        })

        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const {data} = await axios.post('api/restaurant/additem',{rest_id,item_name,item_category,item_type,item_photo_path,item_desc},config)
        //console.log(data)
         dispatch({
            type : MENU_ADD_SUCCESS,
            payload:data,
        })
        
        
    } catch (error) {

         dispatch({
            type:MENU_ADD_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}


export const updateItem = (item_id,item_name,item_price,item_category,item_type,item_photo_path,item_desc) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:MENU_UPDATE_REQUEST
        })

        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const {data} = await axios.put('/api/admin/updateMenuItem',{item_id,item_name,item_price,item_category,item_type,item_photo_path,item_desc},config)
       
         dispatch({
            type : MENU_UPDATE_SUCCESS,
            success:true
        })
        
        
    } catch (error) {

         dispatch({
            type:MENU_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const deleteMenuItemByItemID = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:MENU_DELETE_REQUEST
        })
     
        let uri = '/api/admin/deleteMenuItem/'+encodeURIComponent(id)
        const {adminLogin} = getState()
        const {adminInfo} = adminLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
       await axios.delete(uri,config)
        //console.log(data)
         dispatch({
            type : MENU_DELETE_SUCCESS,
        })
        dispatch({
            type : MENU_GET_BY_ID_SUCCESS,
        })
       
        
    } catch (error) {

         dispatch({
            type:MENU_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getMenuItemByItemID = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:MENU_GET_BY_ID_REQUEST
        })
     
        let uri = '/api/restaurant/menuItem/'+encodeURIComponent(id)
        console.log(id)
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
       const {data} = await axios.get(uri,config)
        //console.log(data)
         dispatch({
            type : MENU_GET_BY_ID_SUCCESS,
            payload:data
        })
        
       
        
    } catch (error) {

         dispatch({
            type:MENU_GET_BY_ID_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const clearaddmenuItem = () => async(dispatch) =>{
    dispatch({
        type:MENU_ADD_CLEAR
    })
}