import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { handler } from '../build/handler.js'

const { PORT = 3000 } = process.env
const app = express()
const server = createServer(app)

const io = new Server(server)

const matches = {}

io.on('connection', socket => {
  socket.on('join', ({ match, ...player }) => {
    if (!matches[match]) matches[match] = []

    socket.join(match)

    matches[match].push({ ...player, id: matches[match].length })

    io.to(match).emit('join', matches[match])
  })

  socket.on('lock', ({ match, ...data }) => {
    socket.to(match).emit('lock', data)
  })
})

app.use(handler)

server.listen(PORT)
