import React from 'react'

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <h1>Uber <span>Eats</span></h1>
                </div>
                <div className="currentDetails">
                    <div className="header-option">
                        <i data-feather="map-pin"></i>
                        <span> London</span>
                    </div>
                    <div className="header-option">
                        <i data-feather="clock"></i>
                        <span>Deliver Now</span>
                    </div>
                </div>
                <div className="searchBar">
                    <div className="header-option">
                        <i data-feather="search"></i>
                        <span>Search</span>
                    </div>
                    <div className="header-option">
                        <span>Sign in</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
