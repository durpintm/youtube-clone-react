import { useEffect, useRef, useState } from "react";
import { formatISODuration } from "../utils/formatISODuration";
import { VideoGridItemProps } from "../types/props/VideoGridItemProps";
import { formatTimeAgo } from "../utils/formatTimeAgo";
const VIEW_FROMATTER = Intl.NumberFormat(undefined, { notation: "compact" });

export function VideoGridItem(video: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log(video.snippet.publishedAt);
  useEffect(() => {
    if (videoRef.current == null) return;
    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${video.id}`} className="relative aspect-video">
        <img
          src={video.snippet.thumbnails.high.url}
          className={`block w-full h-full object-cover rounded-xl [border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
          alt="Video"
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatISODuration(video.contentDetails.duration)}
        </div>
        <video
          ref={videoRef}
          muted
          playsInline
          src=""
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100  delay-200" : "opacity-0"
          }`}
        ></video>
      </a>
      <div className="flex gap-2">
        <a href={`/@${video.snippet.channelId}`} className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full"
            src="https://yt3.ggpht.com/ytc/AIdro_nU1bLokw7ikO-pkRrikJlgIlmSWCgdt0T2QnL-tR_2Mw=s88-c-k-c0x00ffffff-no-rj"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${video.id}`} className="font-bold">
            {video.snippet.title}
          </a>
          <a
            href={`/@${video.snippet.channelId}`}
            className="text-secondary-text text-sm"
          >
            {video.snippet.channelTitle}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FROMATTER.format(parseInt(video.statistics.viewCount))} Views
            • {formatTimeAgo(video.snippet.publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
