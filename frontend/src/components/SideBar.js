import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as IoIcons from 'react-icons/io'
import * as BoxIcons from 'react-icons/bi'
import * as AllIcons from 'react-icons/all'
import { useSelector, useDispatch } from 'react-redux'
import { logout, getUserDetails } from '../actions/userActions'
import { logout as adminLogout} from '../actions/adminActions'
const SideBar = ({location,history}) => {
    const [sidebar, setSidebar] = useState()
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails
    const dispatch = useDispatch()
    const logoutHandler = () => {
        if(userInfo)
            dispatch (logout())
        if(adminInfo)
        dispatch (adminLogout())

    }


    return (
        <div>
            <Link to="#" className='menu-bars'>
                <div className='menu-bars'> <AllIcons.FaBars onClick={showSidebar} /></div>
            </Link>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars-close'>
                            <AllIcons.AiOutlineClose onClick={showSidebar} />
                        </Link>

                    </li>
                    {adminInfo?(
                                <div className="nav-menu-items">
                                {adminInfo.image && adminInfo.image !== "null" ?
                                    <div> <li> <img className="userImg" src={adminInfo.image}></img> {adminInfo.firstName}</li></div>
                                    :
                                    <div> <li> <img className="userImg" src="/images/defaultuser.jpeg"></img> {adminInfo.firstName}</li></div>
                                }
    
                                <p>
                                    <li>
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
                                            <AllIcons.FaUserAlt /> <span> Your Profile</span>
                                        </Link>
    
                                    </li>
                                </p>
                                <p> <li> <AllIcons.BiEdit /> <span>Manage Restaurant</span></li></p>
                                <p> <li> <AllIcons.MdRestaurantMenu /> <span>Edit Menu</span></li></p>
                                <p> <li> <AllIcons.IoIosHelpBuoy /> <span>Previous orders</span></li></p>
                                <p> <li> <AllIcons.IoMdPricetag /> <span>Edit Offers</span></li></p>
                                <p onClick={showSidebar} style={{ 'color': '#757575' }}> <li onClick={logoutHandler}>
                                    Sign out
                                </li></p>
                            </div>
                    ):
                    <div>
                        {userInfo?
                        (
                            <div className="nav-menu-items">
                            {userInfo.image && userInfo.image !== "null" ?
                                <div> <li> <img className="userImg" src={userInfo.image}></img> {userInfo.firstName}</li></div>
                                :
                                <div> <li> <img className="userImg" src="/images/defaultuser.jpeg"></img> {userInfo.firstName}</li></div>
                            }

                            <p>
                                <li>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
                                        <AllIcons.FaUserAlt /> <span> View Profile</span>
                                    </Link>

                                </li>
                            </p>
                            <p> <li> <AllIcons.FaReceipt /> <span>Orders</span></li></p>
                            <p> <li> <AllIcons.BsWallet /> <span>Wallet</span></li></p>
                            <p> <li> <AllIcons.IoIosHelpBuoy /> <span>Help</span></li></p>
                            <p> <li> <AllIcons.IoMdPricetag /> <span>Promotions</span></li></p>
                            <p onClick={showSidebar} style={{ 'color': '#757575' }}> <li onClick={logoutHandler}>
                                Sign out
                            </li></p>
                        </div>

                        )
                        :
                        (
                            <div>
                            <li className='nav-text'>
                                <Link to="/login"> <button onClick={showSidebar}> Sign In</button></Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="/business-signup"> Sign Up for a Business</Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="/business-login"> Business Sign In</Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="#"> Sign Up as A Driver Partner</Link>
                            </li>
                        </div>
                        )
                        }
                    </div>
                    }
                    {/*userInfo  ?
                        <div className="nav-menu-items">
                            {userInfo.image && userInfo.image !== "null" ?
                                <div> <li> <img className="userImg" src={userInfo.image}></img> {userInfo.firstName}</li></div>
                                :
                                <div> <li> <img className="userImg" src="/images/defaultuser.jpeg"></img> {userInfo.firstName}</li></div>
                            }

                            <p>
                                <li>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
                                        <AllIcons.FaUserAlt /> <span> View Profile</span>
                                    </Link>

                                </li>
                            </p>
                            <p> <li> <AllIcons.FaReceipt /> <span>Orders</span></li></p>
                            <p> <li> <AllIcons.BsWallet /> <span>Wallet</span></li></p>
                            <p> <li> <AllIcons.IoIosHelpBuoy /> <span>Help</span></li></p>
                            <p> <li> <AllIcons.IoMdPricetag /> <span>Promotions</span></li></p>
                            <p onClick={showSidebar} style={{ 'color': '#757575' }}> <li onClick={logoutHandler}>
                                Sign out
                            </li></p>
                        </div>

                        :
                        <div>
                            <li className='nav-text'>
                                <Link to="/login"> <button onClick={showSidebar}> Sign In</button></Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="/business-signup"> Sign Up for a Business</Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="/business-login"> Business Sign In</Link>
                            </li>
                            <li className='nav-text'>
                                <Link to="#"> Sign Up as A Driver Partner</Link>
                            </li>
                        </div>
                        */}
                    

                </ul>
            </nav>
        </div>
    )
}

export default SideBar
