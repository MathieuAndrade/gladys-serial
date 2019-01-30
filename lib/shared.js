var ports = [];
var connect = require('./connect.js');
var Promise = require('bluebird');

module.exports = {

  addPort: function(newPort)  {
    ports.push(newPort);
  },

  getPorts: function() {
    return ports;
  },

  getSpecifiedPort(portPath) {
      let port = null
      ports.forEach(p => {
        if(p.path == portPath) port = p
      });
      return port
  },

  reset: function(){
      
      // we close all connections
      return Promise.map(ports, function(port){
          return closeConnection(port);
      })
      .then(function(){

          // then we reset ports variable
          ports = [];
      })
  }
};

function closeConnection(port){
  return new Promise(function(resolve, reject){
      port.close(function(){
          resolve();
      });
  });  
}