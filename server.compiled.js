"use strict";

var express = require("express");

var http = require("http");

var socketIo = require("socket.io");

var port = process.env.PORT || 4001;

var index = require("./routes/index");

var app = express();
app.use(index);
var server = http.createServer(app);
var io = socketIo(server);
var interval;
io.on('connection', function (socket) {
  console.log('New client connected');

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(function () {
    return getApiAndEmit(socket);
  }, 1000);
  socket.on('disconnect', function () {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

var getApiAndEmit = function getApiAndEmit(socket) {
  var responce = new Date();
  socket.emit("FromAPI", responce);
};

server.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});
