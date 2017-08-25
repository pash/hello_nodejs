console.log('hello world');

var m2 =  require('./module2');
console.log(m2);

var m3 =  require('./module3');
m3();

var _ = require('underscore');
// console.log(_);

var http = require('http');

var server = http.createServer(function(request, response) {
  console.log('got request');
  response.write('hi');
  response.end();
})

server.listen(3000);
