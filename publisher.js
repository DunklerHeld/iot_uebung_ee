var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org:1883");

var sTopic = "iotcourse/channel";
var deviceId = "dhbwiotee.1";

client.on("connect", function() {
    console.log("Connected Publisher to " + sTopic);
    setInterval(sendJSON, 5000);
});

function sendJSON() {

    var msg = {
        time: new Date(),
        id: deviceId,
        temp: Math.random()
    };

    client.publish(sTopic, JSON.stringify(msg));
}