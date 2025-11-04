import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position.js'

export const GetSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        summary: 'Get subscriber ranking position',
        tags: ['referral'],
        description: 'A larger description of what this route is about',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },
    async (request) => {
      const { subscriberId } = request.params

      const { position } = await getSubscriberRankingPosition({ subscriberId })

      return { position }
    },
  )
}
