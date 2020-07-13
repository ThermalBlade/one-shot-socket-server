//app.js

//Set up express and socket servers
const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const index = require("./routes/index")
app.use(index)

const server = http.createServer(app)
const port = process.env.PORT || 4001
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)

let interval;

io.on('connection', (socket) => {
    console.log('New client connected')
    if(interval){
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000)
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    })
})

const getApiAndEmit = socket => {
    const responce = new Date()
    socket.emit("FromAPI", responce)
}