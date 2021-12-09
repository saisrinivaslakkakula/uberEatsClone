Schema = `
  input user {
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:String,
    address:address,
    photo_path:String,
  },
  input admin {
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:String,
    photo_path:String,
  },

  type userResponse {
    _id: String,
    firstName: String,
    lastName: String,
    token: String,
  },
  type adminResponse {
    _id: String,
    firstName: String,
    lastName: String,
    token: String,
  },

  input address{
    street:String,
    city:String,
    state:String,
    country:String,
    zipCode:String
  },

  type addressResp{
    street:String,
    city:String,
    state:String,
    country:String,
    zipCode:String
  },

  input rest_address{
    rest_street:String,
    rest_city:String,
    rest_state:String,
    rest_country:String,
    rest_zipCode:String
  },

  type rest_addressResp{
    srest_street:String,
    rest_city:String,
    rest_state:String,
    rest_country:String,
    rest_zipCode:String
  },


  input restaurant{
    rest_name:String,
    rest_email:String,
    rest_phone:String,
    rest_address:rest_address,
    rest_type:String,
    rest_category:String,
    rest_open_day_from:String,
    rest_open_day_to:String,
    rest_open_time_from:String,
    rest_open_time_to:String,
    rest_main_photo:String,
    adminId:String,
    rest_desc:String,
    rest_menu:[
        menuItem
    ]
  },

  input menuItem{
    item_name:String,
    item_category:String,
    item_type:String,
    item_photo_path:String,
    item_description:String,
    item_price:Int,

  },

  type restaurantResp{
    _id: String,
    rest_name:String,
    rest_email:String,
    rest_phone:String,
    rest_address:rest_addressResp,
    rest_type:String,
    rest_category:String,
    rest_open_day_from:String,
    rest_open_day_to:String,
    rest_open_time_from:String,
    rest_open_time_to:String,
    rest_main_photo:String,
    adminId:String,
    rest_desc:String,
    rest_menu:[
        menuItemResp
    ]
  },
  type menuItemResp{
    item_name:String,
    item_category:String,
    item_type:String,
    item_photo_path:String,
    item_description:String,
    item_price:String,

  },
  type allRestaurants{
      results:[restaurantResp]
  },
  input order{
    cust_id:String,
    rest_id:String,
    order_date:String,
    order_status:String,
    order_total:Float,
    order_details:[
        orderDetails
    ]
  },
  input orderDetails{
    item_name:String,
            item_qty:Int,
            item_price:Float,
  },
  type orderResp{
    cust_id:String,
    rest_id:String,
    order_date:String,
    order_status:String,
    order_total:Float,
    order_details:[
        orderDetailsResp
    ]
  },
  type orderDetailsResp{
    item_name:String,
            item_qty:Int,
            item_price:Float,
  },

  type Query {
    getTest: response,
    getAllRestaurants:[restaurantResp]
    getrestaurantByID(id:String):restaurantResp
    getrestaurantByLocation(city:String): [restaurantResp]
    getOrdersByCustID(cust_id:String):[orderResp]
    getOrdersByRestID(rest_id:String):[orderResp]
    getReceiptByOrder(order_id:String):[orderResp]
 }
 type response {
   message: String
 }
 type error {
    error: String
  }
 type Mutation {
    addUser(userObj: user):userResponse
    addAdmin(adminObj: admin):adminResponse
    addRestaurant(restaurantObj: restaurant):restaurantResp
    addMenuItem(menuItemObject: menuItem):response
    addOrder(orderObj: order):response
    updateOrder(orderID:String,orderStatus:String):response
    
 }
`
exports.Schema = Schema