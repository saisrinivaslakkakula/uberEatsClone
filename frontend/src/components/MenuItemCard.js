import React, { useState, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'



const MenuItemCard = ({data}) => {

    const [menuClicked, setMenuClicked] = useState(false)
    useEffect(() => {
        
    }, [menuClicked])
    
    
    const clickHandler = () =>{
        setMenuClicked(!menuClicked)
    }
    return (
        <div className="container">
            <div className="menuItemCard">
                <div className="row" onClick={()=>clickHandler()}>
                    <div className="col-7 py-2 mx-2">
                        <h5> {data.item_name}</h5>
                        <p> {data.item_desc}</p>
                        <h4> $2.5</h4>
                        {menuClicked&& <p> Clicked!!</p>}
                    </div>
                    <div className="col-4 py-2">
                        <img src={data.item_photo_path}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuItemCard
