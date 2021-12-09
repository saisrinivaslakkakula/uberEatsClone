const addUserQuery = (firstName,lastName,email, password,phone,Street,City,State,Country,ZipCode,image) =>{
    const queryString = `
    mutation{
        addUser(userObj:{
          firstName:"${firstName}",
          lastName:"${lastName}",
          email:"${email}",
          password:"${password}",
          phone:"${phone}",
          address:{
            street:"${Street}",
            city:"${City}",
            state:"${State}",
            country:"${Country}",
            zipCode:"${ZipCode}"
            
          },
          photo_path:"${image}"
        }){
          _id,
          firstName,
          lastName,
          token
        }
      }
    `
    return(queryString)
}

const addAdminQuery = (firstName,lastName,email, password,phone,image) =>{
  const queryString = `
  mutation{
      addAdmin(adminObj:{
        firstName:"${firstName}",
        lastName:"${lastName}",
        email:"${email}",
        password:"${password}",
        phone:"${phone}",
        photo_path:"${image}"
      }){
        _id,
        firstName,
        lastName,
        token
      }
    }
  `
  return(queryString)
}

const addRestaurantQuery = (rest_name, rest_type, rest_category, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode,rest_open_day_from,rest_open_day_to,rest_open_time_from,rest_open_time_to,rest_desc,rest_main_photo,admId,checked)=>{

  const queryString = `
  mutation{
    addRestaurant(restaurantObj:{
      rest_name:"${rest_name}",
  rest_email:"${rest_email}",
  rest_phone:"${rest_phone}",
      rest_address:{

        rest_street:"${rest_street}", 
        rest_city:"${rest_city}", 
        rest_state:"${rest_state}", 
        rest_country:"${rest_country}", 
        rest_zipCode:"${rest_zipcode}"
        
      }
  
  rest_type:"${rest_type}",
  rest_category:"${rest_category}",
  rest_open_day_from:"${rest_open_day_from}",
  rest_open_day_to:"${rest_open_day_to}",
  rest_open_time_from:"${rest_open_time_from}",
  rest_open_time_to:"${rest_open_time_to}",
  rest_desc:"${rest_desc}",
  rest_main_photo:"${rest_main_photo}"
  adminId:"${admId}"
    }){
  _id,
                      rest_name,
                      rest_email,
                      rest_phone,
                      rest_type,
                      rest_category,
                      rest_open_day_from,
                      rest_open_day_to,
                      rest_open_time_from,
                      rest_open_time_to,
                      rest_main_photo,
                      adminId,
                      rest_desc
}
  }
  `
return queryString
}

const addOrderquery = (dataObj) =>{
  const {cust_id,rest_id,order_date,order_status,items_array,items_total_price} = dataObj
  const stringified = JSON.stringify(items_array)
  console.log(items_array)
  const query = `mutation{
    addOrder(orderObj:{
      cust_id:"${cust_id}",
      rest_id:"${rest_id}",
      order_status:"${order_status}",
      order_total:${items_total_price},
      order_details:${stringified}
    }){
  message
}
  }
  
  `
  return query

}

const updateOrderQuery = (orderID,orderStatus)=>{
  const query = `
  mutation{
    updateOrder(orderID:"${orderID}",orderStatus:"${orderStatus}"){
  message
}
  }
  `
  return query
}
export {addUserQuery,addAdminQuery,addRestaurantQuery,addOrderquery,updateOrderQuery
}