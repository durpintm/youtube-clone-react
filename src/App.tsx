import { PageHeader } from "./layouts/PageHeader";
import { CategoryPills } from "./components/CategoryPills";
import { categories } from "./data/home";
import { useEffect, useState } from "react";
import { VideoGridItem } from "./components/VideoGridItem";
import { Sidebar } from "./layouts/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import store from "./utils/redux/store";
import { Provider } from "react-redux";
import { VideoGridItemProps } from "./Types/VideoGridItems";

const { APP_GOOGLE_API_KEY, APP_YOUTUBE_VIDEOS_API } = import.meta.env;

const videosApiUrl: string = APP_YOUTUBE_VIDEOS_API.replace(
  "{APP_GOOGLE_API_KEY}",
  APP_GOOGLE_API_KEY
);
// console.log(videosApiUrl);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [videos, setVideos] = useState<VideoGridItemProps[]>([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(videosApiUrl);
    const json = await data.json();
    const yvideos = json.items as VideoGridItemProps[];
    setVideos(yvideos);
  };

  console.log(videos[0]);

  if (videos.length === 0) return;

  return (
    <Provider store={store}>
      <SidebarProvider>
        <div className="max-h-screen flex flex-col">
          <PageHeader />
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
            <div className="overflow-x-hidden px-8 pb-4">
              <div className="sticky top-0 bg-white z-10 pb-4">
                <CategoryPills
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {videos.map((video, index) => (
                  <VideoGridItem key={index} {...video} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Provider>
  );
}
