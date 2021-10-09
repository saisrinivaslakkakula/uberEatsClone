import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Form, Modal, Button } from 'react-bootstrap'
import { getRestaurantDetails } from '../actions/restaurantActions'
import { addCartItem } from '../actions/cartActions'
import * as allIcons from "react-icons/all"
import Loader from '../components/Loader'
import Message from '../components/Message'
const RestDetails = ({ match }) => {

    const [menuData, setMenuData] = useState(null)
    const [showModal, setShowModal] = useState(null)
    const [cartQty, setCartQty] = useState(0)
    const [addSuccess, setAddSuccess] = useState(false)
    const dispatch = useDispatch()
    const restaurantDetails = useSelector(state => state.restaurantDetails)
    const { loading, error, restaurantDetails: restaurantDetailsObject } = restaurantDetails
    const cartItems = useSelector(state => state.cartItems)
    const { loading: addCartLoading, error: addCartError, success: addCartSuccess, cartItems: cartItemsObject } = cartItems
    useEffect(() => {

        dispatch(getRestaurantDetails(match.params.id))

    }, [dispatch, match])

    const handleClick = (x) => {
        setShowModal(!showModal)
        setMenuData(x)
        

    }

    const handleClose = () => {
        setShowModal(false)
        setCartQty(0)
        setAddSuccess(false)

    }

    const incrementCartQty = () => {
        let currentVal = cartQty;
        currentVal = currentVal + 1;
        setCartQty(currentVal)

    }
    const decrementCartQty = () => {
        let currentVal = cartQty;
        currentVal = currentVal - 1;
        if (cartQty > 0)
            setCartQty(currentVal)
    }

    const handleAddtoCart = () => {
        const data = {
            ...menuData,
            item_qty: cartQty
        }
        dispatch(addCartItem(data))
        setAddSuccess(true)
    }
    return (
        <div className="container-fluid">
            {loading && <Loader></Loader>}
            {error && <Message variant="danger"> {error}</Message>}
            
            {restaurantDetailsObject
                ?
                <>
                {restaurantDetailsObject.rest_main_photo ? 
                    <img className="rest-details" src={restaurantDetailsObject.rest_main_photo}></img>
                :
                    <img className="rest-details" src="/images/admin_home_restaurant_card_image.jpeg"></img>
                }
               
                    <div className="row my-4">
                        <h1 style={{ textTransform: 'capitalize' }}>{restaurantDetailsObject.rest_name}</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <p>{restaurantDetailsObject.rest_desc}</p>
                        </div>
                        <div className="col-md-4 p-3" >
                            <p style={{backgroundColor:"#f0f0f0", width:'80%'} } className="p-3">Delivers between 10 AM - 11 PM</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-4" >
                            <blockquote><h4>Top Picks</h4></blockquote>
                        </div>
                    </div>
                    <div className="row">
                        {addCartError && <Message variant="danger">{addCartError}</Message>}
                        {
                            restaurantDetailsObject.menu.map(
                                x => <div className="col-md-4 my-2">
                                    <div className="menuItemCard" onClick={() => handleClick(x)}>
                                        <div className="row">
                                            <div className="col-7 py-2 mx-2">
                                                <h5> {x.item_name}</h5>
                                                <p> {x.item_desc}</p>
                                                <h4> ${x.item_price}</h4>
                                            </div>
                                            <div className="col-4 py-2">
                                                <img src={x.item_photo_path}></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                    {showModal &&
                        <Modal show={showModal}>
                            <Modal.Header>
                                <p style={{ marginLeft: '95%' }}><allIcons.GrFormClose onClick={handleClose}></allIcons.GrFormClose></p>

                            </Modal.Header>
                            <Modal.Body>
                                <div className="container">
                                    <div className="row menuItemModal">
                                        <div className="col-7">
                                            <h4>{menuData.item_name}</h4>
                                            <p>{menuData.item_desc}</p>
                                            <div className="row">
                                                <div className="col-3">
                                                    <button onClick={decrementCartQty}>-</button>
                                                </div>
                                                <div className="col-3">
                                                    <input type="text" value={cartQty} />
                                                </div>
                                                <div className="col-3">
                                                    <button onClick={incrementCartQty}>+</button>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <img src={menuData.item_photo_path}></img>
                                        </div>
                                    </div>


                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                {
                                    addSuccess ?
                                    <>
                                    <p style={{color:'green',marginRight:'20%'}}> Item Added to the cart Successfully</p>
                                    <Button variant="dark" onClick={handleClose}>
                                                Close
                                    </Button>
                                    </>
                                     :
                                        <>
                                            <Button variant="dark" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            {cartQty > 0 &&
                                                <Button variant="success" onClick={handleAddtoCart}>
                                                    Add to Cart
                                                </Button>
                                            }
                                        </>
                                }




                            </Modal.Footer>
                        </Modal>
                    }

                </>

                :
                <p>Not found</p>
            }

        </div>
    )
}

export default RestDetails
