import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invites-clicks.js'

export const GetSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/clicks',
    {
      schema: {
        summary: 'Get subscriber invite clicks count',
        tags: ['referral'],
        description: 'A larger description of what this route is about',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async (request) => {
      const { subscriberId } = request.params

      const { count } = await getSubscriberInviteClicks({ subscriberId })

      return { count }
    },
  )
}
