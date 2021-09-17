import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
const SideBar = () => {
    const [sidebar, setSidebar] = useState()
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const { userInfo } = userLogin
    
    
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>
            <Link to="#" className='menu-bars'>
                <div className='menu-bars'> <FaIcons.FaBars onClick={showSidebar} /></div>
            </Link>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars-close'>
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </Link>

                    </li>
                    {userInfo ? 
                    <div className="nav-menu-items">
                        <div> <li> <img className="userImg" src="/images/defaultuser.jpeg"></img> {userInfo.firstName}</li></div>
                        <p> 
                            <li>
                                <Link style={{ textDecoration: 'none', color:'black' }} to="/profile"> 
                                <FaIcons.FaUserAlt/> <span> View Profile</span>
                                </Link>
                                 
                            </li>
                        </p>
                        <p> <li> <FaIcons.FaReceipt/> <span>Orders</span></li></p>
                        <p> <li> <BsIcons.BsWallet/> <span>Wallet</span></li></p>
                        <p> <li> <IoIcons.IoIosHelpBuoy/> <span>Help</span></li></p>
                        <p> <li> <IoIcons.IoMdPricetag/> <span>Promotions</span></li></p>
                        <p onClick={showSidebar} style={{'color':'#757575'}}> <li onClick={logoutHandler}> 
                            Sign out
                            </li></p>
                    </div>
                    
                    :
                        <div>
                            <li className='nav-text'>
                                <Link to="/login"> <button onClick={showSidebar}> Sign In</button></Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="#"><a> Add your restaurant</a></Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="#"><a> Business Sign In</a></Link>
                            </li>
                        </div>
                    }

                </ul>
            </nav>
        </div>
    )
}

export default SideBar
