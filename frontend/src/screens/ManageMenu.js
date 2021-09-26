import React from 'react'
import { Link } from 'react-router-dom'
const ManageMenu = () => {
    return (
        <div className="container">
            <div className="menu-add-item-button">
                <p><Link to="/addMenuItem"><button className="btn btn-success"><b>+ Add Menu Item</b></button></Link></p>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ManageMenu
