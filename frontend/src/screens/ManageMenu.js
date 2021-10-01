import React , { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {clearaddmenuItem,getMenuDetails} from '../actions/menuActions'
const ManageMenu = ({history,location}) => {
    const redirect = location.search ? location.search.split("=")[1] : '/business-login'
    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo, restaurantInfo } = adminLogin
    const addMenuState = useSelector(state => state.restaurantMenuAdd)
    const {loading,error,menuInfo} = addMenuState
    const restaurantMenu = useSelector(state => state.restaurantMenu)
    const {menu} = restaurantMenu
    console.log((menu))
    useEffect(() => {
        if (!adminInfo) {
            history.push(redirect)
        }
        if(!menu)
            dispatch(getMenuDetails('C6KuBfV2bRjRUP5DPPT/HQKj0eCm7BpwXFttQ93d0mQ='))
        dispatch(clearaddmenuItem())
            
    }, [history, adminInfo, redirect,menu])

    return (
        <div className="container">
            <div className="menu-add-item-button">
                <p><Link to="/addMenuItem"><button className="btn btn-success"><b>+ Add Menu Item</b></button></Link></p>
            </div>
            {menu?
            <table class="table table-hover">
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
                        <tr>
                        <td>{x.item_photo_path}</td>
                        <td scope="row">{x.item_name}</td>
                        <td>{x.item_category}</td>
                        <td>{x.item_type}</td>
                        <td>Edit Delete</td>
                    </tr>
                    ))}
                    
                   

                    {/*<tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>*/}
                </tbody>
            </table>
            :
            (<h4>no Items in the Menu. Click on Add Menu Item to add your Menu Items</h4>)}
        </div>
    )
}

export default ManageMenu
