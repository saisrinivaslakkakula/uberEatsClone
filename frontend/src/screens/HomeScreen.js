import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRestaurants } from '../actions/restaurantActions'
import * as AllIcons from 'react-icons/all'
import RestaurantCard from '../components/RestaurantCard'
const HomeScreen = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const allRestaurantsInfo = useSelector(state => state.allRestaurants)
    const { loading, error, allRestaurants } = allRestaurantsInfo
    //console.log(allRestaurants.result)
    //const result = true
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading: userLoading, error: userLoadError } = userDetails
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getAllRestaurants())

    }, [dispatch])


    return (
        <div className="container">
            {userInfo ?

                allRestaurants
                    ?
                    <div>
                        {/*
                      allRestaurants.result.map(x => <p> {x.rest_name}</p>
                        )*/

                        }
                        <div className="row">
                            <div className="col-md-4 py-4">
                                <h5><b>Delivery Options</b></h5>
                                <form>
                                    <label className="radio-inline">
                                        <input type="radio" name="optradio"></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.BsFillBagFill /></span> Pick Up</span>
                                    </label>
                                    <label className="radio-inline px-3">
                                        <input type="radio" name="optradio" checked></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.RiEBike2Line /></span>Delivery</span>
                                    </label>
                                </form>
                                <hr></hr>
                                <h5><b>Dietery</b></h5>

                                <div className="py-2">
                                    <input type="checkbox" name="optradio"></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.FaLeaf /></span> Vegetarian</span>
                                </div>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio"></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.GiRawEgg /></span>Vegan</span>
                                </div>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio"></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.GiChickenOven /></span>Non-veg</span>
                                </div>

                            </div>
                            <div className="col-md-8 px-3">
                                <div className="row py-3">
                                    {
                                        allRestaurants.result.map(x => 
                                            <div className="col-md-3 py-3">
                                            <RestaurantCard data={x} />
                                        </div>
                                    )

                                    }
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    (
                        <div style={{ margin: '10rem' }}>
                            <h1 > Hello {userInfo.firstName},</h1>
                            <h1 > Welcome to Uber Eats. </h1>
                            <p > We regret to inform you  that there's a technical issue from our end. Please try reloading the page or try again after sometime. </p>
                        </div>
                    )

                :
                <div style={{ margin: '10rem' }}>
                    <h1 > Welcome to Uber Eats</h1>
                    <h1 > Please login to Continue</h1>
                </div>
            }

        </div>
    )
}

export default HomeScreen
