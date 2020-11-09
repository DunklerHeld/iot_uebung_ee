var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://broker.hivemq.com:1883");

var sTopic = "iotcourse/channel/ee";
var deviceId = "dhbwiotee.1";

var os = require("node-os-utils");
var cpu = os.cpu;
var cpuUsage;
var mem = os.mem;
var memInfo;

client.on("connect", function() {
    console.log("Connected Publisher to " + sTopic);
    setInterval(sendJSON, 5000);
    setInterval(checkCPU, 1000);
    //setInterval(checkMem, 1000);
});

function checkCPU() {
    cpu.usage().then(function (res) {
        cpuUsage = res;
    });
}

function checkMem() {
    mem.usage().then(function (info) {
        memInfo = info;
    });
}

function sendJSON() {

    var msg = {
        time: new Date(),
        id: deviceId,
        temp: Math.random(),
        battery: 1,
        memTotal: require("os").totalmem(),
        memAvailable: require("os").freemem(),
        load: cpuUsage
    };

    client.publish(sTopic, JSON.stringify(msg));
}