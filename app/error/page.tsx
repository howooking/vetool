import React from 'react'

export default function ErrorPage({
  searchParams: { message },
}: {
  searchParams: { message: string }
}) {
  return <div>ErrorPage {message}</div>
}
