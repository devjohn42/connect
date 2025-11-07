import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const sendMessageRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/messages',
    {
      schema: {
        summary: 'Send a message to the AI chat',
        tags: ['ai'],
        description: 'A larger description of what this route is about',
        body: z.object({
          message: z.string(),
        }),
        response: {
          200: z.object({
            response: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { message } = request.body

      return { response: message }
    },
  )
}
