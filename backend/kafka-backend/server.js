var connection = new require('./kafka/Connection');
const dotenv = require('dotenv')
dotenv.config()
const db = require('../dbCon')
db()
//topics files
//var signin = require('./services/signin.js');
const addUser = require('./services/addUser')
const authUser = require('./services/authUser')
const getUserDetails = require('./services/getUserDetails')
const updateUserDetails = require('./services/updateUser')

const addAdmin = require('./services/adminServices/addAdmin')
const authAdmin = require('./services/adminServices/authAdmin')
const getAdminDetails = require('./services/adminServices/getAdminDetails')

const addRestaurant = require('./services/restaurantServices/addRestaurant')
const updateRestaurant = require('./services/restaurantServices/updateRestaurant')
const addMenuItem = require('./services/restaurantServices/addMenuItem')

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            if (err) {
                console.log('after handle Error - ' + err);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: err
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
            }
            else {

                console.log('after handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });

            }
            return;

        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("add_user", addUser)
handleTopicRequest("auth_user", authUser)
handleTopicRequest("get_user", getUserDetails)
handleTopicRequest("update_user", updateUserDetails)

handleTopicRequest("add_admin", addAdmin)
handleTopicRequest("auth_admin", authAdmin)
handleTopicRequest("get_admin", getAdminDetails)


handleTopicRequest("add_restaurant", addRestaurant)
handleTopicRequest("update_restaurant", updateRestaurant)
handleTopicRequest("add_menu_item", addMenuItem)