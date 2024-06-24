import MaxWidthContainer from '../common/max-width-container'
import PrevButton from './prev-button'

export default function OnBoardingHeader() {
  return (
    <header className="absolute top-0 h-16 w-full border-b">
      <MaxWidthContainer>
        <div className="flex h-16 items-center">
          <PrevButton />
        </div>
      </MaxWidthContainer>
    </header>
  )
}
