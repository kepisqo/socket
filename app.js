const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  }
});

server.listen(PORT, () => {
  io.on("connection", socket => {
    console.log(socket.id);
    console.log(io.engine.clientsCount)
    //console.log(Object.keys(io.sockets.connected).length)
    //! Karşılama Mesajı Gönder...
    // io.in(roomID).emit()
    io.emit("count", io.engine.clientsCount);
    socket.on("clk", data => {
      socket.broadcast.emit("clk", "update");
    })

    socket.on('disconnect', () => {
      io.emit("count", io.engine.clientsCount);
    });
    // socket.on("NEW_BOOKMARK_EVENT", bookmark => {
    //   console.log("bookmark :>> ", bookmark);
    //   // io.emit("NEW_BOOKMARK_ADDED", bookmark);
    //   //! Gonderen hariç herkese bookmark bilgisini gonder..
    //   socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    // });


  });
});
