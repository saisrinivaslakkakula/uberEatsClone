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

    useEffect(() => {
        if (!adminInfo) {
            history.push(redirect)
        }
            dispatch(getMenuDetails('C6KuBfV2bRjRUP5DPPT/HQKj0eCm7BpwXFttQ93d0mQ='))
            dispatch(clearaddmenuItem())
            

        


    }, [history, adminInfo, redirect])

    return (
        <div className="container">
            <div className="menu-add-item-button">
                <p><Link to="/addMenuItem"><button className="btn btn-success"><b>+ Add Menu Item</b></button></Link></p>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
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
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ManageMenu
