# uberEatsClone
YouTube Link: https://www.youtube.com/watch?v=bb_aR_WvkOA

GitHub Repo: https://github.com/saisrinivaslakkakula/uberEatsClone/tree/lab2-kafka

## Introduction:
The purpose of the Lab is to design the system of online restaurant order management system
(OMS). The order management system chosen for this lab is one of the famous food delivery
applications called Uber Eats. The end goal of the Lab is to design the OMS system with 75% of
estimated replica functionality of original application.
System Design:
## Persona:
In the OMS System, there are 2 personae.
1. User – Who places the order
2. Restaurant – who manages the restaurant, tracks the order and changes it.
### User Persona:
- From the user standpoint, they can navigate the restaurants based on their location
selected.
- Users can select the restaurant and browse the menu.
- Select the items from the menu and add them to the cart
- Place the order and keep track of the same
- View past order history
- Delete or change the current delivery address.
- Add/Remove restaurants from the favorites
### Admin/Restaurant Persona:
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
## Front End:
React – A powerful JavaScript Framework used for building single page applications.
Redux – A state management library used by react to manage global state of the application.
JSX (Embedded HTML in JS)
CSS – Cascaded Style sheets.
## Middleware:
Kafka: Kafka is a message queue based distributed system used to decouple the backed
architecture into micro services. Kafka works on publisher, subscriber model where the client
sends the request messages to the Kafka queue into the certain topic. The backend micro
service is subscribed to the same topic, consumes the request, executes the business logic and
sends back the response to the response topic queue.
Passport JWT: Passport is the strategy used to verify the authenticity of incoming request
by using JSON Web Token. node.js has a special package called passport-jwt which provides
useful functions to verify the incoming request and check it against the JWT. After checking
the authenticity, the particular request maker is authorized to use the requested resource.
## Backend:
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
## Miscellaneous tools:
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

