import VideoPlayer from "./components/VideoPlayer/VideoPlayer"
import { LinkType } from "./types/enums"
function App(): JSX.Element {

  return (
    <>
    <VideoPlayer videoStreamlink="1N0bx_csHZQ" linkType={LinkType.YOUTUBE} />
      </>
  )
}

export default App
