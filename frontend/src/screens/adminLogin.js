import React, {useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/adminActions'

const AdminLogin = ({location,history}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const redirect = location.search? location.search.split("=")[1]:'/adminHome'
    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const {adminInfo,loading,error} = adminLogin
    
    useEffect(() =>{
        if(adminInfo){
            history.push(redirect)
        }
    },[history,adminInfo,redirect])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))

    }


    return (
        <div>
            <div>
            <div className="login-container">
                <div className="logo">
                    <h1>Uber <span>Eats</span> | Business</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"><h2>Welcome back</h2></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                    <form className="form-center" onSubmit={submitHandler}>
                        <div className="form-group">
                            <label> Sign in with your email address</label>
                            {error && <Message variant="danger"> {error}</Message>}
                            {loading&& <Loader></Loader>}
                            <input type="email" className="form-control pad" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter Your Email"></input>
                            <input type="password" name="password" className="form-control pad" vlaue={password} onChange={(e)=>setPassword(e.target.value)}   required placeholder="Password"></input>
                            <div class="d-grid gap-2">
                                <button  class="btn btn-secondary" type="submit">Sign In</button>
                            </div>
                            <p> New to Uber Eats? <span> 
                                <Link to="/business-signup"><a>Create an account</a></Link>
                                </span> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AdminLogin
