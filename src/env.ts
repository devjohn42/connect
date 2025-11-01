import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.url(),
  REDIS_URL: z.url(),
  WEB_URL: z.url(),
})

export const env = envSchema.parse(process.env)
