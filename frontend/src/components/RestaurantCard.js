import React from 'react'
import {Link} from 'react-router-dom'
const RestaurantCard = ({data}) => {
    return (
        <div className="rest-card">
            <Link  style={{textDecoration:'none'}}to={`/restDetails/${encodeURI(data.rest_id)}`}>
            <img className="img-responsive" src={data.rest_main_photo}></img>
            <p className="py-3">{data.rest_name} </p> 
            </Link>
            
        </div>
    )
}

export default RestaurantCard
