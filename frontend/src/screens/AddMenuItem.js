import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { addmenuItem } from '../actions/menuActions'
import {getRestaurantDetailsforAdmin} from '../actions/restaurantActions'
const AddMenuItem = ({ history, location }) => {
    const [item_name, setItemName] = useState('')
    const [item_category, setItemCategory] = useState('')
    const [item_type, setItemType] = useState('')
    const [item_desc, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [item_photo_path, setPhotoPath] = useState(null) // select Photo as blob
    const [message, setMessage] = useState(null) // select photo as file to get the name
    const redirect = location.search ? location.search.split("=")[1] : '/business-login'
    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo, restaurantInfo } = adminLogin
    const restaurantInfoRes = useSelector(state => state.restaurantDetails)
    const {restaurantDetails} = restaurantInfoRes
    const [rest_id, setRestID] = useState('')
    const addMenuState = useSelector(state => state.restaurantMenuAdd)
    const {loading,error,menuInfo} = addMenuState
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
            setPhotoPath(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addmenuItem(rest_id, item_name, item_category, item_type, item_photo_path, item_desc))
        //
    }

    useEffect(() => {
        if (!adminInfo) {
            history.push(redirect)
        }
        if(!restaurantDetails) {
            dispatch(getRestaurantDetailsforAdmin(adminInfo._id))
        }
        else{
                setRestID(restaurantDetails.rest_id)
        }
        


    }, [history, adminInfo, restaurantDetails, redirect])
    return (
        <div className="container">

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="login-container">
                        <div className="logo">
                            <h1>Uber <span>Eats</span> | Business</h1>
                            <h2 className="py-3">Add your Food Item</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <form className="form-center" onSubmit={submitHandler}>

                        { loading && <Loader></Loader> }
                        <div className="form-group">
                            <input type="text" name="itemName" className="form-control pad" required onChange={(e) => setItemName(e.target.value)} placeholder="Item Name"></input>
                            <select className="form-control my-3" name="item_category" placeholder="Category" onChange={(e) => setItemCategory(e.target.value)}>
                                <option>
                                    Select Item Category
                                </option>
                                <option option="Appetizer"> Appetizer</option>
                                <option option="Salad"> Salad</option>
                                <option option="Main Course"> Main Course</option>
                                <option option="Dessert"> Dessert</option>
                                <option option="Baverage"> Baverage</option>
                                <option option="Other"> Other</option>
                            </select>
                            <select className="form-control my-3" name="item_type" placeholder="Type" onChange={(e) => setItemType(e.target.value)}>
                                <option>
                                    Select Item Type
                                </option>
                                <option option="Veg"> Veg</option>
                                <option option="Non Veg"> Non Veg</option>
                                <option option="Vegan"> Vegan</option>
                            </select>

                            <p>
                                Upload Photo &nbsp;
                                <input type="file" required accept="image/*" className="form-control-file" placeholder="Upload Photo" onChange={handleFileUpload} />
                            </p>

                            <textarea className="form-control" placeholder="Describe the about the dish and it's ingredients" rows={5} onChange={(e) => setDescription(e.target.value)}></textarea>
                            {uploading && <Loader />}
                            <div class="d-grid gap-2 py-3">
                                {menuInfo ?
                                (
                                <>
                                <Message variant='success'>Item Successfully Added to the Menu.</Message>
                                <Link to="/manageMenu"><button class="btn btn-success" >Back</button></Link>
                                </>
                                )
                                : 
                                (<button class="btn btn-dark" type="submit">Add item</button>)
                                }
                                { error && 
                                (
                                   <>
                                    <Message variant='danger'>{error}</Message> 
                                    <button class="btn btn-dark" type="submit">Add item</button>
                                    </>
                                )
                               
                                }
                                
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMenuItem
