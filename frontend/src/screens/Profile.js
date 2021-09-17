import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import { updateUserProfile } from '../actions/userActions'
const Profile = ({ history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [Street, setStreet] = useState('')
    const [City, setCity] = useState('')
    const [State, setState] = useState('')
    const [Country, setCountry] = useState('')
    const [ZipCode, setZipCode] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { userupdateDetails } = userUpdateProfile
    const [success,setSuccess] = useState('')
    useEffect(() => {
        
        if (!userInfo) {
            history.push('/login')
        }
        else {
            if (!user.email) {
                dispatch(getUserDetails('profile'))
            }
            else {
                //console.log(user)
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
                setPhone(user.phone)
                setStreet(user.Street)
                setCity(user.City)
                setState(user.State)
                setCountry(user.Country)
                setZipCode(user.ZipCode)
            }
        }
        
    }, [dispatch, history, user, loading, error, userInfo,userupdateDetails])

    const submitHandler = (e)=>{
        e.preventDefault()
        const userobj = {
            firstName,
            lastName,
            email,
            phone,
            Street,
            City,
            State,
            Country,
            ZipCode
        }
        dispatch(updateUserProfile(userobj))
        setSuccess("Success!")
    }

    return (
        <div className="container update-profile">
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Update Success!</Message>}
            {loading && <Loader></Loader>}
            <form className="form-center" onSubmit={submitHandler}>
            <div className="row py-2">
                <div className="col-md-3">
                    <img className="userImg-enlarged" src="/images/defaultuser.jpeg"></img>
                </div>
                <div className="col-md-9">
                    <div className="row py-2">
                        <div class="col-md-2">
                            <label>Email </label>
                        </div>
                        <div class="col-md-6">
                            <input type="email" value={email} className="form-control" name="firstName" onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div class="col-md-2">
                            <label>Phone </label>
                        </div>
                        <div class="col-md-6">
                            <input type="tel"  value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" name="lastName"></input>
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
                        <label>Full Name</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="form-control" name="firstName"></input>
                    </div>
                    <div className="col-md-4">
                        <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}  className="form-control" name="lastName"></input>
                    </div>
                </div>
                {/* 
                <div className="row">
                    <div className="col-md-3">
                        <label>Date of Birth</label>
                    </div>
                    <div className="col-md-4">
                        <input type="date" className="form-control" name="dob"></input>
                    </div>
                </div>
                */}
                
                <h4> Address</h4>
                <div className="row">
                    <div className="col-md-3">
                        <label>Line 1</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" value={Street}  onChange={(e)=>setStreet(e.target.value)} className="form-control" name="street"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="row">
                            <label>Country</label>
                        </div>
                        <div className="row">
                            <input type="text" value={Country}  onChange={(e)=>setCountry(e.target.value)} className="form-control input-border" name="country"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>State</label>
                        </div>
                        <div className="row">
                            <input type="text" value={State} onChange={(e)=>setState(e.target.value)} className="form-control input-border" name="state"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>City</label>
                        </div>
                        <div className="row">
                            <input type="text" value={City} onChange={(e)=>setCity(e.target.value)}  className="form-control input-border" name="city"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>ZipCode</label>
                        </div>
                        <div className="row">
                            <input type="text" value={ZipCode} onChange={(e)=>setZipCode(e.target.value)}  className="form-control input-border" name="zipcode"></input>
                        </div>
                    </div>
                </div>
                <div className="row">
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

export default Profile
