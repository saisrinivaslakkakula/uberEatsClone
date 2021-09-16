import React from 'react'

const Profile = () => {
    return (
        <div className="container update-profile">

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
                            <input type="email" className="form-control" name="firstName"></input>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div class="col-md-2">
                            <label>Phone </label>
                        </div>
                        <div class="col-md-6">
                            <input type="tel" className="form-control" name="lastName"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 py-2">
                            <button className="btn btn-dark">change Photo</button>
                        </div>

                    </div>
                </div>
            </div>


            <form className="form-center">
                <div className="row">
                    <div className="col-md-3">
                        <label>Full Name</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" name="firstName"></input>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" name="lastName"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label>Date of Birth</label>
                    </div>
                    <div className="col-md-4">
                        <input type="date" className="form-control" name="dob"></input>
                    </div>
                </div>
                <h4> Address</h4>
                <div className="row">
                    <div className="col-md-3">
                        <label>Line 1</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="addressLine1"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label>Line 2</label>
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" name="addressLine2"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="row">
                            <label>Country</label>
                        </div>
                        <div className="row">
                            <input type="text" className="form-control input-border" name="country"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>State</label>
                        </div>
                        <div className="row">
                            <input type="text" className="form-control input-border" name="state"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>City</label>
                        </div>
                        <div className="row">
                            <input type="text" className="form-control input-border" name="city"></input>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <label>ZipCode</label>
                        </div>
                        <div className="row">
                            <input type="text" className="form-control input-border" name="zipcode"></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary"> SUBMIT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile
