import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRestaurants } from '../actions/restaurantActions'
const HomeScreen = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const allRestaurantsInfo = useSelector(state => state.allRestaurants)
    const { loading, error, allRestaurants } = allRestaurantsInfo
    //console.log(allRestaurants.result)
    //const result = true
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading:userLoading, error:userLoadError } = userDetails
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getAllRestaurants())

    }, [dispatch])


    return (
        <div className="container fluid">
            {userInfo ?

                allRestaurants
                ?
                <div>
                  {
                      allRestaurants.result.map(x => <p> {x.rest_name}</p>
                        )
                        
                  }
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
