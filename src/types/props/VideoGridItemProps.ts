export type VideoGridItemProps = {
  id: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    title: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: number;
        width: number;
        url: string;
      };
      high: {
        height: number;
        width: number;
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    commentCount: string;
    likeCount: string;
    viewCount: string;
  };
};
