import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import * as allIcons from "react-icons/all"
const ReceiptModal = ({ data, token }) => {
    const [orderData, setOrderData] = useState(null)
    const [showModal, setShowModal] = useState(true)
    useEffect(() => {

        getOrderDetails(data.rest_id, token)

    }, [])

    const getOrderDetails = async (id, token) => {
        const rest_id = id
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }


        const { data: orderDetails } = await axios.get(`/api/order/getOrderDetailsByOrderID/${data.order_id}`, config)
        setOrderData(orderDetails.result)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <div>
            
                <Modal show={showModal}>
                    <Modal.Header>
                        <p style={{ marginLeft: '95%' }}><allIcons.GrFormClose onClick={handleClose}></allIcons.GrFormClose></p>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row menuItemModal">
                                <div className="col-7">
                                    <h4>asdas</h4>
                                    <p>asds</p>
                                    <div className="row">
                                        sdasd


                                    </div>
                                </div>

                            </div>


                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={()=>handleClose()}>
                            Close
                        </Button>




                    </Modal.Footer>
                </Modal>
            

        </div>
    )
}

export default ReceiptModal
