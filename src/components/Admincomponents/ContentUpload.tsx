import React, { useState } from "react";
import { Label } from "recharts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";

const ContentUpload: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [videosrc, setVideosrc] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const batches = useSelector((state: RootState) => state.batch.batches);
  console.log("bat", batches);

  const handleUpload = async () => {
    if (!selectedBatch || !title || !videosrc) {
      toast({
        title: "Provide all requires",
        description: "Fill all fields",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axiosInstance.post("/api/admin/video-upload", {
        title: title,
        VideoUrl: videosrc,
        batchId: selectedBatch,
      });
      if (res.status == 200) {
        toast({
          title: "Successfully Uploaded",
          description: "yahoo..uploded",
        });
        setTitle("");
        setVideosrc("");
        setSelectedBatch("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 flex flex-col w-full border  p-4">
      <h2 className="text-2xl mb-3">Upload Content</h2>
      <div className="space-y-6 mb-10">
        <Label>Select Batch</Label>
        <select
          id="batch"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option>Select a batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.batch_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-ful flex-col gap-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title of video"
        />
        <Input
          value={videosrc}
          onChange={(e) => setVideosrc(e.target.value)}
          placeholder="Enter valid Video Src"
        />
        <Button onClick={() => handleUpload()}>Upload content</Button>
      </div>
    </div>
  );
};

export default ContentUpload;
