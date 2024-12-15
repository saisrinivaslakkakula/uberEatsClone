import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { BiZoomIn } from 'react-icons/bi'
import ReceiptModal from '../components/ReceiptModal'
import { Modal, Button } from 'react-bootstrap'
import * as allIcons from "react-icons/all"
const MyOrders = ({ history, location }) => {
    const [myOrders, setMyOrders] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [orderData, setOrderData] = useState([])
    const[filterValue,setFilterValue] = useState('placed')
    //const [myOrders, setMyOrders] = useState([])
    const redirect = location.search ? location.search.split("=")[1] : '/login'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const allRestaurantsInfo = useSelector(state => state.allRestaurants)
    const { loading, error, allRestaurants } = allRestaurantsInfo
    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
        getOrders()


    }, [history, userInfo, redirect])

    const showModal = async (x) => {
       /* const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }


        const { data: orderDetails } = await axios.get(`/api/order/getOrderDetailsByOrderID/${x.order_id}`, config)
        const dataObj = {
            order_id: x.order_id,
            cust_id: x.cust_id,
            rest_id: x.rest_id,
            order_date: x.order_date,
            order_status: x.order_status,
            order_total: x.order_total,
            order_details: orderDetails.result

        }
        //console.log(dataObj)*/
        console.log(x)
        setOrderData(x)
        
        setModalShow(true)
    }

    const handleClose = () => {
        setModalShow(false)
    }
    const getOrders = async () => {
        if (userInfo) {
            const cust_id = userInfo._id
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }
            const { data } = await axios.get(`/api/order/getOrderByCustomer/${cust_id}`, config)
            console.log(data)
            setMyOrders(data.result)
        }



    }

    const setChangeValue = (value) =>{
        setFilterValue(value)
    }
    return (
        <div className="container" style={{ marginTop: '5%', marginBottom: '5%' }}>
            <div className="menu-add-item-button">
                <p className="py-4 mx-5">Filter By Status</p>
                <select style={{width:'30%'}}className="form-control my-3" name="category" placeholder="Restaurant category" onChange={(e) => setChangeValue(e.target.value)}>
                    <option value="placed" selected> placed</option>
                    <option value="prepared" > prepared</option>
                    <option value="deliveryInProgress" > Delivery started</option>
                    <option value="delivered" > delivered</option>
                    <option value="cancelled" > cancelled</option>
                </select>
            </div>
            {myOrders.length > 0 ?
                <div>
                    {myOrders.filter(x=>x.order_status === filterValue).map((x) => (
                        <>
                            <div className="row">
                                <div className="col-md-3" style={{ textTransform: 'capitalize' }}>
                                    {allRestaurants && allRestaurants.result.find(y => y._id === x._id) && allRestaurants.result.find(y => y._id === x._id).rest_name}
                                </div>
                                <div className="col-md-3">
                                    {x.order_date.substring(0, 10)}
                                </div>
                                <div className="col-md-3">
                                    ${x.order_total} <br />
                                    <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => showModal(x)}> View Receipt</p>
                                </div>
                                <div className="col-md-3">
                                    {x.order_status}

                                </div>
                            </div>
                            <hr></hr>
                        </>
                    ))}
                    {(modalShow) &&
                        <>
                            <Modal show={modalShow}>
                                <Modal.Header>
                                    <h3> Receipt</h3>
                                    <p style={{ marginLeft: '45%' }}><allIcons.GrFormClose onClick={() => handleClose}></allIcons.GrFormClose></p>

                                </Modal.Header>
                                <Modal.Body>
                                    {orderData &&
                                        <div className="container">
                                            <div className="row menuItemModal">
                                                <div className="col-7">
                                                    <div className="row">
                                                        {orderData.order_details.map(x => <p>{x.item_name}  ({x.item_qty})</p>)}
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <p>Total: ${orderData.order_total}</p>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    }

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="dark" onClick={() => handleClose()}>
                                        Close
                                    </Button>




                                </Modal.Footer>
                            </Modal>
                        </>

                    }
                </div>
                :

                <h2>You don't have any previous orders</h2>

            }
        </div>
    )
}

export default MyOrders
