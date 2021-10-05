import React from 'react'
import {Link} from 'react-router-dom'
const RestaurantCard = ({data}) => {
    return (
        <div className="rest-card">
            <Link to="/restDetails">
            <img className="img-responsive" src={data.rest_main_photo}></img>
            <p>{data.rest_name}</p>
            </Link>
        </div>
    )
}

export default RestaurantCard
