import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEvent } from '../functions/subscribe-to-event.js'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
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
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      })

      return reply.status(201).send({
        subscriberId,
      })
    },
  )
}
