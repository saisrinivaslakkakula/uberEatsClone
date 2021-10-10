
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRestaurants, filterRestaurantResultsByDeliveryType, filterRestaurantResultsByDeiteryType, filterData } from '../actions/restaurantActions'
import { addFavourites, getFavourites, removeFavourites, getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import * as AllIcons from 'react-icons/all'
import RestaurantCard from '../components/RestaurantCard'
import FavRestCard from '../components/FavRestaurantCard'
const MyFavourites = ({ history }) => {


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const Fauvourites = useSelector(state => state.userGetFavourites)
    const { loading: restDetailsLoading, error: restDetailsError, favourites: favouritesFromState } = Fauvourites
    const allRestaurantsInfo = useSelector(state => state.allRestaurants)
    const { loading, error, allRestaurants } = allRestaurantsInfo
    const dispatch = useDispatch()


    useEffect(() => {
        if (!userInfo)
            history.push("/login")
        dispatch(getFavourites())
        dispatch(getUserDetails('profile'))

    }, [dispatch])



    return (
        <div className="container">
            {restDetailsLoading && <Loader />}
            {(allRestaurants && favouritesFromState) ?
                allRestaurants.result.map(x =>
                    favouritesFromState.result.find(y => y.rest_id === x.rest_id) &&
                    <div className="col-md-3 py-3">
                        <FavRestCard data={x} />
                    </div>
                )
                :
                <p>No Favourites added.</p>
            }


        </div>
    )
}

export default MyFavourites
