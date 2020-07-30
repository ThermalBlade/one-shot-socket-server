const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const index = require("./routes/index")
app.use(index)

const server = http.createServer(app)
const port = 3005
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log('New client connected')

    socket.join('some room')

    socket.on('new message', function (data){
        console.log(data)
        io.sockets.emit('new message2', data)
        io.to('some room').emit('hello there')
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

const chatRooms = ['rocket league', 'csgo', 'bt1']

io.of('/games').on('connection', (socket) => {
    console.log('New Game Client')
    socket.emit('welcome', 'welcome to games area')

    socket.on('joinRoom', (room) => {
        if(gameRooms.includes('room')){
            socket.join(room)
            return socket.emit('success', 'You joined the room.')
        }
        else{
            return socket.emit('err', 'Room does not exist.')
        }
    })
})