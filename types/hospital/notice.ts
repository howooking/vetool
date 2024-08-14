import { Notice, User } from '..'

export type NoticeUserJoined = Omit<Notice, 'user_id'> & {
  user_id: Pick<User, 'user_id' | 'name' | 'avatar_url'>
}
