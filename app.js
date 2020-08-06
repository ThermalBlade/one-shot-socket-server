const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const index = require("./routes/index")
//app.use(index)

const server = http.createServer(app)
const port = 8080
server.listen(port, () => console.log(`Listening on port ${port}`))

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`)
    })

    socket.on('join', (room) => {
        console.log(`Socket ${socket.id} joining ${room}`)
        socket.join(room)
    })

    socket.on('chat', (data) => {
        const {message, room} = data
        console.log(`msg: ${message}, room: ${room}`)
        io.to(room).emit('chat', message)
    })
})

/*io.on('connection', (socket) => {
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
})*/

/*const chatRooms = ['room1', 'room2', 'room3']
io.of('/logIn').on('connection', (socket) => {
    console.log('Client attempting to log in...')

    socket.on('joinRoom', ({usr, room, pwd}) => {
        if(chatRooms.includes(room)){
            console.log(usr, 'client connected to', room)
            socket.join(room)
            io.of('/logIn').in(room).emit('newUser', 'New user in room!')
            return socket.emit('success', 'You joined the room.')
        }
        else{
            console.log(usr, 'failed to connect to', room)
            return socket.emit('err', 'Room does not exist.')
        }
    })
})*/

/*io.of('/chat').on('connection', (socket) => {
    socket.on('newMsg', (data) => {
        console.log('new message from ', data.username, data.msg)
        io.sockets.emit('new message2', data.username + '\n' +  data.msg)
    })

    socket.on('joinRoom', (room) => {
        if(chatRooms.includes(room)){
            socket.join(room)
            io.of('/games').in(room).emit('newUser', 'New user in room!')
            return socket.emit('success', 'You joined the room.')
        }
        else{
            return socket.emit('err', 'Room does not exist.')
        }
    })
})*/