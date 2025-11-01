import { redis } from '../redis/client.js'

interface AccessInviteLinkToEventParams {
  subscriberId: string
}

export async function accessInviteLink({ subscriberId }: AccessInviteLinkToEventParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
