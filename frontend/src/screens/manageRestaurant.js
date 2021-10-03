import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getRestaurantDetailsforAdmin, updateRestaurantProfile } from '../actions/restaurantActions'
import { Link } from 'react-router-dom'
const ManageRestaurant = ({ location, history }) => {

    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantType, setRestaurantType] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [phone, setPhone] = useState('')
    const [Street, setStreet] = useState('')
    const [City, setCity] = useState('')
    const [State, setState] = useState('')
    const [Country, setCountry] = useState('')
    const [ZipCode, setZipCode] = useState('')
    const [message, setMessage] = useState(null)
    const [openDay, setOpenDay] = useState('')
    const [closeDay, setCloseDay] = useState('')
    const [openTime, setOpenTime] = useState('')
    const [closeTime, setCloseTime] = useState('')
    const [allDays, setAllDays] = useState(false)
    const [description, setDescription] = useState('')
    const [checked, setChecked] = useState(false);
    const [openTimeDropDown, setOpenTimeDropdown] = useState(false);
    const dispatch = useDispatch()
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const restaurantDetailsResult = useSelector(state => state.restaurantDetails)
    const { restaurantDetails, loading, error } = restaurantDetailsResult
    const restaurantupdateProfileResult = useSelector(state => state.restaurantUpdateProfile)
    const { loading: updateLoading, success, error: updateError, restaurant: updateMessageFromBackEnd } = restaurantupdateProfileResult

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    useEffect(() => {

        if (!adminInfo) {
            history.push('/business-login')
        }

        else {
            if (localStorage.getItem('restInfo') === null) {
                if (localStorage.getItem('restaurantInfo') === null)
                    history.push('/adminHome')
            }
            if (!restaurantDetails) {
                dispatch(getRestaurantDetailsforAdmin(adminInfo._id))
                //alert("admin Info Found"+adminInfo._id)
            }
            else {
                //console.log(restaurantDetails)
                setRestaurantName(restaurantDetails.rest_name)
                setEmail(restaurantDetails.rest_email)
                setPhone(restaurantDetails.rest_phone)
                setStreet(restaurantDetails.rest_street)
                setCity(restaurantDetails.rest_city)
                setState(restaurantDetails.rest_state)
                setCountry(restaurantDetails.rest_country)
                setZipCode(restaurantDetails.rest_zipcode)
                setImage(restaurantDetails.rest_main_photo)
                setOpenDay(restaurantDetails.rest_open_day_from)
                setCloseDay(restaurantDetails.rest_open_day_to)
                setOpenTime(restaurantDetails.rest_open_time_from)
                setCloseTime(restaurantDetails.rest_open_time_to)
                setDescription(restaurantDetails.description)



            }
        }


    }, [dispatch, history, adminInfo, restaurantDetails, checked, openDay, updateMessageFromBackEnd])

    const submitHandler = (e) => {
        e.preventDefault()
        const rest_id = JSON.parse(localStorage.getItem('restaurantInfo')).rest_id
        //alert(rest_id)

        dispatch(updateRestaurantProfile(rest_id, restaurantName, restaurantType, email, phone, Street, City, State, Country, ZipCode, openDay, closeDay, openTime, closeTime, description, checked))

    }

    const handleDropDownOptionToggle = (e) => {
        setOpenTimeDropdown(true)
    }

    const generate_series = () => {
        const dt = new Date(1970, 0, 1);
        const rc = [];
        while (dt.getDate() === 1) {
            rc.push(dt.toLocaleTimeString('en-US'));
            dt.setMinutes(dt.getMinutes() + 60);
        }
        return rc;
    }

    const Hours = generate_series()


    return (
        <div className="container update-profile">
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            {loading && <Loader></Loader>}
            {updateLoading && <Loader></Loader>}
            {success && <Message variant='success'>Profile Update Success!</Message>}


            <form className="form-center" onSubmit={submitHandler}>
                <div className="row py-2">
                    <div className="col-md-3">
                        {image ?
                            <img className="userImg-enlarged" src={image}></img>
                            :
                            <img className="userImg-enlarged" src="/images/defaultuser.jpeg"></img>
                        }

                    </div>
                    <div className="col-md-9">
                        <div className="row py-2">
                            <div class="col-md-2">
                                <label>Restaurant Email </label>
                            </div>
                            <div class="col-md-6">
                                <input type="email" value={email} className="form-control" name="firstName" onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div class="col-md-2">
                                <label>Restaurant Phone </label>
                            </div>
                            <div class="col-md-6">
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" name="lastName"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 py-2">
                                <button className="btn btn-dark">change Photo</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label>Restaurant Name</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} className="form-control" name="firstName"></input>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label>Restaurant Type</label>
                    </div>
                    <div className="col-md-4">
                        <select className="form-control my-3" name="type" placeholder="Restaurant Type" onChange={(e) => setRestaurantType(e.target.value)}>
                            {restaurantType === "pick-up" ? <option value="pick-up" selected> Pick-Up</option> : <option value="pick-up"> Pick-Up</option>}
                            {restaurantType === "delivery" ? <option value="delivery" selected> Delivery</option> : <option value="delivery"> Delivery</option>}
                            {restaurantType === "Both" ? <option value="Both" selected> Pick-up + Delivery</option> : <option value="Both"> Pick-up + Delivery</option>}
                            {/*<option value="delivery"> Delivery</option>
                            <option value="Both"> Pick-up + Delivery</option>*/}
                        </select>
                    </div>

                </div>

                <h4> Address</h4>
                <div className="row">
                    <div className="col-md-3">
                        <label>Line 1</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" value={Street} onChange={(e) => setStreet(e.target.value)} className="form-control" name="street"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="row">
                            <label>Country</label>
                        </div>
                        <div className="row">
                            <input type="text" value={Country} onChange={(e) => setCountry(e.target.value)} className="form-control input-border" name="country"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>State</label>
                        </div>
                        <div className="row">
                            <input type="text" value={State} onChange={(e) => setState(e.target.value)} className="form-control input-border" name="state"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>City</label>
                        </div>
                        <div className="row">
                            <input type="text" value={City} onChange={(e) => setCity(e.target.value)} className="form-control input-border" name="city"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>ZipCode</label>
                        </div>
                        <div className="row">
                            <input type="text" value={ZipCode} onChange={(e) => setZipCode(e.target.value)} className="form-control input-border" name="zipcode"></input>
                        </div>
                    </div>
                </div>

                <div className="row py-2">
                    <div className="col-md-3">
                        <label>Days Open</label>
                    </div>
                    <div className="col-md-4">
                        <input class="form-check-input" type="checkbox" checked={checked} value="All days" id="flexCheckChecked" onChange={e => setChecked(e.target.checked)} />
                        <label class="form-check-label my-3" for="flexCheckChecked">
                            Open All Days
                        </label>
                    </div>

                </div>

                {!checked &&
                    <div className="row py-1">
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-3">
                            <select className="form-control " name="opendayfrom" placeholder="open From" onChange={(e) => setOpenDay(e.target.value)}>
                                <option default value=""> open from (day)</option>
                                <option value="Sunday"> Sunday</option>
                                <option value="Monday"> Monday</option>
                                <option value="Tuesday"> Tuesday</option>
                                <option value="Wednesday"> Wednesday</option>
                                <option value="Thursday"> Thursday</option>
                                <option value="Friday"> Friday</option>
                                <option value="Saturday"> Saturday</option>

                            </select>
                            <select className="form-control my-3" name="opendayto" placeholder="open To" onChange={(e) => setCloseDay(e.target.value)}>
                                <option default value=""> Open To (day)</option>
                                <option value="Sunday"> Sunday</option>
                                <option value="Monday"> Monday</option>
                                <option value="Tuesday"> Tuesday</option>
                                <option value="Wednesday"> Wednesday</option>
                                <option value="Thursday"> Thursday</option>
                                <option value="Friday"> Friday</option>
                                <option value="Saturday"> Saturday</option>

                            </select>
                        </div>
                    </div>
                }



                <div className="row">
                    <div className="col-md-3">
                        <label>Timings <a onClick={(e) => handleDropDownOptionToggle(e.target.value)} style={{ color: 'blue', cursor: 'pointer' }}><u>(change)</u></a></label>
                    </div>
                    {openTimeDropDown
                        ?
                        <>
                            <div className="col-md-4">
                                <select className="form-control my-3" name="opentimefrom" placeholder="open time from" onChange={(e) => setOpenTime(e.target.value)}>
                                    <option value=""> Opens at</option>
                                    {
                                        Hours.map(x => <option value={x}> {x}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-control my-3" name="opentimefrom" placeholder="open time from" onChange={(e) => setCloseTime(e.target.value)}>
                                    <option value=""> Closes at</option>
                                    {
                                        Hours.map(x => <option value={x}> {x}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </>
                        :
                        <>
                            <div className="col-md-4">
                                <input type="text" value={openTime} onChange={(e) => setOpenTime(e.target.value)} className="form-control" name="firstName"></input>
                            </div>
                            <div className="col-md-4">
                                <input type="text" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} className="form-control" name="firstName"></input>
                            </div>
                        </>
                    }
                </div>


                <div className="row py-3">
                    <div className="col-md-3">
                        <label>Description</label>
                    </div>
                    <div className="col-md-4">
                        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" name="firstName"></textarea>
                    </div>


                </div>

                <div className="row">
                    {success && <Message variant='success'>Profile Update Success!</Message>}
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">

                        <button type="submit" className="btn btn-dark"> Update Details</button>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default ManageRestaurant
