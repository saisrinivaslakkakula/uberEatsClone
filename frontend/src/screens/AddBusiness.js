import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/restaurantActions'
import { Modal, Button } from 'react-bootstrap'
import ReactCrop from 'react-image-crop'
import axios from 'axios'
import {countryNames} from '../constants/countryNames'

const AddBusiness = ({ history, location }) => {

    const [rest_name, setName] = useState('')
    const [rest_type, setType] = useState('')
    const [rest_email, setEmail] = useState('')
    const [rest_phone, setPhone] = useState('')
    const [rest_street, setStreet] = useState('')
    const [rest_city, setCity] = useState('')
    const [rest_state, setState] = useState('')
    const [rest_country, setCountry] = useState('')
    const [rest_zipcode, setZipCode] = useState('')
    const [message, setMessage] = useState(null)
    const [rest_main_photo, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const redirect = location.search ? location.search.split("=")[1] : '/business-login'
    const [errorMessage, setErrorMessage] = useState(null)
    const [checked, setChecked] = useState(false);
    const [rest_open_day_from, setOpenDayFrom] = useState(false);
    const [rest_open_day_to, setOpenDayTo] = useState(false);
    const [rest_open_time_from, setOpenTimeFrom] = useState(false);
    const [rest_open_time_to, setOpenTimeTo] = useState(false);
    const [rest_desc,setDescription] = useState("")
    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin
    const restaurantRegister = useSelector(state => state.restaurantRegister)
    const { restaurantInfo, loading, error } = restaurantRegister
    
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
    
    useEffect(() => {
        if (!adminInfo) {
            history.push(redirect)
        }
        if(restaurantInfo){
            history.push('/adminHome')
        }
        
       
    }, [history, adminInfo, restaurantInfo,redirect])

    const handleFileUpload = async (e) => { // get file form <input Tag>
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('user_image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload/userimage', formData, config)
            //console.log(data)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
            dispatch(register(rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,rest_main_photo))
    }

    return (
        <div>
            <div className="login-container">
                <div className="logo">
                    <h1>Uber <span>Eats</span> | Business</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"><h2>Lets serve together</h2></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                    <form className="form-center" onSubmit={submitHandler}>

                        {loading && <Loader></Loader>}
                        <div className="form-group">
                            <input type="text" name="restName" className="form-control pad" required onChange={(e) => setName(e.target.value)} placeholder="Restaurant Name"></input>
                            <select className="form-control my-3" name="type" placeholder="Restaurant Type" onChange={(e) => setType(e.target.value)}>
                                <option default value=""> Choose restaurant type</option>
                                <option value="pick-up"> Pick-Up</option>
                                <option value="delivery"> Delivery</option>
                                <option value="Both"> Pick-up + Delivery</option>
                            </select>
                            <input type="email" name="email" className="form-control pad" required onChange={(e) => setEmail(e.target.value)} placeholder="Enter Restaurant Email"></input>
                            <input type="tel" name="phone" className="form-control pad" required onChange={(e) => setPhone(e.target.value)} placeholder="Restaurant Phone Number"></input>
                            <input type="text" name="Street" className="form-control pad" required onChange={(e) => setStreet(e.target.value)} placeholder="Street Name, Appt/Suite number"></input>
                            <input type="text" name="City" className="form-control pad" required onChange={(e) => setCity(e.target.value)} placeholder="City"></input>
                            <input type="text" name="State" className="form-control pad" required onChange={(e) => setState(e.target.value)} placeholder="State"></input>
                            {countryNames
                                ?
                                <select className="form-control my-3" name="Country" placeholder="Country" onChange={(e) => setCountry(e.target.value)}>
                                    <option>
                                        Country
                                    </option>
                                    {countryNames.map(x => <option value={x.name}> {x.name}</option>
                                    )
                                    }
                                </select>
                                :
                                <input type="text" name="Country" className="form-control pad" required onChange={(e) => setCountry(e.target.value)} placeholder="Country"></input>
                            }

                            <input type="text" name="ZipCode" className="form-control pad" required onChange={(e) => setZipCode(e.target.value)} placeholder="ZipCode"></input>
                            <hr></hr>
                            <h4>Timings</h4>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" checked={checked} value="All days" id="flexCheckChecked" onChange={e => setChecked(e.target.checked)} />
                                <label class="form-check-label my-3" for="flexCheckChecked">
                                    Open All Days
                                </label>
                            </div>
                            {!checked && (
                                <div>
                                    <select className="form-control " name="opendayfrom" placeholder="open From" onChange={(e) => setOpenDayFrom(e.target.value)}>
                                        <option default value=""> open from (day)</option>
                                        <option value="Sunday"> Sunday</option>
                                        <option value="Monday"> Monday</option>
                                        <option value="Tuesday"> Tuesday</option>
                                        <option value="Wednesday"> Wednesday</option>
                                        <option value="Thursday"> Thursday</option>
                                        <option value="Friday"> Friday</option>
                                        <option value="Saturday"> Saturday</option>

                                    </select>
                                    <select className="form-control my-3" name="opendayto" placeholder="open To" onChange={(e) => setOpenDayTo(e.target.value)}>
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
                            )}
                            <div className="row">
                            <div className="col-md-6">
                                <select className="form-control my-3" name="opentimefrom" placeholder="open time from" onChange={(e) => setOpenTimeFrom(e.target.value)}>
                                <option value=""> Opens at</option>
                                    {
                                        Hours.map(x => <option value={x}> {x}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <select className="form-control my-3" name="opentimefrom" placeholder="open time from" onChange={(e) => setOpenTimeTo(e.target.value)}>
                                <option value=""> Closes at</option>
                                    {
                                        Hours.map(x => <option value={x}> {x}</option>
                                        )
                                    }
                                </select>
                            </div>
                            </div>
                            <hr></hr>
                            <h4>Description</h4>
                            <p>
                                Upload Photo &nbsp;
                                <input type="file" accept="image/*" className="form-control-file" placeholder="Upload Photo" onChange={handleFileUpload} />
                            </p>
                            <textarea className="form-control" placeholder = "Describe your restraurant to the customers..." rows={5} onChange={(e) => setDescription(e.target.value)}></textarea>
                            {uploading && <Loader />}
                            <div class="d-grid gap-2">
                                {message && <Message variant='danger'>{message}</Message>}
                                {error && <Message variant='danger'>{error}</Message>}
                                <button class="btn btn-secondary" type="submit">Submit</button>
                            </div>
                            <p> Already User?<span>
                                <Link to="/login"><a> Sign In</a></Link>
                            </span> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBusiness
