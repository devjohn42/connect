import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './http/subscribe-to-event.route.js'
import { env } from './env.js'
import { accessInviteLinkRoute } from './http/access-invite-link.route.js'
import { GetSubscriberInviteClicksRoute } from './http/get-subscriber-invite-clicks.route.js'
import { GetSubscriberInviteCountRoute } from './http/get-subscriber-invites-count.route.js'
import { GetSubscriberRankingPositionRoute } from './http/get-subscriber-ranking-position.route.js'
import { getRankingRoute } from './http/get-ranking.route.js'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:3333',
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(GetSubscriberInviteClicksRoute)
app.register(GetSubscriberInviteCountRoute)
app.register(GetSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('🚀 HTTP Server Running!')
})
