import React from 'react'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
const Header = () => {

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const adminLogin = useSelector(state=>state.adminLogin)
    const {adminInfo} = adminLogin
    return (
        <header>
            
            <div className="container">
                 <SideBar/>
                <div className="logo">
                    <Link style={{ textDecoration: 'none', color:'black' }} to="/"><h1>Uber <span>Eats</span></h1></Link>
                </div>
                {!(userInfo || adminInfo) &&
                <div className="searchBar">
                <Link style={{ textDecoration: 'none', color:'black' }} to="/login">
                    <div className="header-option">
                        <a><span className="header-sign-in-button">Sign in</span> </a>
                    </div></Link>
                </div>
                }
                
            </div>
        </header>
    )
}

export default Header
