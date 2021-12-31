# uberEatsClone
YouTube Link: https://www.youtube.com/watch?v=bb_aR_WvkOA
GitHub Repo: https://github.com/saisrinivaslakkakula/uberEatsClone/tree/lab2-kafka

## Introduction:
The purpose of the Lab is to design the system of online restaurant order management system
(OMS). The order management system chosen for this lab is one of the famous food delivery
applications called Uber Eats. The end goal of the Lab is to design the OMS system with 75% of
estimated replica functionality of original application.
System Design:
Persona:
In the OMS System, there are 2 personae.
1. User – Who places the order
2. Restaurant – who manages the restaurant, tracks the order and changes it.
User Persona:
- From the user standpoint, they can navigate the restaurants based on their location
selected.
- Users can select the restaurant and browse the menu.
- Select the items from the menu and add them to the cart
- Place the order and keep track of the same
- View past order history
- Delete or change the current delivery address.
- Add/Remove restaurants from the favorites
Admin/Restaurant Persona:
- Admin can Edit the details of the restaurant like timings, days open, Description etc.
- Manage restaurant by adding the dishes, editing the prices, ingredients.
- Manage the orders. View, edit and change the status of the order or cancel the order.
Functional Requirements for the system:
- User must be unique with his email address
- Restaurant must be unique with the email, place and address.
- If user tries to add to cart while the cart has items from the different restaurant, a message
should be popped up indicating that cart has items from different restaurant.
- user can add customizations to the order.
- user can navigate through his previous orders and cancel the order at any time until it’s
delivered.
Technology Stack used:
Front End:
React – A powerful JavaScript Framework used for building single page applications.
Redux – A state management library used by react to manage global state of the application.
JSX (Embedded HTML in JS)
CSS – Cascaded Style sheets.
Middleware:
Kafka: Kafka is a message queue based distributed system used to decouple the backed
architecture into micro services. Kafka works on publisher, subscriber model where the client
sends the request messages to the Kafka queue into the certain topic. The backend micro
service is subscribed to the same topic, consumes the request, executes the business logic and
sends back the response to the response topic queue.
Passport JWT: Passport is the strategy used to verify the authenticity of incoming request
by using JSON Web Token. node.js has a special package called passport-jwt which provides
useful functions to verify the incoming request and check it against the JWT. After checking
the authenticity, the particular request maker is authorized to use the requested resource.
Backend:
Node Js – A JavaScript runtime on the server side based on Google Chromes V8 Engine and
supports ES6 features of JavaScript
Express – Nodejs Framework for handling incoming requests and outgoing responses.
Database :
MongoDB – An open-Source Schema Free No SQL Database Technology which supports its
native query language called MongoDB Query Language (MQL). MongoDB stores each
record into its granular entity called Document. The document is of type JSON with data as
key-value pairs. NoSQL is flexible as it eliminates features like joins and Sub-Queries. Also,
the referential entities can be reduced as much as possible because all the logical data can be
stored in a single document and the collection of documents is called as ‘collection’
Miscellaneous tools:
Redux Dev Tools Extension – Very useful tool in debugging the Redux related issues in the
development phase.
PostMan – Web/Native HTTP Client used to test APIs
MongoDB Compass – A multi-platform tool provided by mongoDB for to manage the
database and it provides GUI for the database.
Database Schematics Design:
- Since the application is migrated from MySQL to MongoDB, many dependencies can be
removed. especially the entities that require joins as NoSQL’s power comes with no
joins.
- The design is thus modified by combining orders and order details in the old design into
single collection of documents called orders.
- Similarly, In the earlier design, favorites were added into separate table with restaurant
ID and CustomerID as foreign keys. In the new design, the favorites is combined with
user data as favorites as a field in the user document.
- User and restaurant address is simplified by adding main field as address and the
document is subdivided into street, city, state etc.
Below are the data design schemas built using mongoDB.
User Schema:
const userSchema = mongoose.Schema({
firstName:{
type:String,
reqired:true
},
lastName:{
type:String,
reqired:true
},
email:{
type:String,
unique:true,
reqired:true
},
password:{
type:String,
reqired:true
},
phone:{
type:String,

reqired:true
},
address:{
street:{
type:String,
required:true
},
city:{
type:String,
required:true
},
state:{
type:String,
required:true
},
country:{
type:String,
required:true
},
zipCode:{
type:String,
required:true
}
},
photo_path:{
type:String
},
favourites:[{type:String}]
},{timestamps:true})

Admin Schema: Admin Schema has most of the fields in user schema. This can also be
combined with userSchema by adding a field “isAdmin”. However, to maintain modularity,
included it as a separate schema.
const adminSchema = mongoose.Schema({
firstName:{

type:String,
reqired:true
},
lastName:{
type:String,
reqired:true
},
email:{
type:String,
unique:true,
reqired:true
},
password:{
type:String,
reqired:true
},
phone:{
type:String,
reqired:true
},
photo_path:{
type:String
}
},{timestamps:true})

Restaurant Schema:
const restaurantSchema = mongoose.Schema({
rest_name:{
type:String,
reqired:true

},
rest_email:{
type:String,
unique:true,
reqired:true
},
rest_phone:{
type:String,
reqired:true
},
rest_address:{
rest_street:{
type:String,
required:true
},
rest_city:{
type:String,
required:true
},
rest_state:{
type:String,
required:true
},
rest_zipcode:{
type:String,
}
},
rest_type:{
type:String,
reqired:true
},
rest_category:{
type:String,
reqired:true

},
rest_open_day_from:{
type:String,
},
rest_open_day_to:{
type:String,
},
rest_open_time_from:{
type:String,
},
rest_open_time_to:{
type:String,
},
rest_main_photo:{
type:String
},
adminId:{
type:String
},
rest_desc:{
type:String
},
rest_menu:[
{
item_name:{type:String},
item_category:{type:String},
item_type:{type:String},
item_photo_path:{type:String},
item_description:{type:String},
item_price:{type:Number},
}
]
},{timestamps:true})

Order Schema:
const orderSchema = mongoose.Schema({
cust_id:{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
},
rest_id:{
type:mongoose.Schema.Types.ObjectId,
ref:'Restaurant'
},
order_date:{
type:Date,
default: Date.now
},
order_status:{
type:String,
required:true
},
order_total:{
type:Number,
reqired:true
},
special_instructions: {
type:String
},
order_details:[
{
item_name:{type:String},
item_qty:{type:Number},
item_price:{type:Number},
}
]
},{timestamps:true})

Q1 Ans: In Lab 1, I have used custom middleware function that has access to express.js req,res
cycles. as soon as the request object comes in to the route that is specified as ‘protected’, the
header is looked into to find token that starts with Bearer. The JWT token this taken is decoded
and the id is checked against the DB to verify authenticity and provide the access.
However, as we can see, the decode mechanism is almost transparent and gives access to other
modules to look into decoded JWT. This method though restricts authorized access on top-level,
in granular level the security constraints still exist.
So, we need a process that takes care of decoding the process without even the calling function
having access to the decoded data. Hence, a strategical way of decoding the JWT is required.
Passport.js eliminates the problem of using custom middleware and provides many strategies to
verify the authenticity of the request trying to access the route/service. Passport JWT comes in
with many built-in functions to build strategies like google Auth, Facebook Auth etc., One such
strategy used in Lab2 is Passport-JWT.
Q2 Ans:
In a large-scale distributed system, the time taken for both CPU and I/O plays a vital role in the
performance of the system. Before going to how kafka improves speed of an application, let us
first see what a monolithic application is. before the introduction of the distributed systems, all
the code in an application is written into a single place, built and released into production
systems. This worked very well until the scalability and performance issues came up. the system
is too reliable on the other subsystems or modules and which in turn decreased the performance
of application.
To avoid this, distributed systems are introduced and kafka is one such. kafka works on message
queue mechanism which communicates to the incoming request. All the incoming requests are
queued in together into kafka server. which has few important things called as brokers. Brokers
are essentially the workers in the kafka system which keeps the kafka server running. The client
who is making the request is called as producer and whereas the service receiving and processing
it is known as the consumer. both the parties must be subscribed to the same topic to achieve the
same business logic.
This means the producer can produce as many messages as they want and consumer can be
scaled with the help of microservices to accommodate all the produced requests in the less time.
This improves the overall performance of the application by N-fold compared to monolithic
application as the resource and I/O blocking is reduced as much as possible.
To analyse the performance, I have conducted a benchmark test in J-METER. two requests are
made for same business logic one with monolithic and other with kafka message queue.
Total 50 requests are done for each and the type of the request is POST (addOrder).
Below is the summary report of the test.
It is clearly seen that the kafka request is half as less time as the monolithic request even with the
#of brokers as 1. it significantly improves with the replication factor and broker count.
Q3 Ans :
My SQL is a relational database which favors ACID - Atomic, Consistency, Isolation &
Durability. Also, My SQL has a standard query language and supported by most of the
backend/scripting programming languages with in-built modules. My SQL provides Transactions
which favors business applications that highly rely on transactional data. However, MySQL is
strongly coupled with entities and relations. the data and the schema is fixed and cannot be
changed at runtime. On the other hand, mongoDB is flexible especially working with logically
grouped data. For eg. in the application, we don’t have to store orders and order details
separately while SQL supports no such process. We had to use two separate tables with Foreign
keys.
While mongoDB is flexible in schema and no joins point of view, it favours weaker ACID and
transactional data. This is critical for the businesses that are more structure oriented like banks
and other financial services. they highly rely on transactional data.
From my analysis, I believe for applications that require high security, ACID and transaction
dependency, we might have to use MySQL and for the data where structural organization is not
important, I might go with mongoDB.
For eg: I might choose more SQL for a Banking Application and more MongoDB for an e-
Commerce application.
Performance Testing results:
The performance test of the API (getAllRestaurants) is done with concurrent users of
100,200,300 and 500 and below are the screenshots of the results.
Project Planning and integration:
The project is developed locally, and changes are pushed to the GitHub private repository
regularly. Below is the screenshot of the git repository commit history.
This is a offline tool, your data stays locally and is not send to any server!
Feedback & Bug Reports
