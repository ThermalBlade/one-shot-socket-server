const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const redisAdapter = require('socket.io-redis')

const app = express()
const index = require("./routes/index")
app.use(index)

const server = http.createServer(app)
const port = process.env.npm_config_myVar
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)
io.adapter(redisAdapter({host: 'localhost', port:'6379'}))

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