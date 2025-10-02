import fastify from "fastify"

const app = fastify()

app.get('/server', (request, reply) => {
  return 'Server Running'
})

app.listen({port: 3333}).then(() => {
  console.log('🚀 HTTP Server Running!')
})