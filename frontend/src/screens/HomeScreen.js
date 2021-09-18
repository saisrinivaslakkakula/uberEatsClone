import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
const HomeScreen = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails
    const dispatch = useDispatch()

    /*useEffect(()=>{
        if(userInfo){
            dispatch(getUserDetails('profile'))
            
        }
    },[userInfo,dispatch])*/


    return (
        <div className="container">
            {userInfo
            ?
            <div style={{margin:'10rem'}}>
                <h1 > Hello {userInfo.firstName},</h1>
                <h1 > Welcome to Uber Eats. </h1>
            </div>
            
            :
            <div style={{margin:'10rem'}}>
                <h1 > Welcome to Uber Eats</h1>
                <h1 > Please login to Continue</h1>
            </div>
            }
            
        </div>
    )
}

export default HomeScreen
