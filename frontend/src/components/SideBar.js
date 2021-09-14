import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
const SideBar = () => {
    const [sidebar,setSidebar] = useState()
    const showSidebar = () => {
        setSidebar(!sidebar)
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
                    <li className='nav-text'>
                        <Link to="/login"> <button > Sign In</button></Link>
                    </li>
                    <li className='nav-text'>
                        <Link to="#"><a> Add your restaurant</a></Link>
                    </li>
                    <li className='nav-text'>
                        <Link to="#"><a> Business Sign In</a></Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar
