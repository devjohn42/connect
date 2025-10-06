import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../env.js'
import { subscriptions } from './schema/subscriptions.js'

export const pg = postgres(env.POSTGRESS_URL)
export const db = drizzle(pg, {
  schema: {
    subscriptions,
  },
})
