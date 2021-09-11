import React from 'react'
import * as FaIcons from 'react-icons/fa'
const Header = () => {
    return (
        <header>
            <div className="container header">
                <div className='menu-bars'> <FaIcons.FaBars/></div>
                <div className="logo">
                    <h1>Uber <span>Eats</span></h1>
                </div>
                <div className="searchBar">
                    
                    <div className="header-option">
                        <span>Sign in</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
