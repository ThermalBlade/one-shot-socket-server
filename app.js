//app.js

//Set up express and socket servers
const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const index = require("./routes/index")
app.use(index)

const server = http.createServer(app)
const port = process.env.PORT || 4000
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('new message', function (data){
        console.log(data)
        io.sockets.emit('new message2', data)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})