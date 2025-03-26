import React from "react";
import { useSearchParams } from "react-router-dom";
import PDFViewer from "@/components/Pdfview/PdfViewer";

const Pdfview = () => {
  const [searchParams] = useSearchParams();
  const googleDriveLink = searchParams.get("link");

  if (!googleDriveLink) {
    return <p className="text-red-500">Invalid PDF link</p>;
  }

  return (
    <div className="p-6">
      <PDFViewer driveUrl={googleDriveLink} />
    </div>
  );
};

export default Pdfview;
