import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server as SocketServer } from "socket.io";

// Define the HTTP server and the Socket.IO server instance globally
let server: Server;
export let io: SocketServer; // Export io here to access it in other parts of the app

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Create and start the server
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });

    // Initialize Socket.IO server on top of the HTTP server
    io = new SocketServer(server, {
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        preflightContinue: false,
        credentials: true, //access-control-allow-credentials:true
      },
    });

    // Listen for socket connections
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Example event: Listen for a 'joinRoom' event
      socket.on("joinRoom", (room) => {
        console.log(`User joined room: ${room}`);
        socket.join(room);
      });

      // Disconnect event
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection detected, shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException detected, shutting down ...`);
  process.exit(1);
});
