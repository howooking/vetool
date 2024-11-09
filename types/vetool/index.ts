import { VetoolErrors, VetoolFeedbacks } from '@/types'

export type UserFeedbackType = VetoolFeedbacks & {
  user_id: { hos_id: { city: string; name: string } }
}

export type ErrorFeedbackType = VetoolErrors & {
  user_id: { hos_id: { city: string; name: string } }
}
