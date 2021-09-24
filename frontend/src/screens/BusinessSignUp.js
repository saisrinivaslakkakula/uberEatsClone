import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/adminActions'
import axios from 'axios'

const BusinessSignUp = ({ location, history }) => {

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
    const [Result, setResult] = useState(null)
    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [src, selectPhoto] = useState(null) // select Photo as blob
    const [photoFile, selectPhotoFile] = useState(null) // select photo as file to get the name
    const redirect = location.search ? location.search.split("=")[1] : '/adminHome'
    const [errorMessage, setErrorMessage] = useState(null)
    const [countriesData, setCountriesData] = useState(null)
    const dispatch = useDispatch()
    const adminRegister = useSelector(state => state.adminRegister)
    const { userInfo, loading, error } = adminRegister
    const [blobResult, setBlobResult] = useState(null)
    const [crop, setCrop] = useState({
        aspect: 1 / 1, width: 125,
        height: 125,

    });

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

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
        if (password !== confirmPassword)
            setMessage("Passwords Do Not Match")
        else {
            dispatch(register(firstName, lastName, email, password, phone, image))
        }


    }

    return (
        <div>
            <div className="login-container">
                <div className="logo">
                    <h1>Uber <span>Eats</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"><h2>Lets get started</h2></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                    <form className="form-center" onSubmit={submitHandler}>

                        {loading && <Loader></Loader>}
                        <div className="form-group">
                            <input type="text" name="firstName" className="form-control pad" required onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"></input>
                            <input type="text" name="lastName" className="form-control pad" required onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"></input>
                            <input type="email" name="email" className="form-control pad" required onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email"></input>
                            <input type="password" name="password" className="form-control pad" required onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                            <input type="password" name="confirmPassword" className="form-control pad" required onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"></input>
                            <input type="tel" name="phone" className="form-control pad" required onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number"></input>
                            <p>
                                Upload Photo &nbsp;
                                <input type="file" accept="image/*" className="form-control-file" placeholder="Upload Photo" onChange={handleFileUpload} />
                            </p>
                            {uploading && <Loader />}
                            <div class="d-grid gap-2">
                                {message && <Message variant='danger'>{message}</Message>}
                                {error && <Message variant='danger'>{error}</Message>}
                                <button class="btn btn-secondary" type="submit">Sign Up</button>
                            </div>
                            <p> Already Existing Restauraunt Owner? <span>
                                <Link to="/login">Sign In</Link>
                            </span> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BusinessSignUp
