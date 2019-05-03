require("dotenv").config();

const app = require("express")();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");

require("./models/Game");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch(console.error);

// req.body
app.use(bodyParser.json());

// CORS config
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

require("./routes/gameRoutes")(app);

io.on("connection", function(socket) {
  socket.on("line", line => {
    socket.broadcast.emit("line", line);
  });

  socket.on("PLAYER_JOIN", player => {
    socket.broadcast.emit("PLAYER_JOIN", player);
  });
});

const PORT = process.env.PORT || 3456;
http.listen(PORT, function() {
  console.log(`listening on *${PORT}`);
});
