const cassandra = require('cassandra-driver');
const fs = require('fs');
const auth = new cassandra.auth.PlainTextAuthProvider('saislakk-at-728331569888', 'TR41+bz3Ymlx4iOAMVaGaOrJMHjMC+mlDgSW0MV3lG8=');
const sslOptions1 = {
        ca: [
                   fs.readFileSync('./sf-class2-root.crt', 'utf-8')],      
                   host: 'cassandra.us-east-2.amazonaws.com',
                   rejectUnauthorized: true
       };

const client = new cassandra.Client({
        contactPoints: ['cassandra.us-east-2.amazonaws.com'],
        localDataCenter: 'us-east-2',
        authProvider: auth,
        sslOptions: sslOptions1,
        protocolOptions: { port: 9142 },
        queryOptions: {consistency: cassandra.types.consistencies.localQuorum}
});

module.exports = client