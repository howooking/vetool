import { getShowOrderer } from '@/lib/services/admin/icu/orderer'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import OrdererSwitch from './orderer-switch'

export default async function OrdererTab({ hosId }: { hosId: string }) {
  const showOrderer = await getShowOrderer(hosId)

  return <OrdererSwitch showOrderer={showOrderer} hosId={hosId} />
}
