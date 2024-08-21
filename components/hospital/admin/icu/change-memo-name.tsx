import { memoNameFormSchema } from '@/components/hospital/admin/icu/memo-name-schema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateMemoNames } from '@/lib/services/admin/icu'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function ChangeMemoName({ memoNames }: { memoNames: string[] }) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const memoA = memoNames[0]
  const memoB = memoNames[1]
  const memoC = memoNames[2]

  const form = useForm<z.infer<typeof memoNameFormSchema>>({
    resolver: zodResolver(memoNameFormSchema),
    defaultValues: {
      memoA,
      memoB,
      memoC,
    },
  })

  const handleSubmit = async (values: z.infer<typeof memoNameFormSchema>) => {
    const { memoA, memoB, memoC } = values
    const updatedMemoNames = [memoA, memoB, memoC]

    if (
      updatedMemoNames[0] === memoNames[0] &&
      updatedMemoNames[1] === memoNames[1] &&
      updatedMemoNames[2] === memoNames[2]
    ) {
      return
    }

    await updateMemoNames(updatedMemoNames, hos_id as string)

    toast({
      title: '메모명 변경',
      description: '메모명 변경이 완료되었습니다',
    })
    refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-4 py-4"
      >
        <FormField
          control={form.control}
          name="memoA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모 A</FormLabel>
              <FormControl>
                <Input placeholder="메모 A" {...field} />
              </FormControl>
              <FormDescription>
                입원 차트의 메모 A에 해당하는 메모명입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memoB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모 B</FormLabel>
              <FormControl>
                <Input placeholder="메모 B" {...field} />
              </FormControl>
              <FormDescription>
                입원 차트의 메모 B에 해당하는 메모명입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memoC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모 C</FormLabel>
              <FormControl>
                <Input placeholder="메모 C" {...field} />
              </FormControl>
              <FormDescription>
                입원 차트의 메모 C에 해당하는 메모명입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-auto">
          저장
        </Button>
      </form>
    </Form>
  )
}
