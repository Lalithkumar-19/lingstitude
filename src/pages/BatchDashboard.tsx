import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText, Clock, Users, Calendar } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import BatchContent from "./BatchContent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const BatchDashboard = () => {

  const [batchData, setBatchData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track the selected video
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const enrolled_batch=useSelector((state:RootState)=>state.user.enrolled_batch);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        
        const res = await axiosInstance.get(`/api/batch/get-batch?batch_name=${enrolled_batch}`);
        console.log(res.data.data,"datch data");
        if (res.status === 200) {
          setBatchData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching batch details", error);
      }
    };
    fetchBatchDetails();
  }, []);  // Function to handle play button click
  const handlePlayClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
            <iframe
              className="w-full h-96 rounded-md"
              src={`https://www.youtube.com/embed/${selectedVideo.split("v=")[1]}?autoplay=1`} // Autoplay is enabled in the modal
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}



      <BatchContent />



      {/* Video Content Section */}
      <Card className=" mb-10m mt-100">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Video className="w-5 h-5" /> Video Content
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row w-full overflow-x-scroll gap-4 ">
          {batchData?.course_videos.length ? (
            batchData.course_videos.map((video, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-md shadow-md"
              >
                <h3 className="font-semibold">{video.title}</h3>
                <div className="relative">
                  <iframe
                    className="w-full h-48 rounded-md mt-2"
                    src={`https://www.youtube.com/embed/${video.videoUrl.split("v=")[1]}?autoplay=0`} // Autoplay is disabled initially
                    allowFullScreen
                  ></iframe>
                  <Button
                    onClick={() => handlePlayClick(video.videoUrl)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md hover:bg-opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No video content available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchDashboard;