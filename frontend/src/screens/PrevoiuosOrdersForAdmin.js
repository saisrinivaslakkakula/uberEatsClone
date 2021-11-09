import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearaddmenuItem, getMenuDetails, deleteMenuItemByItemID } from '../actions/menuActions'
import { getAdminOrderDetailsAction, adminEditOrderStatusAction } from '../actions/adminActions'

import * as AllIcons from 'react-icons/all'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PrevoiuosOrdersForAdmin = ({ history }) => {

    const [placed, setPlaced] = useState(true);
    const [rest_id, setRestID] = useState('');
    const [changeRequested, setChangeRequested] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [changeValue, setChangeValue] = useState('')
    //const restaurantMenu = useSelector(state => state.adminOrders)
    //const {menu,loading,error} = restaurantMenu
    const adminLoginDetails = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLoginDetails

    const adminChangeOrderStatus = useSelector(state => state.adminChangeOrderStatus)
    let { success, loading: changeLoading } = adminChangeOrderStatus

    const adminOrders = useSelector(state => state.adminOrders)
    const { adminOrders: adminOrdersRes, loading: ordersLoading, error } = adminOrders
    const dispatch = useDispatch()
    useEffect(() => {
        if (!adminInfo) {
            history.push("/business-login")
        }
        if (localStorage.getItem('restaurantInfo') === null) {
            history.push("/adminHome")
        }
        if (!adminOrdersRes && localStorage.getItem('restaurantInfo')) {
            const restDetails = localStorage.getItem('restaurantInfo')
            const restDetailsJson = JSON.parse(restDetails)
            setRestID(restDetailsJson.rest_id)
            dispatch(getAdminOrderDetailsAction(restDetailsJson._id))
        }

        //dispatch(getMenuDetails(rest_id))


    }, [adminInfo, adminOrdersRes, dispatch])


    const changeStatus = (id) => {
        /*if (window.confirm("Are you sure you want to change the status?")) {
            dispatch(adminEditOrderStatusAction(id, rest_id ,changeValue))
        }*/
        setChangeRequested(true)

    }
    const submitChangeRequest = (id) => {
        if (window.confirm("Are you sure you want to change the status?")) {
            dispatch(adminEditOrderStatusAction(id, rest_id, changeValue))
            setChangeRequested(false)
        }
    }
    return (
        <div className="container">
            {ordersLoading || changeLoading && <Loader />}
            <div className="menu-add-item-button">
                {/*deleteItemLoading && <Loader/>*/}

                {/*deleteItemError && <Message variant='danger'>{deleteItemError}</Message>*/}
            </div>
            {adminOrdersRes ?
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Order ID</th>

                            <th scope="col">Order Date</th>
                            <th scope="col">Order Total</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminOrdersRes.result.length > 0 ?
                            (
                                adminOrdersRes.result.map(x => (
                                    <tr >
                                        <td >{x._id}</td>

                                        <td>{x.order_date.substring(0, 10)}</td>
                                        <td>{x.order_total}</td>
                                        <td>
                                            {/*  <select className="form-control my-3" name="category" placeholder="Restaurant category" onChange={(e) => setChangeValue(e.target.value)}>
                                            <option value="placed" selected> placed</option>
                                            <option value="prepared" > prepared</option>
                                            <option value="deliveryInProgress" > Delivery started</option>
                                            <option value="delivered" > delivered</option>
                                            <option value="cancelled" > cancelled</option>
                                        </select>*/}
                                            {x.order_status}

                                            {/*<p> <Link to={`/editMenuItem/${encodeURI(x.order_id)}`}><AiIcons.AiFillEdit className="mx-1" /></Link> <FaIcons.FaTrashAlt style={{color:'red'}} className="mx-1" onClick={()=> handleDelete(x.item_id)}/> </p>*/}
                                        </td>
                                        {changeRequested ?
                                            <td >
                                                <div className="row">
                                                    <div className="col-8">
                                                        <select className="form-control my-3" name="category" placeholder="Restaurant category" onChange={(e) => setChangeValue(e.target.value)}>
                                                            <option value="placed" selected> placed</option>
                                                            <option value="prepared" > prepared</option>
                                                            <option value="deliveryInProgress" > Delivery started</option>
                                                            <option value="delivered" > delivered</option>
                                                            <option value="cancelled" > cancelled</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-4 py-3">
                                                        <button className="btn btn-dark" onClick={() => submitChangeRequest(x._id)}> Change</button>
                                                    </div>
                                                </div>

                                            </td>

                                            :
                                            <td >
                                                <button className="btn btn-success" onClick={() => changeStatus(x._id)}> Change</button>
                                            </td>
                                        }

                                    </tr>
                                ))
                            ) : (<h4 className="py-5">No Orders Found!</h4>)
                        }


                    </tbody>
                </table>
                :
                (<h4 className="py-5">No Orders Found!</h4>)}
        </div>
    )
}

export default PrevoiuosOrdersForAdmin
