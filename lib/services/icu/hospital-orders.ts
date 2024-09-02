'use server'

import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getHospitalOrder = async (hosId: string) => {
  const supabase = createClient()

  const { data: hospitalOrder, error: orderDataError } = await supabase
    .from('hospitals')
    .select('hos_order_names, hos_order_comments, hos_order_types')
    .match({ hos_id: hosId })
    .single()

  if (orderDataError) {
    console.log(orderDataError)
    redirect(`/error?message=${orderDataError.message}`)
  }

  return hospitalOrder
}

export const deleteHospitalOrder = async (
  hosId: string,
  orderData: {
    hos_order_names: string
    hos_order_comments: string
    hos_order_types: string
  },
) => {
  const supabase = createClient()
  const prevOrderData = await getHospitalOrder(hosId)

  const updatedOrderData = {
    hos_order_names: prevOrderData.hos_order_names.filter(
      (name) => name !== orderData.hos_order_names,
    ),
    hos_order_comments: prevOrderData.hos_order_comments.filter(
      (comment) => comment !== orderData.hos_order_comments,
    ),
    hos_order_types: prevOrderData.hos_order_types.filter(
      (type) => type !== orderData.hos_order_types,
    ),
  }

  const { error: deleteOrderError } = await supabase
    .from('hospitals')
    .update(updatedOrderData)
    .match({ hos_id: hosId })

  if (deleteOrderError) {
    console.log(deleteOrderError)
    redirect(`/error?message=${deleteOrderError.message}`)
  }
}

export const updateHospitalOrder = async (
  hosId: string,
  orderIndex: number | null,
  orderData: {
    hos_order_names: string
    hos_order_comments: string
    hos_order_types: string
  },
) => {
  const supabase = createClient()
  const prevOrderData = await getHospitalOrder(hosId)

  // 기존 오더 데이터를 객체 배열로 변환
  let orders = prevOrderData.hos_order_names.map((name, index) => ({
    name,
    comment: prevOrderData.hos_order_comments[index],
    type: prevOrderData.hos_order_types[index],
  }))

  if (orderIndex !== null && orderIndex >= 0) {
    // 기존 오더 수정
    orders[orderIndex] = {
      name: orderData.hos_order_names,
      comment: orderData.hos_order_comments,
      type: orderData.hos_order_types,
    }
  } else {
    // 새 오더 추가
    orders.push({
      name: orderData.hos_order_names,
      comment: orderData.hos_order_comments,
      type: orderData.hos_order_types,
    })
  }

  // 오더 정렬
  orders.sort(
    (prev, next) =>
      DEFAULT_ICU_ORDER_TYPE.findIndex((order) => order.value === prev.type) -
      DEFAULT_ICU_ORDER_TYPE.findIndex((order) => order.value === next.type),
  )

  // 정렬된 오더를 다시 개별 배열로 분리
  const updatedIcuOrderName = orders.map((order) => order.name)
  const updatedIcuOrderComment = orders.map((order) => order.comment)
  const updatedIcuOrderType = orders.map((order) => order.type)

  const { error: upsertOrderError } = await supabase
    .from('hospitals')
    .update({
      hos_order_names: updatedIcuOrderName,
      hos_order_comments: updatedIcuOrderComment,
      hos_order_types: updatedIcuOrderType,
    })
    .match({ hos_id: hosId })

  if (upsertOrderError) {
    console.log(upsertOrderError)
    redirect(`/error?message=${upsertOrderError.message}`)
  }
}
