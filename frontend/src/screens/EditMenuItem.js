import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMenuItemByItemID,updateItem } from '../actions/menuActions'
import { Link } from 'react-router-dom'

const EditMenuItem = ({ history, match,location }) => {

    const dispatch = useDispatch()
    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin
    const menuItemDetail = useSelector(state => state.menuItemDetail)
    const { loading, error, menuItemDetails } = menuItemDetail
    const updateMenuItem = useSelector(state => state.updateMenuItem)
    const { loading:updateItemLoading, error:updateItemError, success } = updateMenuItem
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState(0)
    const [itemType, setItemType] = useState('')
    const [itemCategory, setItemCategory] = useState('')
    const [image, setItemImage] = useState('')
    const [itemDesc, setItemDesc] = useState('')
    const [price, setPrice] = useState('')
    useEffect(() => {

        if (!adminInfo) {
            history.push('/business-login')
        }
        if (!menuItemDetails){
            
            dispatch(getMenuItemByItemID(encodeURI(match.params.id)))
            
        }
            
        else{
            
            setItemName(menuItemDetails.item_name)
            setItemType(menuItemDetails.item_type)
            setItemCategory(menuItemDetails.item_category)
            setItemImage(menuItemDetails.item_photo_path)
            setItemDesc(menuItemDetails.item_desc)
            setItemPrice(menuItemDetails.item_price)
            
        }
        

    }, [dispatch, history, adminInfo, menuItemDetails])

    const submitHandler= (e)=>{
        //
        e.preventDefault()
        dispatch(updateItem(match.params.id,itemName,itemPrice,itemCategory,itemType,image,itemDesc))
    }
    return (
        <div className="container update-profile">
            {success && <Message variant="success"> Item Details Updated Successfully.</Message>}
            {loading&&<Loader></Loader>}
            {error&& <Message variant='danger'>{error}</Message>}
            <form className="form-center" onSubmit={submitHandler}>
                <div className="row py-2">
                    <div className="col-md-3">
                        {image ?
                            <img className="userImg-enlarged" src={image}></img>
                            :
                            <img className="userImg-enlarged" src="/images/defaultuser.jpeg"></img>
                        }

                    </div>
                    <div className="col-md-9">
                        <div className="row py-2">
                            <div class="col-md-2">
                                <label>Item Name </label>
                            </div>
                            <div class="col-md-6">
                                <input type="text" value={itemName} className="form-control" name="firstName" onChange={(e) => setItemName(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div class="col-md-2">
                                <label>Price </label>
                            </div>
                            <div class="col-md-6">
                                <input type="number" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="form-control" name="price"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 py-2">
                                <button className="btn btn-dark">change Photo</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label>Item Category</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} className="form-control" name="firstName"></input>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label>Item Type</label>
                    </div>
                    <div className="col-md-4">
                    <input type="text" value={itemType} onChange={(e) => setItemType(e.target.value)} className="form-control" name="firstName"></input>
                    </div>

                </div>
                <div className="row py-3">
                    <div className="col-md-3">
                        <label>Description</label>
                    </div>
                    <div className="col-md-4">
                        <textarea type="text" value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} className="form-control" name="firstName"></textarea>
                    </div>


                </div>

                <div className="row">
                    {/*success && <Message variant='success'>Item Details Update Success!</Message>*/}
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">

                        <button type="submit" className="btn btn-dark"> Update Item</button>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default EditMenuItem
