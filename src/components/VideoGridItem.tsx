import { formatISODuration } from "../utils/formatISODuration";
import { VideoGridItemProps } from "../types/props/VideoGridItemProps";
import { formatTimeAgo } from "../utils/formatTimeAgo";
const VIEW_FROMATTER = Intl.NumberFormat(undefined, { notation: "compact" });

const { APP_YOUTUBE_URL } = import.meta.env;

export function VideoGridItem(video: VideoGridItemProps) {
  if (video.snippet.thumbnails.maxres === undefined) return;

  return (
    <div className="flex flex-col gap-4">
      <a
        href={`${APP_YOUTUBE_URL + video.id}`}
        className="relative aspect-video"
      >
        <img
          src={video?.snippet?.thumbnails?.maxres?.url}
          className={`block w-full h-full object-cover rounded-xl [border-radius] duration-200`}
          alt="Video"
        />

        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatISODuration(video.contentDetails.duration)}
        </div>
      </a>
      <div className="flex gap-2">
        <a href={`/@${video.snippet.channelId}`} className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
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
