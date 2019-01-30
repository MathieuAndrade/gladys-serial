const shared = require('./shared.js');

module.exports = function(options) {

  // if the port name is not specified
  if(options.portName === undefined || options.portName === null){
    // geting the first arduino finded on usb
    const ports = shared.getPorts();
    const port = ports[0];
    // write the code to the arduino
    port.write(code);
  } else {
    // else write the code on specified port name
    const port = options.portName
    port.write(options.message)
  }
    
};