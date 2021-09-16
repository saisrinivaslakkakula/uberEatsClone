import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
const SignUpScreen = ({ location, history }) => {
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
    const redirect = location.search ? location.search.split("=")[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        alert("hi")
        if (password !== confirmPassword)
            setMessage("Passwords Do Not Match")
        dispatch(register(firstName,lastName,email, password,phone,Street,City,State,Country,ZipCode))

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
                    <form className="form-center" onSubmit = {submitHandler}>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader></Loader>}
                        <div className="form-group">
                            <input type="text" name="firstName" className="form-control pad" required onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name"></input>
                            <input type="text" name="lastName" className="form-control pad" required onChange={(e)=>setLastName(e.target.value)}  placeholder="Last Name"></input>
                            <input type="email" name="email" className="form-control pad" required onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Your Email"></input>
                            <input type="password" name="password" className="form-control pad" required  onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
                            <input type="password" name="confirmPassword" className="form-control pad" required onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder="Confirm Password"></input>
                            <input type="tel" name="phone" className="form-control pad" required  onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number"></input>
                            <input type="text" name="Street" className="form-control pad" required onChange={(e)=>setStreet(e.target.value)}  placeholder="Street Name, Appt/Suite number"></input>
                            <input type="text" name="City" className="form-control pad" required onChange={(e)=>setCity(e.target.value)} placeholder="City"></input>
                            <input type="text" name="State" className="form-control pad" required onChange={(e)=>setState(e.target.value)}  placeholder="State"></input>
                            <input type="text" name="Country" className="form-control pad" required  onChange={(e)=>setCountry(e.target.value)} placeholder="Country"></input>
                            <input type="text" name="ZipCode" className="form-control pad" required onChange={(e)=>setZipCode(e.target.value)}  placeholder="ZipCode"></input>
                            <div class="d-grid gap-2">
                                <button class="btn btn-secondary" type="submit">Sign Up</button>
                            </div>
                            <p> Already User? <span>
                                <Link to="/login"><a> Sign In</a></Link>
                            </span> </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignUpScreen
