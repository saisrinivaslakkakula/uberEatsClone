import React from 'react'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header>
            
            <div className="container header">
                 <SideBar/>
                <div className="logo">
                    <Link style={{ textDecoration: 'none', color:'black' }} to="/"><h1>Uber <span>Eats</span></h1></Link>
                </div>
                <div className="searchBar">
                <Link style={{ textDecoration: 'none', color:'black' }} to="/login">
                    <div className="header-option">
                        <a><span className="header-sign-in-button">Sign in</span> </a>
                    </div></Link>
                </div>
            </div>
        </header>
    )
}

export default Header
