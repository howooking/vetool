export default async function HospitalHeader({ hosId }: { hosId: string }) {
  return (
    <header className="flex h-12 items-center justify-end gap-4 border-b px-2">
      {/* <div className="z-20 flex items-center gap-4">
        <ul className="flex gap-2">
          <li>
            <Button size="icon" variant="secondary" asChild>
              <Link href={`/hospital/${hosId}/patients`}>
                <Dog size={16} />
              </Link>
            </Button>
          </li>
        </ul>
      </div> */}
    </header>
  )
}
