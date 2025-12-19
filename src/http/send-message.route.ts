import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { answerUserMessage } from '../functions/answer-user-message.js'

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

      const { response } = await answerUserMessage({ message })

      return { response }
    },
  )
}
