import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText, Clock, Users, Calendar } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";

const BatchDashboard = () => {
  const [batchData, setBatchData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track the selected video
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const res = await axiosInstance.get("api/batch/get-batch?batch_name=Batch 1");
        if (res.status === 200) {
          setBatchData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching batch details", error);
      }
    };
    fetchBatchDetails();
  }, []);

  // Function to handle play button click
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
        {batchData?.batch_name || "Batch 1"}
      </h1>

      {/* Live Classes Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Live Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full gap-2 flex-wrap place-items-center">
            {batchData?.scheduledClasses.length ? (
              batchData.scheduledClasses.map((classSession) => (
                <Card key={classSession.id} className="max-w-[500px] transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      {classSession.title}
                    </CardTitle>
                    <CardDescription>{classSession.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(classSession.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{classSession.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button>
                      <Video className="h-4 w-4 mr-2" />
                      Join Class
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No live classes scheduled.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video Content Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Video className="w-5 h-5" /> Video Content
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* PDF Course Materials Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="w-5 h-5" /> PDF Course Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          {batchData?.course_content.length ? (
            batchData.course_content.map((pdf, idx) => (
              <div key={idx} className="p-2 border-b flex justify-between">
                <span>{pdf.title}</span>
                <a href={pdf.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Download
                </a>
              </div>
            ))
          ) : (
            <p>No PDFs available.</p>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
};

export default BatchDashboard;