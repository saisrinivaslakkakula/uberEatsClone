import React from 'react'
import { Link } from 'react-router-dom'
const SignUpScreen = () => {
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
                    <form className="form-center">
                        <div className="form-group">
                        <input type="text" className="form-control pad" required placeholder="First Name"></input>
                        <input type="text" className="form-control pad" required placeholder="Last Name"></input>
                            <input type="email" className="form-control pad" required placeholder="Enter Your Email"></input>
                            <input type="password" className="form-control pad" required placeholder="Password"></input>
                            <input type="password" className="form-control pad" required placeholder="Confirm Password"></input>
                            <input type="tel" className="form-control pad" required placeholder="Phone Number"></input>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-secondary" type="button">Sign Up</button>
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
