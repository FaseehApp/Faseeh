import Transcription from "./Transcription"
import { icons } from "@renderer/constants/icons";
import { LinkType } from "@renderer/types/enums";
import StreamVideo from "./StreamVideo";
interface VideoPLayerProps {
    videoStreamlink?: string;
    linkType?: LinkType;
}
const VideoPlayer:React.FC<VideoPLayerProps> = ({videoStreamlink,linkType}) => {
  return (
    <div className="relative container w-[600px] h-[400px] bg-black">
        <StreamVideo videoStreamlink={videoStreamlink} linkType={linkType}/>
        <Transcription currentTime={15}/>
        {icons.MuteIcon()}
    </div>
    
  )
}

export default VideoPlayer