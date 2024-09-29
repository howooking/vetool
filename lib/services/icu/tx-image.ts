import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export const uploadTxImage = async (txId: string, txImages: File[]) => {
  const supabase = createClient()

  Array.from(txImages).forEach(async (txImage, index) => {
    const { error: deleteIcuChartTxError } = await supabase.storage
      .from('tx_images')
      .upload(`${txId}/${txId + txImage.name}`, txImage)
    if (deleteIcuChartTxError) {
      console.log(deleteIcuChartTxError)
      redirect(`/error?message=${deleteIcuChartTxError.message}`)
    }
  })
}

export const getTxImageList = async (txId: string) => {
  const supabase = createClient()

  const { data: txImageList } = await supabase.storage
    .from('tx_images')
    .list(`${txId}/`)
  return txImageList
}

export const getTxImage = async (txId: string, txImageName: string) => {
  const supabase = createClient()

  const { data: txImageUrl } = await supabase.storage
    .from('tx_images')
    .getPublicUrl(`${txId}/${txImageName}`)

  return txImageUrl.publicUrl
}
