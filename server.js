const express = require('express')
const app = express()
const http = require('http').createServer(app)
const favicon = require('serve-favicon')

const PORT = process.env.PORT || 5500

http.listen(PORT, () => {
     console.log(`Yahoo!!! The server is connected on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.use(favicon(__dirname + '/public/favicon.ico'))

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
     console.log('A User Connected...')
     socket.on('message', (msg) => {
          socket.broadcast.emit('message', msg)
     })
})
