import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {getRestaurantDetailsforAdmin} from '../actions/restaurantActions'
const AdminHome = ({ history }) => {

    const adminLogin = useSelector(state => state.adminLogin)
    let { adminInfo, restaurantInfo, loading, error } = adminLogin
    const restaurantDetails = useSelector(state => state.restaurantDetails)
    const { user } = restaurantDetails
    restaurantInfo =user
    const dispatch = useDispatch()
    useEffect(() => {

        if (!adminInfo) {
            history.push("/")
        }
        if(!restaurantInfo){
            dispatch(getRestaurantDetailsforAdmin(adminInfo._id))
        }
    }, [history, adminInfo,restaurantInfo])
    return (
        <div className="container adminHomePageMessage">
            {restaurantInfo ?
                <div style={{ margin: '1rem' }}>
                    <h3> {restaurantInfo.rest_name}</h3>
                </div>
                :
                <div style={{ margin: '1rem' }}>
                    <h1 > Hello {adminInfo.firstName},</h1>
                    <h1 > Welcome to Uber Eats Business Page. </h1>

                    <div className="card">
                        <div class="card-body">
                            <h5 class="card-title">Oops! Nothing here!</h5>
                            <p class="card-text"> Today is the day to help Bon Appetites! Add your restraunt to our listing.</p>
                            <Link to={"/addBusiness"}><button className="btn btn-success"><b>Get Started</b></button></Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

            export default AdminHome
