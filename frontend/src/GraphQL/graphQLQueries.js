const getAllRestaurantsQuery = (orderID,orderStatus)=>{
  const query = `
  query{
    getAllRestaurants{
      rest_name,
      rest_type,
      rest_desc,
      rest_menu{
        item_price,
        item_name,
        item_type,
        item_category,
        item_photo_path,
        item_description
      },
      rest_email,
      rest_phone,
      rest_address{
        srest_street,
        rest_state,
        rest_city,
        rest_country,
        rest_zipCode
      },
      rest_category,
      rest_main_photo,
      
    }
  }
  `
  return query
}

const getARestaurantByID = (rest_id)=>{
    const query = `
    query{
        getrestaurantByID(id:"${rest_id}"){
            rest_name,
            rest_type,
            rest_desc,
            rest_menu{
              item_price,
              item_name,
              item_type,
              item_category,
              item_photo_path,
              item_description
            },
            rest_email,
            rest_phone,
            rest_address{
              srest_street,
              rest_state,
              rest_city,
              rest_country,
              rest_zipCode
            },
            rest_category,
            rest_main_photo,
      }
    }
    `
    return query
  }

  const getRestaurantsByLocation = async(location)=>{
        const query = `
        query{
            getrestaurantByLocation(city:"${location}"){
                rest_name,
                rest_type,
                rest_desc,
                rest_menu{
                  item_price,
                  item_name,
                  item_type,
                  item_category,
                  item_photo_path,
                  item_description
                },
                rest_email,
                rest_phone,
                rest_address{
                  srest_street,
                  rest_state,
                  rest_city,
                  rest_country,
                  rest_zipCode
                },
                rest_category,
                rest_main_photo,
          }
        }
        `
  }

const getOrderDetailsByCustIdQuery = (cust_id) =>{
    const query = `
    query{
        getOrdersByCustID(cust_id:"${cust_id}"){
          rest_id,
          order_total,
          order_date,
          order_status,
          order_details {
            item_name
            item_qty
            item_price
          }
        
        }
              
          }
        
    `
}
export {getAllRestaurantsQuery,getARestaurantByID,getRestaurantsByLocation,getOrderDetailsByCustIdQuery
}