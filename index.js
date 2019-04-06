let gpio = require('onoff').Gpio;
let mqtt = require('mqtt');

let config = require('./config');

let button_pin = new gpio(config.button_pin, 'out');
let client  = mqtt.connect(config.mqtt_server);
let topic = config.listen_topic;

client.on('connect', function () {
  client.subscribe(topic, function (err) {
    if (err) console.log(err);
  })
})

client.on('message', function (topic, message) {
  // message is a Buffer
  //console.log(message.toString())
  let data = JSON.parse(message.toString())

  if (data['action'] === config.button_push_message) {
    push_button();
    if (data.user.id !== config.my_google_id)
      notify_me(data, client);
  }
})

function push_button() {
  button_pin.writeSync(1);
  setTimeout(
    function() {
      button_pin.writeSync(0);
    }, 
    500
  );
}

function notify_me(data, client) {
  let message = `
    <img src="${data.user.photos[0].value}"/> 
    ${data.user.name} pressed the button for the garage door
    <p>Just thought you should know.</p>
  `;
  client.publish('notify/me', JSON.stringify({
    message: message
  }));
}
