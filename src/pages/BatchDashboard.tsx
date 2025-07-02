import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Videotape } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import BatchContent from "./BatchContent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { VideoChatCard } from "@/components/videochat/VideoChatCard";
import { ThoughtDayCard } from "@/components/thoughtforday/ThoughtDayCard";

const extractYouTubeID = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
  );
  return match ? match[1] : null;
};

interface Article {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
}

type Thought = {
  content: string;
  author: string;
};

const BatchDashboard = () => {
  const [batchData, setBatchData] = useState({ course_videos: [] });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const enrolled_batch = useSelector(
    (state: RootState) => state.user.enrolled_batch
  );

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/api/batch/get-batch?batch_name=${enrolled_batch}`
        );
        if (res.status === 200) {
          setBatchData({ ...res.data.data }); // Ensure a full re-render
        }
      } catch (error) {
        console.error("Error fetching batch details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatchDetails();
  }, [enrolled_batch]); // Ensure it re-fetches when `enrolled_batch` changes

  const handlePlayClick = (videoUrl) => {
    const videoID = extractYouTubeID(videoUrl);
    if (videoID) {
      setSelectedVideo(videoID);
      setIsModalOpen(true);
    } else {
      console.error("Invalid YouTube URL:", videoUrl);
    }
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const [articles, setArticles] = useState<Article[]>([]);

  const fetchNews = async () => {
    try {
      const { data } = await axiosInstance.get("/api/external/news", {
        params: { country: "us", category: "general" },
      });
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const [thought, setThought] = useState<Thought | null>(null);

  const fetchThought = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/external/thoughts");
      console.log("API Response:", response.data);

      // Set the thought object directly from response.data
      setThought(response.data);
    } catch (error) {
      console.error("Error fetching thought:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThought();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Student Dashboard
      </h1>

      {/* Modal for Selected Video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
            <Button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              ✖
            </Button>
            <iframe
              className="w-full h-96 rounded-md"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <BatchContent />
      <h2 className="pl-7 text-2xl">Interact For This Day</h2>
      <div className="mt-10 flex md:flex-row flex-col w-full gap-10 items-center place-content-center">
        <VideoChatCard />
        {thought && (
          <ThoughtDayCard
            content={thought.content}
            author={thought.author}
            heading={"Thought For A Day"}
          />
        )}
      </div>

      {/* Show loading indicator */}
      {loading ? (
        <p className="text-center text-gray-600 mt-4">Loading videos...</p>
      ) : (
        <Card className="mb-10 mt-10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Video className="w-5 h-5" /> Video Content
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row w-full overflow-x-scroll gap-4">
            {batchData.course_videos.length ? (
              batchData.course_videos.map((video, idx) => {
                const videoID = extractYouTubeID(video.videoUrl);
                return (
                  <div key={idx} className="bg-white p-3 rounded-md shadow-md">
                    <h3 className="font-semibold">{video.title}</h3>
                    <div className="relative">
                      {videoID ? (
                        <iframe
                          className="w-full h-48 rounded-md mt-2"
                          src={`https://www.youtube.com/embed/${videoID}?autoplay=0`}
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <p className="text-red-500">Invalid Video URL</p>
                      )}
                      {videoID && (
                        <Button
                          onClick={() => handlePlayClick(video.videoUrl)}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md hover:bg-opacity-70"
                        >
                          ▶
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No video content available.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* News Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-5">
        {articles.map((article, index) => (
          <Card key={index} className="bg-white shadow-md rounded-2xl">
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
            )}
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {article.description || "No description available."}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Source: {article.source}
              </p>
              <p className="text-xs text-gray-400">
                Published: {new Date(article.publishedAt).toLocaleString()}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <Button variant="link" className="text-blue-600 mt-3">
                  Read more
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BatchDashboard;
