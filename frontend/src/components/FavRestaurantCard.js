import React,{ useState, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as allIcons from "react-icons/all"
import { addFavourites,getFavourites,removeFavourites } from '../actions/userActions'
const FavRestCard = ({ data }) => {


    
    return (
        <div className="rest-card">
            <Link style={{ textDecoration: 'none' }} to={`/restDetails/${encodeURI(data.rest_id)}`}>
                <img className="img-responsive" src={data.rest_main_photo}></img>
            </Link>
            <div className="row">
                    <Link  className="py-3 col-md-10" to={`/restDetails/${encodeURI(data.rest_id)}`}>{data.rest_name}</Link>
                    <p className="col-md-2" style={{color:'green', cursor:'pointer'}} ><allIcons.AiFillHeart/></p>
                   
                    
                    
            </div>

        </div>
    )
}

export default FavRestCard
