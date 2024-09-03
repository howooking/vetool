import { Notice, User } from '@/types'

export type NoticeUserJoined = Omit<
  Notice,
  'user_id' | 'updated_at' | 'hos_id'
> & {
  user_id: Pick<User, 'user_id' | 'name' | 'avatar_url'>
}
