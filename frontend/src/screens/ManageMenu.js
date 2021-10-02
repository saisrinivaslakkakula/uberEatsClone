import React , { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {clearaddmenuItem,getMenuDetails,deleteMenuItemByItemID} from '../actions/menuActions'
import {getRestaurantDetailsforAdmin} from '../actions/restaurantActions'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ManageMenu = ({history,location}) => {
    const redirect = location.search ? location.search.split("=")[1] : '/business-login'
    const dispatch = useDispatch()
    const adminLoginDetails = useSelector(state => state.adminLogin)
    const {adminInfo} = adminLoginDetails
    const RestaurantDetailsResult = useSelector(state => state.restaurantDetails)
    const {restaurantDetails} = RestaurantDetailsResult
    const restaurantMenu = useSelector(state => state.restaurantMenu)
    const {menu,loading,error} = restaurantMenu
    const restaurantMenuDeleteITem = useSelector(state => state.restaurantMenuDeleteItem)
    const {success:deleteItemSuccess,loading:deleteItemLoading,error:deleteItemError} = restaurantMenuDeleteITem
    const handleEdit = (e)=>{
        //e.preventDefault()
    }
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure you want to delete the product?")){
            dispatch(deleteMenuItemByItemID(id))
        }
    }
    useEffect(() => {
        if(!adminInfo){
            history.push("/business-login")
        }
        if(localStorage.getItem('restaurantInfo') === null){
            history.push("/adminHome")
        }
        if(!menu){
            const restDetails = localStorage.getItem('restaurantInfo')
            const restDetailsJson = JSON.parse(restDetails)
            dispatch(getMenuDetails(restDetailsJson.rest_id))
        }
            
            //dispatch(getMenuDetails(rest_id))

            
    }, [adminInfo,menu,dispatch])

    return (
        <div className="container">
            {loading && <Loader/>}
            <div className="menu-add-item-button">
                <p><Link to="/addMenuItem"><button className="btn btn-success"><b>+ Add Menu Item</b></button></Link></p>
                {deleteItemLoading && <Loader/>}
                
                {deleteItemError && <Message variant='danger'>{deleteItemError}</Message>}
            </div>
            {menu?
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map(x=>(
                        <tr >
                        <td ><img  className = "userImg" src={x.item_photo_path} alt="menuItemImage"></img></td>
                        <td scope="row">{x.item_name}</td>
                        <td>{x.item_category}</td>
                        <td>{x.item_type}</td>
                        <td>
                           <p> <AiIcons.AiFillEdit className="mx-1" onClick={handleEdit}/> <FaIcons.FaTrashAlt className="mx-1" onClick={()=> handleDelete(x.item_id)}/> </p>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            :
            (<h4 className="py-5">No Items in the Menu. Click on Add Menu Item to add your Menu Items</h4>)}
        </div>
    )
}

export default ManageMenu
