import React,{ useState, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as allIcons from "react-icons/all"
import { addFavourites,getFavourites,removeFavourites } from '../actions/userActions'
const RestaurantCard = ({ data }) => {
    const [favourite, setFavourite] = useState(false)
    const [favourites,setFavourites] = useState([])
    const restaurantDetails = useSelector(state => state.userGetFavourites)
    const { loading, error, favourites:favouritesFromState} = restaurantDetails

    const dispatch = useDispatch()
    useEffect(() => {
        //alert("asda")
        dispatch(getFavourites())
        
  

    }, [dispatch,favourite])

    const editFavourite = (rest_id) =>{
       
        if(favourite){
            setFavourite(!favourite)
            dispatch(removeFavourites())
            
        }
            
        else{
            
            setFavourite(!favourite)
            if(!favouritesFromState.result.find(x=>x.rest_id === rest_id))
                dispatch(addFavourites(rest_id))
           
            
        }
        


    }
    return (
        <div className="rest-card">
            <Link style={{ textDecoration: 'none' }} to={`/restDetails/${encodeURI(data.rest_id)}`}>
                <img className="img-responsive" src={data.rest_main_photo}></img>
            </Link>
            <div className="row">
                    <Link  className="py-3 col-md-10" to={`/restDetails/${encodeURI(data.rest_id)}`}>{data.rest_name}</Link>
                    {((favouritesFromState.result && favouritesFromState.result.find(x=>x.rest_id === data.rest_id))||(favourite)) ?
                    <p className="col-md-2" style={{color:'green', cursor:'pointer'}} onClick={()=>editFavourite(data.rest_id)}><allIcons.AiFillHeart/></p>
                    :
                    <p className="col-md-2" style={{color:'green', cursor:'pointer'}} onClick={()=>editFavourite(data.rest_id)}><allIcons.AiOutlineHeart/></p>
                    }
                    
            </div>

        </div>
    )
}

export default RestaurantCard
