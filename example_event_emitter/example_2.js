// To run: node example_2.js
// Inheriting from EventEmitter

var Resource = require("./example_2_resource");

var r = new Resource(7);

r.on("start", function() {
  console.log("Ive started!");
});

r.on("data", function(d) {
  console.log("> I received data -> " + d);
});

r.on("end", function(t) {
  console.log("I'm done, with " + t + " data events.");
});
