import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { removeCartItem } from '../actions/cartActions'
const Cart = () => {

    const [subtotal, setSubTotal] = useState(0);
    const [Total, setTotal] = useState(0);
    const cartItems = useSelector(state => state.cartItems)
    const dispatch = useDispatch()
    const { loading: addCartLoading, error: addCartError, success: addCartSuccess, cartItems: cartItemsArray } = cartItems
    useEffect(() => {
        
        if(cartItemsArray.length>0){
            let SubT=0
            for (let i=0;i<cartItemsArray.length;i++){
                SubT += cartItemsArray[i].item_qty * cartItemsArray[i].item_price
            }
            setSubTotal(SubT)
            setTotal((SubT+3.2+6.99).toFixed(2))
        }
            
    }, [cartItemsArray])

    const handleDelete = (id) => {
        dispatch(removeCartItem(id))
    }

   

    return (
        <div className="container" style={{ marginTop: '5%', marginBottom: '5%' }}>
            {cartItemsArray.length > 0 ?

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
                                <td style={{ textAlign: 'right',color:'#06c167', fontWeight:'bolder'}} colSpan="2"> Sub Total:<br></br>
                                    Tax:<br></br>
                                    Delivery Charges:
                                    <br></br>
                                    Total:
                                </td>
                                <td style={{  fontWeight:'bolder'}}>
                                    ${subtotal}<br></br>
                                    $3.2<br></br>
                                    $6.99<br></br>
                                    ${Total}<br></br>
                                </td>
                                <td className="py-4">
                                    <button className="btn btn-dark">CheckOut</button>
                                </td>
                            </tr>
                        }

                    </tbody>

                </table>
                :
                <h2>Cart is empty.</h2>
            }
        </div>
    )
}

export default Cart
