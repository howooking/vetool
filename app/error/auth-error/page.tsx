export default function GoogleOAuthErrorPage({
  searchParams: { message },
}: {
  searchParams: { message?: string }
}) {
  console.log(message)

  return <div>로그인 에러 {message}</div>
}
