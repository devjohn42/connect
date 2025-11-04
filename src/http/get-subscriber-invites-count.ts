import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { GetSubscribersInvitesCount } from '../functions/get-subscriber-invites-count.js'

export const GetSubscriberInviteCountRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/count',
    {
      schema: {
        summary: 'Get subscriber invite invites count',
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

      const { count } = await GetSubscribersInvitesCount({ subscriberId })

      return { count }
    },
  )
}
