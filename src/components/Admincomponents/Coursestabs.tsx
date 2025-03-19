import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileText, FolderPlus, Calendar, Users, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScheduleCard, ScheduleTypes } from './ScheduleCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import axiosInstance from '@/lib/axiosInstance';
import { addSchedule } from '@/redux/schedulesSlice';

export type Batch = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  studentsCount: number;
  description: string;
};


const Coursestabs:React.FC = () => {

  const dispatch=useDispatch<AppDispatch>();
  const batches=useSelector((state:RootState)=>state.batch.batches);



  const [selectedFiles, setSelectedFiles] = useState<File| null>(null);
  // const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [newClassTitle, setNewClassTitle] = useState("");
  const [newClassDate, setNewClassDate] = useState("");
  const [newClassTime, setNewClassTime] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [title,setTitle]=useState<string>("");



  const scheduleData:any[]=useSelector((state:RootState)=>state.schedule.schedules);

console.log("sc d",scheduleData);




  useEffect(() => {
    document.title = "Admin Dashboard | Lingstitude";
  }, []);




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files[0]);
    }
  };






  const handleUpload = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch||title.trim()=="") {
      toast({
        title: "Error",
        description: "Please select a batch or give title",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedFiles) {
      toast({
        title: "Error",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Upload started",
      description: `Uploading file(s) to ${selectedBatch}`,
    });
     const formdata=new FormData();
     formdata.set("file",selectedFiles[0]);
     formdata.set("batch_name",selectedBatch);
     formdata.set("title",title);
    const res=await axiosInstance.post("/api/admin/upload-pdf",formdata);

    if(res.status==200){
       toast({
        title: "Upload complete",
        description: `file(s) uploaded successfully`,
      });
       setSelectedFiles(null);
    }
      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
  };




  const handleCreateClass = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBatch || !newClassTitle || !newClassDate || !newClassTime||!newClassDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    const res=await axiosInstance.post("/api/admin/schedule",{
      batchId:selectedBatch,
      title:newClassTitle,
      date:newClassDate,
      time:newClassTime,
      description:newClassDescription,
    });
    if(res.status==201){
      console.log(res.data.class,"data from schedul")
      dispatch(addSchedule(res.data.class));
      toast({
        title:"Class Scheduled successfully",
        description:"class is scheduled"
      })
    }    
    
    // Reset form
    setNewClassTitle("");
    setNewClassDate("");
    setNewClassTime("");
    setNewClassDescription("");
  };






  return (
    <Tabs defaultValue="materials" className="w-full border pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="materials">Upload Materials</TabsTrigger>
              <TabsTrigger value="classes">Schedule Classes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Course Materials
                  </CardTitle>
                  <CardDescription>
                    Upload PDF documents, presentations, and other resources for your classes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="batch">Select Batch</Label>
                      <select
                        id="batch"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select a batch</option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.batch_name}
                          </option>
                        ))}
                      </select>

                      <Input placeholder='please enter the file name' className='mt-6' value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fileUpload">Upload Files</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Input
                          id="fileUpload"
                          type="file"
                          accept=".pdf,.ppt,.pptx,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Label 
                          htmlFor="fileUpload" 
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                          <span className="text-lg font-medium mb-1">
                            Drag & drop files or click to browse
                          </span>
                          <span className="text-sm text-muted-foreground">
                            PDF, PPT, Word documents (max 50MB each)
                          </span>
                        </Label>
                        
                        {selectedFiles && (
                          <div className="mt-4 text-left border rounded-md p-3 bg-muted/50">
                            <p className="font-medium mb-2">Selected files:</p>
                            <ul className="text-sm space-y-1">
                             {selectedFiles&&
                                <li  className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  {selectedFiles.name} ({(selectedFiles.size / 1024 / 1024).toFixed(2)} MB)
                                </li>
                                }

                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Materials
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            


            <TabsContent value="classes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule a New Class
                  </CardTitle>
                  <CardDescription>
                    Create and schedule new live classes for your students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateClass} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="class-batch">Select Batch</Label>
                      <select
                        id="class-batch"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select a batch</option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.batch_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="class-title">Class Title</Label>
                      <Input
                        id="class-title"
                        value={newClassTitle}
                        onChange={(e) => setNewClassTitle(e.target.value)}
                        placeholder="e.g. Business Communication Essentials"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class-date">Date</Label>
                        <Input
                          id="class-date"
                          type="date"
                          value={newClassDate}
                          onChange={(e) => setNewClassDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class-time">Time</Label>
                        <Input
                          id="class-time"
                          type="time"
                          value={newClassTime}
                          onChange={(e) => setNewClassTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="class-description">Description</Label>
                      <Textarea
                        id="class-description"
                        value={newClassDescription}
                        onChange={(e) => setNewClassDescription(e.target.value)}
                        placeholder="Describe what students will learn in this class"
                        rows={3}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Class
                    </Button>
                  </form>
                </CardContent>

              </Card>

              <div className='flex w-full flex-col place-items-start place-content-start border-blue-700 border-b border-spacing-10'>
                  <h2 className='text-center text-3xl pl-2'> Scheduled Classes</h2>
                <div className='grid md:grid-cols-2 gap-3 p-3'>
                    {scheduleData.map((schedule, index) => {
                    return <ScheduleCard key={index} {...schedule} />
                      })}
                  </div>
                  {scheduleData.length===0&&
                  <h2 className='pl-2'>No schedules till now</h2>
                  }
              <br/>

              </div>

            </TabsContent>
          </Tabs>

  )
}

export default Coursestabs;