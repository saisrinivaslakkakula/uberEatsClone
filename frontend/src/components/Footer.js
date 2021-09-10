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


            </div>
        </footer>
    )
}

export default Footer
