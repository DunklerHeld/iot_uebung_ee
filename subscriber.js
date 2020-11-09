var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://broker.hivemq.com:1883");

const { Client } = require('pg');
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: "iot",
    password: 'root',
    port: 5432,
});
db.connect();
db.query('SELECT $1::text as message', ['Connected Database!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message);
});

var sTopic = "iotcourse/channel/ee";

client.on("connect", function() {
    console.log("Connected Subscriber");
    client.subscribe(sTopic);
    console.log("Subscribed to " + sTopic);
    console.log();

    

});

client.on("message", function(topic, message, packet) {
    console.log("Topic:" + topic);
    console.log("Message:\n" + message);
    console.log("QOS: " + packet.qos);
    console.log("Retain: " + packet.retain);
    
    db.query(`insert into mqtt_data values(NOW(), '${JSON.stringify(JSON.parse(message))}');`)
        .then(res => {})
        .catch(e => console.log("Error: " + e.stack));

    console.log();
});

client.on("error", function(error) {
    console.log(`${error}`);
});