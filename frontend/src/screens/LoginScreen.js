import React from 'react'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
    return (
        <div>
            <div className="login-container">
                <div className="logo">
                    <h1>Uber <span>Eats</span></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"><h2>Welcome back</h2></div>
            </div>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                    <form className="form-center">
                        <div className="form-group">
                            <label> Sign in with your email address</label>
                            <input type="email" className="form-control pad" required placeholder="Enter Your Email"></input>
                            <input type="password" className="form-control pad" required placeholder="Password"></input>
                            <div class="d-grid gap-2">
                                <button class="btn btn-secondary" type="button">Sign In</button>
                            </div>
                            <p> New to Uber Eats? <span> 
                                <Link to="/signup"><a>Create an account</a></Link>
                                </span> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginScreen
