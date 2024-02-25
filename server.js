////////////////////////////Packages
const mongoose = require("mongoose");
require("dotenv").config({
  path: "./config.env",
});

const connectDB = require("./db");
connectDB();

process.on("uncaughtException", (err) => {
  console.log(`${err.name} : ${err.message}`);
  console.log("Shutting down App");
  process.exit(1);
});

const app = require("./app");
///////////////////////////Files
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { addMessage, addChat } = require("./socketHandler");
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
  },
});

const port = process.env.PORT || 5000;
const connection = server.listen(port, () => {
  console.log("Server connected at port " + port);
});

io.on("connection", (socket) => {
  socket.on("connected", (msg) => {
    console.log(msg);
  });
  socket.on("sendmsg", async (data) => {
    try {
      const result = await addMessage(data);
      io.emit('recmsg', result)
    }
    catch (error) {
      console.error(error);
    }

  });

  socket.on("addChat", async (data) => {
    try {
      const result = await addChat(data);
      io.emit('recChat', result)
    }
    catch (error) {
      console.error(error);
    }

  });
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`${err.name} : ${err.message}`);
  console.log(`Atpromise: ${promise}`);
  console.log("Shutting down App ");
  server.close(() => {
    process.exit(1);
  });
});
