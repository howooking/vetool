import { getMemoNames } from '@/lib/services/admin/icu/memo-name'
import MemoNameSetting from './memo-name-settting'

export default async function MemoNameTab({ hosId }: { hosId: string }) {
  const memoNames = await getMemoNames(hosId)

  return <MemoNameSetting memoNames={memoNames} />
}
