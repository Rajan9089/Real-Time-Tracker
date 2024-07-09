const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// Corrected line to use middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("recieve-location", { id: socket.id, ...data });
    });

    // Corrected the socket event listener
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });

    console.log("connected ...");
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});














// const express = require("express");
// const app = express();
// const path = require('path');

// const http = require("http");

// const socketio = require("socket.io");
// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine" , "ejs");
// app.set(express.static(path.join(__dirname , "public")));

// io.on("connection" , function(socket){
//     console.log("connected ...");
// })

// app.get("/" , function(req , res){
//     // res.send("hey");
//     res.render("index");
// })

// server.listen(3000);










// const express = require("express");
// const app = express();
// app.get("/" , (req , res)=>{
//     res.send("hey");
// })

// app.listen(3000);