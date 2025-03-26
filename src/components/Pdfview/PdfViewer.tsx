import React from "react";

interface PDFViewerProps {
  driveUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ driveUrl }) => {
  const getEmbedUrl = (url: string) => {
    const match = url.match(/file\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold mb-2">Linstitute PDF Viewer</h2>
      <iframe
        src={getEmbedUrl(driveUrl)}
        width="100%"
        height="700px"
        className="border shadow-md"
      ></iframe>
    </div>
  );
};

export default PDFViewer;
