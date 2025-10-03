import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const subscribeToEvent: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/subscription',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscription'],
        description: 'A larger description of what this route is about',
        body: z.object({
          name: z.string(),
          email: z.email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      return reply.status(201).send({
        name,
        email,
      })
    },
  )
}
