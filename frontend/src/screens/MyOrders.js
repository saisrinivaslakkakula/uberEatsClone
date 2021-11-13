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
import ReactPaginate from 'react-paginate';
const MyOrders = ({ history, location }) => {
    const [myOrders, setMyOrders] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [orderData, setOrderData] = useState([])
    const [filterValue, setFilterValue] = useState('placed')
    //const [myOrders, setMyOrders] = useState([])
    const [pageNumber,setPageNumber] = useState(1)
    const [ordersPerPage,setOrdersPerPage] = useState(3)
    //const ordersPerPage = 4
    const pagesVisited = pageNumber * ordersPerPage
   
    /*const  displayOrders = myOrders.slice(pagesVisited, pagesVisited+ordersPerPage).map(
        (order) =>{
            <p>{order._id}</p>
        }
        )*/
    const [currentItems, setCurrentItems] = useState(null);
    
    const [itemOffset, setItemOffset] = useState(0);
    const redirect = location.search ? location.search.split("=")[1] : '/login'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const allRestaurantsInfo = useSelector(state => state.allRestaurants)
    const { loading, error, allRestaurants } = allRestaurantsInfo
    //setPageCount(Math.ceil(myOrders.length / ordersPerPage));
    const pageCount = Math.ceil(myOrders.length/ordersPerPage)
    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
        getOrders()

        const itemsPerPage = 5
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(myOrders.slice(itemOffset, endOffset));
        console.log(currentItems)
        


    }, [history, userInfo, redirect])

    const showModal = async (x) => {

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
           setMyOrders(data)
            setCurrentItems(data)
           console.log(myOrders)
           //console.log(currentItems)

        }

    }

    const setChangeValue = (value) => {
        setFilterValue(value)
    }
    const handlePageClick = ({selected}) => {
        setPageNumber(selected)

    }
    const cancelOrder = async(x)=>{
        
        //alert(x._id)
        const result = await axios.put(`/api/order/changeOrderStatus/${x._id}/cancelled`)
        if(result.data.results == "Success"){
            window.location.reload(false);
        }
    }

    return (
        <div className="container" style={{ marginTop: '5%', marginBottom: '5%' }}>
            <div className="menu-add-item-button">
                <p className="py-4 mx-5">Filter By Status</p>
                <select style={{ width: '30%' }} className="form-control my-3" name="category" placeholder="Restaurant category" onChange={(e) => setChangeValue(e.target.value)}>
                    <option value="placed" selected> placed</option>
                    <option value="prepared" > prepared</option>
                    <option value="deliveryInProgress" > Delivery started</option>
                    <option value="delivered" > delivered</option>
                    <option value="cancelled" > cancelled</option>
                </select>
                <p className="py-4 mx-5">Orders Per Page</p>
                <select style={{ width: '30%' }} className="form-control my-3" name="category" placeholder="Restaurant category" onChange={(e) => setOrdersPerPage(e.target.value)}>
                    <option value="3" selected> 3</option>
                    <option value="5" > 5</option>
                    <option value="10" > 10</option>
                    
                </select>
            </div>
            
            {myOrders.length > 0 ?
                <div>
                    {/*currentItems.filter(x => x.order_status === filterValue).map((x) => (
                        <>
                        
                        <div className="row">
                                <div className="col-md-3" style={{ textTransform: 'capitalize' }}>
                                    {allRestaurants && allRestaurants.result.find(y => y._id === x.rest_id) && allRestaurants.result.find(y => y._id === x.rest_id).rest_name}
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
                    )


                    )*/}
                    {/*myOrders.filter(x => x.order_status === filterValue).slice(pagesVisited, pagesVisited+ordersPerPage).map(
                        order => {
                            <p> hi</p>
                        }
                    )*/}
                    <div>
                    <p>{myOrders.filter(x => x.order_status === filterValue).slice(pagesVisited, pagesVisited+ordersPerPage).map(
                        x => 
                        <div>
                            <div className="row">
                                <div className="col-md-3" style={{ textTransform: 'capitalize' }}>
                                    {allRestaurants && allRestaurants.result.find(y => y._id === x.rest_id) && allRestaurants.result.find(y => y._id === x.rest_id).rest_name}
                                </div>
                                <div className="col-md-3">
                                    {x.order_date.substring(0, 10)}
                                </div>
                                <div className="col-md-3">
                                    ${x.order_total} <br />
                                    <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => showModal(x)}> View Receipt</p>
                                </div>
                                <div className="col-md-3">
                                    {x.order_status} &nbsp;
                                    {x.order_status==="placed"&&<button className="btn btn-success" onClick={() => cancelOrder(x)}>Cancel Order</button>}

                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    )}</p>
                    <ReactPaginate className="pagination"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    
                    />
                    </div>
                    
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
                <div>
                    <h2>You don't have any previous orders</h2>

                </div>


            }
        </div>
    )
}

export default MyOrders
