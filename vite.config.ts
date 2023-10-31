import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { Server } from 'socket.io'
import type http from 'node:http'

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: 'multiplayer',
      configureServer(server) {
        const matches: Record<string, unknown[]> = {}

        const io = new Server(server.httpServer as http.Server)

        io.on('connection', socket => {
          console.log(socket.id)

          socket.on('join', ({ match, ...player }) => {
            if (!matches[match]) matches[match] = []

            socket.join(match)

            matches[match].push({ ...player, id: matches[match].length })

            io.to(match).emit('join', matches[match])

            console.log(match, player)
          })

          socket.on('lock', ({ match, ...data }) => {
            socket.to(match).emit('lock', data)
          })
        })
      },
    },
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
