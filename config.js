module.exports = {
  button_pin: 4, // the pin on the raspberry pi that the button/relay is connected to
  mqtt_server: 'mqtt://192.168.1.2', // the address of the mqtt server
  listen_topic: 'devices/this_device/command', // the topic to listen on for button presses
  button_push_message: 'push_button', // the message to listen for for button presses
  my_google_id: '123451234512345123451' // OPTIONAL. If set, don't send notifications when this user presses the button
};
