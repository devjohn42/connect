import { redis } from '../redis/client.js'

interface GetSubscribersInvitesCountParams {
  subscriberId: string
}

export async function getSubscribersInvitesCount({
  subscriberId,
}: GetSubscribersInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
