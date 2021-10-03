import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="logo">
                            <h2>Uber <span>Eats</span></h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <ul className="nobullets">
                            <li>
                                <a href="#"> Get Help</a>
                            </li>
                            <li>
                                <a href="#">  Buy gift cards</a>
                            </li>
                            <li>
                                <a href="#">  Add your restraunt</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul className="nobullets">
                            <li>
                                <a href="#"> Restaraunts near me</a>
                            </li>
                            <li>
                                <a href="#">  View all cities</a>
                            </li>
                            <li>
                                <a href="#">  About Uber Eats</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-3"><a href="#">  Privacy Policy</a></div>
                            <div className="col-md-3"> <a href="#">Terms</a></div>
                            <div className="col-md-3"><a href="#">Pricing</a></div>
                            <div className="col-md-3"><a href="#">Do not Sell my Info</a></div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <p> This Web Application is a cloned version of Uber Eats, developed as part of School project. The Design Copyrights belong to Uber Technologies Inc. &copy; </p>
                    
                </div>

            </div>
        </footer>
    )
}

export default Footer
