import fastify from "fastify"
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from "zod"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:3333'
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.post('/subscription', {
  schema: {
      body: z.object({
        name: z.string(),
        email: z.email()
      }),
      response: {
        201: z.object({
          name: z.string(),
          email: z.email()
        })
      },
    }
  }, async (request, reply) => {
    const {name, email} = request.body

    return reply.status(201).send({
      name,
      email
  })
})

app.listen({port: 3333}).then(() => {
  console.log('🚀 HTTP Server Running!')
})