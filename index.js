var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  socket.on("line", line => {
    socket.broadcast.emit("line", line);
  });
});

const PORT = process.env.PORT || 3456;
http.listen(PORT, function() {
  console.log(`listening on *${PORT}`);
});
