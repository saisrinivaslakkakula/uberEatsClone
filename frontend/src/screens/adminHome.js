import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurantDetailsforAdmin } from '../actions/restaurantActions'
const AdminHome = ({ history }) => {

    const adminLogin = useSelector(state => state.adminLogin)
    let { adminInfo, restaurantInfo, loading, error } = adminLogin
    const restaurantDetails = useSelector(state => state.restaurantDetails)
    const { user } = restaurantDetails
    restaurantInfo = user
    const dispatch = useDispatch()
    useEffect(() => {

        if (!adminInfo) {
            history.push("/")
        }
        if (!restaurantInfo) {
            dispatch(getRestaurantDetailsforAdmin(adminInfo._id))
        }
    }, [history, adminInfo, restaurantInfo])
    return (
        <div className=" adminHomePageMessage">
            {restaurantInfo ?
                (
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <div className="ubereats-card">
                                <img src="images/admin_home_restaurant_card_image.jpeg" alt="Avatar" style={{ width: "100%" }} />
                                <div className="body">
                                    <h4><b>Manage Restaurant</b></h4>
                                    <p>Add/Update you restaurant timings, photos, address, phone etc..</p>
                                    <Link to="/manageRestaurant"><button className="btn btn-success">GO</button></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 text-center">
                            <div className="ubereats-card">
                                <img src="images/admin_home_manage_menu_card_image.jpeg" alt="Avatar" style={{ width: "100%" }} />
                                <div className="body">
                                    <h4><b>Manage Menu</b></h4>
                                    <p>Add/Update your menu items, photos, ingredients, availability etc..</p>
                                    <Link to="/manageMenu"><button className="btn btn-success">GO</button></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 text-center">
                            <div className="ubereats-card">
                                <img src="images/admin_home_manage_profile_card_image.png" alt="Avatar" style={{ width: "100%" }} />
                                <div className="body">
                                    <h4><b>Manage Profile</b></h4>
                                    <p>Add/Update profile details like phone number, email, password etc..</p>
                                    <Link to="/manageAdminProfile"><button className="btn btn-success">GO</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                )
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
