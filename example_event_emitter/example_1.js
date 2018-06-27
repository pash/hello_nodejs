// To run: node example_1.js
// Returning an EventEmitter

// Publish

var EventEmitter = require("events").EventEmitter;

var getResource = function(c) {
  var e = new EventEmitter();
  process.nextTick(function() {
    var count = 0;
    e.emit("start");
    var t = setInterval(function() {
      e.emit("data", ++count);
      if (count === c) {
        e.emit("end", count);
        clearInterval(t);
      }
    }, 10);
  });
  return e;
};

// Subscribe

var r = getResource(5);

r.on("start", function() {
  console.log("Ive started!");
});

r.on("data", function(d) {
  console.log("> I received data -> " + d);
});

r.on("end", function(t) {
  console.log("I'm done, with " + t + " data events.");
});
