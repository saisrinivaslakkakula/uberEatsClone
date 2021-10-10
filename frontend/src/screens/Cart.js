import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as AllIcons from 'react-icons/all'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { removeCartItem, placeOrderAction, clearCartAction } from '../actions/cartActions'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
const Cart = ({ location, history }) => {

    const [subtotal, setSubTotal] = useState(0);
    const [Total, setTotal] = useState(0);
    const cartItems = useSelector(state => state.cartItems)
    const dispatch = useDispatch()
    const { loading: addCartLoading, error: addCartError, success: addCartSuccess, cartItems: cartItemsArray } = cartItems
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector(state => state.userDetails)
    const { user, loading: userLoading, error: userLoadError } = userDetails
    const placedOrder = useSelector(state => state.placedOrder)
    const { loading: checkoutLoading, error: checkoutError, success: checkoutSuccess } = placedOrder
    const redirect = location.search ? location.search.split("=")[1] : '/login'
    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
        
            dispatch(getUserDetails('profile'))
        
        if (cartItemsArray.length > 0) {
            let SubT = 0
            for (let i = 0; i < cartItemsArray.length; i++) {
                SubT += cartItemsArray[i].item_qty * cartItemsArray[i].item_price
            }
            setSubTotal(SubT)
            setTotal((SubT + 3.2 + 6.99).toFixed(2))
        }

    }, [cartItemsArray, userInfo])

    const handleDelete = (id) => {
        dispatch(removeCartItem(id))
    }

    const checkout = () => {
        if (cartItemsArray.length > 0) {
            const today = new Date()
            const dd = today.getDate()
            const mm = today.getMonth() + 1
            const yyyy = today.getFullYear()
            const dataObject = {
                cust_id: userInfo._id,
                rest_id: cartItemsArray[0].rest_id,
                order_date: yyyy + "-" + mm + "-" + dd,
                order_status: "placed",
                items_array: cartItemsArray,
                items_total_price: Total

            }
            //console.log(dataObject)
            dispatch(placeOrderAction(dataObject))

        }
    }


    return (
        <div className="container" style={{ marginTop: '5%', marginBottom: '5%' }}>
            {addCartLoading || checkoutLoading && <Loader />}
            {cartItemsArray.length > 0 ?
                <>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItemsArray.map(x => (
                                <tr >
                                    <td scope="row">{x.item_name}</td>
                                    <td>{x.item_qty}</td>
                                    <td>{x.item_price}</td>
                                    <td>
                                        <p>  <FaIcons.FaTrashAlt style={{ color: 'red' }} className="mx-1" onClick={() => handleDelete(x.item_id)} /> </p>
                                    </td>
                                </tr>
                            ))}
                            {cartItemsArray &&
                                <tr>
                                    <td style={{ textAlign: 'right', color: '#06c167', fontWeight: 'bolder' }} colSpan="2"> Sub Total:<br></br>
                                        Tax:<br></br>
                                        Delivery Charges:
                                        <br></br>
                                        Total:
                                    </td>
                                    <td style={{ fontWeight: 'bolder' }}>
                                        ${subtotal}<br></br>
                                        $3.2<br></br>
                                        $6.99<br></br>
                                        ${Total}<br></br>
                                    </td>
                                    <td className="py-4">
                                        <button onClick={() => checkout()} className="btn btn-dark">CheckOut</button>
                                    </td>
                                </tr>
                            }

                        </tbody>

                    </table>

                    {user &&
                        <div className="row py-4">
                            Your Items will be delivered to the below Address
                            <div className="row py-4" >
                                <div className="col-md-4 p-4" style={{borderStyle:'solid'}}>
                                    <p> {user.Street}</p>
                                    <p> {user.City}</p>
                                    <p> {user.State}</p>
                                    <p> {user.Country} - {user.ZipCode}</p>
                                    <Link to="/profile"style={{color:'#06c167'}}>Change</Link>
                                </div>
                            </div>
                        </div>
                    }


                </>
                :
                checkoutSuccess ?
                    <h2>Order Placed Successfully!</h2>
                    :
                    <h5>Your Cart is sad <AllIcons.ImSad/> You can make it happy by adding the items anytime.</h5>

            }
        </div>
    )
}

export default Cart
