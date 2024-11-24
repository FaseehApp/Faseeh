import { useEffect, useRef } from "react";
import { LinkType } from "@renderer/types/enums";
import YouTube, { YouTubeProps } from 'react-youtube';

interface StreamVideoProps {
  videoStreamlink?: string;
  linkType?: LinkType;
}

const StreamVideo: React.FC<StreamVideoProps> = (props) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls:0,
      cc_load_policy: 0,
    },
  };

  return <YouTube videoId="1N0bx_csHZQ" opts={opts} onReady={onPlayerReady} />;

};

export default StreamVideo;
