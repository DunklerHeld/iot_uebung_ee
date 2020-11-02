var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org:1883");

var sTopic = "iotcourse/channel";

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
    console.log();

});

client.on("error", function(error) {
    console.log(`${error}`);
});