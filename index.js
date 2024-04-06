var port = 80;
const express = require("express")
const app = express();
const fs = require("fs")
const http = require("http").createServer(app)
const path = require("path")

const io = require("socket.io")(http)

app.use(express.static(path.join(__dirname, "public")))


io.on("connection", (socket) => {
    socket.on("login", (username, password) => {
        var fileContent = JSON.parse(fs.readFileSync("data/users.json"))
        var newArray = [username, password]
        fileContent.push(newArray);
        fs.writeFileSync("data/users.json", JSON.stringify(fileContent));
    })
})
http.listen(port, ()=> {
    console.log(`server listening on port ${port}`)
})