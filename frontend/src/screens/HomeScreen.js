import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRestaurants,filterRestaurantResultsByDeliveryType,filterRestaurantResultsByDeiteryType } from '../actions/restaurantActions'
import Loader from '../components/Loader'
import * as AllIcons from 'react-icons/all'
import RestaurantCard from '../components/RestaurantCard'
const HomeScreen = () => {

    const [deliverychecked, setDeliveryChecked] = useState('');
    const [pickUpChecked, setPickUpChecked] = useState('')
    const [bothChecked, setbothChecked] = useState('Both')
    const [deliveryModeChanged, setDeliveryModeChanged] = useState('Both')
    const [dieteryoptions,setDieteryOptions] = useState({
        Veg:false,
        Vegan:false,
        nonVeg:false

    })
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const allRestaurantsInfo = useSelector(state => state.allRestaurants)
    const { loading, error, allRestaurants } = allRestaurantsInfo
    //console.log(allRestaurants.result)
    //const result = true
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading: userLoading, error: userLoadError } = userDetails
    const dispatch = useDispatch()

    const getAllRestaurantsInfo = async() =>{
        dispatch(getAllRestaurants())
    }

    useEffect(() => {



        if(deliveryModeChanged ==='Both' || deliveryModeChanged===''){
            //if(!dieteryoptions.Veg && !dieteryoptions.Vegan && !dieteryoptions.nonVeg)
                dispatch(getAllRestaurants())
        }
        else{
            dispatch(filterRestaurantResultsByDeliveryType(deliveryModeChanged))
            
        }

        if(dieteryoptions.Veg || dieteryoptions.Vegan || dieteryoptions.nonVeg){
            dispatch(filterRestaurantResultsByDeiteryType(dieteryoptions))
        }

        
            

    }, [dispatch,deliveryModeChanged,dieteryoptions])

    const setDeliveryMode = (e) =>{
        setDeliveryModeChanged(e)
        if(e==='pick-up'){
            setPickUpChecked('pick-up')
            setDeliveryChecked('')
            setbothChecked('')
        }
        else if(e==='Delivery'){
            setPickUpChecked('')
            setDeliveryChecked('Delivery')
            setbothChecked('')

        }
        else{
            setPickUpChecked('')
            setDeliveryChecked('')
            setbothChecked('Both')
        }

            //setDeliveryChecked(!deliverychecked)
           // setPickUpChecked(!pickUpChecked)

        
    }

    const setDietery=(e)=>{
        if(e==='Veg'){
            setDieteryOptions({
                Veg:!dieteryoptions.Veg,
                nonVeg:dieteryoptions.nonVeg,
                Vegan: dieteryoptions.Vegan
            })
        }
            
        else if (e== 'Vegan'){
            setDieteryOptions({
                Veg:dieteryoptions.Veg,
                nonVeg:dieteryoptions.nonVeg,
                Vegan: !dieteryoptions.Vegan
            })
        }
           
        else if (e=='nonVeg'){
            setDieteryOptions({
                Veg:dieteryoptions.Veg,
                nonVeg:!dieteryoptions.nonVeg,
                Vegan: dieteryoptions.Vegan
            })

        }
           
        else{
            setDieteryOptions({
                Veg:dieteryoptions.Veg,
                nonVeg:dieteryoptions.nonVeg,
                Vegan: dieteryoptions.Vegan,
                all:dieteryoptions.all
            })
        }
            
        
    }
    const reloadPage = ()=>{
        window.location.reload()
    }
    return (
        <div className="container">
            {userLoading&& <Loader/>}
            {userInfo ?

                allRestaurants
                    ?
                    <div>
                        {/*
                      allRestaurants.result.map(x => <p> {x.rest_name}</p>
                        )*/

                        }
                        <div className="row">
                            <div className="col-md-4 py-4">
                                <h5><b>Delivery Options</b></h5>
                                <form>
                                    <label className="radio-inline">
                                        <input type="radio" name="optradio" value="pick-up" checked={pickUpChecked === 'pick-up'} onChange={(e) => setDeliveryMode(e.target.value)}></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.BsFillBagFill /></span> Pick Up</span>
                                    </label>
                                    <label className="radio-inline px-3">
                                        <input type="radio" name="optradio" value="Delivery" checked={deliverychecked === 'Delivery'} onChange={(e) => setDeliveryMode(e.target.value)}></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.RiEBike2Line /></span>Delivery</span>
                                    </label>
                                    <label className="radio-inline px-3">
                                        <input type="radio" name="optradio" value="Both" checked={bothChecked === 'Both'}onChange={(e) => setDeliveryMode(e.target.value)} ></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.GoArrowBoth /></span>Both</span>
                                    </label>
                                </form>
                                <hr></hr>
                                <h5><b>Dietery</b></h5>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio" value="Veg" checked={dieteryoptions.Veg} onChange={(e) => setDietery(e.target.value)}></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.FaLeaf /></span> Vegetarian</span>
                                </div>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio" value="Vegan" checked={dieteryoptions.Vegan} onChange={(e) => setDietery(e.target.value)}></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.GiRawEgg /></span>Vegan</span>
                                </div>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio" value="nonVeg" checked={dieteryoptions.nonVeg} onChange={(e) => setDietery(e.target.value)}></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.GiChickenOven /></span>Non-veg</span>
                                </div>
                                
                                <button className="btn btn-dark my-2" onClick={reloadPage}> Reset Filters</button>

                            </div>
                            {loading&&<Loader/>}
                            <div className="col-md-8 px-3">
                                <div className="row py-3">
                                    {
                                        allRestaurants.result.map(x => 
                                            <div className="col-md-3 py-3">
                                            <RestaurantCard data={x} />
                                        </div>
                                    )

                                    }
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    (
                        <div style={{ margin: '10rem' }}>
                            <h1 > Hello {userInfo.firstName},</h1>
                            <h1 > Welcome to Uber Eats. </h1>
                            <p > We regret to inform you  that there's a technical issue from our end. Please try reloading the page or try again after sometime. </p>
                        </div>
                    )

                :
                <div style={{ margin: '10rem' }}>
                    <h1 > Welcome to Uber Eats</h1>
                    <h1 > Please login to Continue</h1>
                </div>
            }

        </div>
    )
}

export default HomeScreen
