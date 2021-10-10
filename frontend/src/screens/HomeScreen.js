import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRestaurants, filterRestaurantResultsByDeliveryType,filterRestaurantResultsByDeiteryType, filterData } from '../actions/restaurantActions'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import * as AllIcons from 'react-icons/all'
import RestaurantCard from '../components/RestaurantCard'
const HomeScreen = () => {


    const [filterOptions,setFilterOptions] = useState({
        Veg:false,
        Vegan:false,
        nonVeg:false,
        pickup:false,
        delivery:false,
        both:true

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

   
    useEffect(() => {

            dispatch(filterData(filterOptions))
            dispatch(getUserDetails('profile'))

    }, [dispatch,filterOptions])



    const setFilterOptionsonChange=(e)=>{
        if(e==='Veg'){
            setFilterOptions({
                Veg:!filterOptions.Veg,
                nonVeg:filterOptions.nonVeg,
                Vegan: filterOptions.Vegan,
                delivery:filterOptions.delivery,
                pickup:filterOptions.pickup,
                both:filterOptions.both
            })
        }
            
        else if (e== 'Vegan'){
            setFilterOptions({
                Veg:filterOptions.Veg,
                nonVeg:filterOptions.nonVeg,
                Vegan: !filterOptions.Vegan,
                delivery:filterOptions.delivery,
                pickup:filterOptions.pickup,
                both:filterOptions.both
            })
        }
           
        else if (e=='nonVeg'){
            setFilterOptions({
                Veg:filterOptions.Veg,
                nonVeg:!filterOptions.nonVeg,
                Vegan: filterOptions.Vegan,
                delivery:filterOptions.delivery,
                pickup:filterOptions.pickup,
                both:filterOptions.both

            })

        }
        else if (e=='Delivery'){
            setFilterOptions({
                Veg:filterOptions.Veg,
                nonVeg:filterOptions.nonVeg,
                Vegan: filterOptions.Vegan,
                delivery:true,
                pickup:false,
                both:false

            })

        }
        else if (e=='pick-up'){
            setFilterOptions({
                Veg:filterOptions.Veg,
                nonVeg:filterOptions.nonVeg,
                Vegan: filterOptions.Vegan,
                delivery:false,
                pickup:true,
                both:false

            })

        }
        else if (e=='Both'){
            setFilterOptions({
                Veg:filterOptions.Veg,
                nonVeg:filterOptions.nonVeg,
                Vegan: filterOptions.Vegan,
                delivery:false,
                pickup:false,
                both:true

            })

        }
           
        else{
            setFilterOptions({
                Veg:filterOptions.Veg,
                nonVeg:filterOptions.nonVeg,
                Vegan: filterOptions.Vegan,
                delivery:filterOptions.delivery,
                pickup:filterOptions.pickup,
                both:true
            })
        }
            
        
    }
    const reloadPage = ()=>{
        window.location.reload()
    }
    return (
        <div className="container-fluid">
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
                            <div className="col-md-3 py-4">
                                <h5><b>Delivery Options</b></h5>
                                <form>
                                    <label className="radio-inline">
                                        <input type="radio" name="optradio" value="pick-up" checked={filterOptions.pickup} onChange={(e) => setFilterOptionsonChange(e.target.value)}></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.BsFillBagFill /></span> Pick Up</span>
                                    </label>
                                    <label className="radio-inline px-3">
                                        <input type="radio" name="optradio" value="Delivery" checked={filterOptions.delivery} onChange={(e) => setFilterOptionsonChange(e.target.value)}></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.RiEBike2Line /></span>Delivery</span>
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="optradio" value="Both" checked={filterOptions.both}onChange={(e) => setFilterOptionsonChange(e.target.value)} ></input>
                                        <span className="px-2"><span className="mx-2"><AllIcons.GoArrowBoth /></span>Both</span>
                                    </label>
                                </form>
                                <hr></hr>
                                <h5><b>Dietery</b></h5>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio" value="Veg" checked={filterOptions.Veg} onChange={(e) => setFilterOptionsonChange(e.target.value)}></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.FaLeaf /></span> Vegetarian</span>
                                </div>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio" value="Vegan" checked={filterOptions.Vegan} onChange={(e) => setFilterOptionsonChange(e.target.value)}></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.GiRawEgg /></span>Vegan</span>
                                </div>
                                <div className="py-2">
                                    <input type="checkbox" name="optradio" value="nonVeg" checked={filterOptions.nonVeg} onChange={(e) => setFilterOptionsonChange(e.target.value)}></input>
                                    <span className="px-2"><span className="mx-2"><AllIcons.GiChickenOven /></span>Non-veg</span>
                                </div>
                                
                                <button className="btn btn-dark my-2" onClick={reloadPage}> Reset Filters</button>

                            </div>
                            {loading&&<Loader/>}
                            <div className="col-md-9 px-3">
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
