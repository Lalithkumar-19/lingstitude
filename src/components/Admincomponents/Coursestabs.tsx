import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileText, FolderPlus, Calendar, Users, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
// import { ScheduleCard } from './ScheduleCard';

type Batch = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  studentsCount: number;
  description: string;
};


const Coursestabs:React.FC = () => {



const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [newClassTitle, setNewClassTitle] = useState("");
  const [newClassDate, setNewClassDate] = useState("");
  const [newClassTime, setNewClassTime] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");



  const [scheduledClassses,setScheduledClasses]=useState([1,2,3,4,5]);

  useEffect(() => {
    document.title = "Admin Dashboard | Lingstitude";
    
    // Mock batches data
    const mockBatches = [
      {
        id: "batch-2023-A",
        name: "Professional Communication 2023-A",
        startDate: "2023-09-01",
        endDate: "2023-12-15",
        studentsCount: 24,
        description: "Focus on business English and professional communication"
      },
      {
        id: "batch-2023-B",
        name: "Interview Skills Workshop 2023-B",
        startDate: "2023-10-05",
        endDate: "2023-11-30",
        studentsCount: 18,
        description: "Intensive training for job interviews and career advancement"
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setBatches(mockBatches);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) {
      toast({
        title: "Error",
        description: "Please select a batch",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }

    // Here you would handle the actual file upload to your server
    // using FormData and fetch or axios
    
    toast({
      title: "Upload started",
      description: `Uploading ${selectedFiles.length} file(s) to ${selectedBatch}`,
    });
    
    // Simulate successful upload
    setTimeout(() => {
      toast({
        title: "Upload complete",
        description: `${selectedFiles.length} file(s) uploaded successfully`,
      });
      setSelectedFiles(null);
      // Reset the file input
      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 2000);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBatch || !newClassTitle || !newClassDate || !newClassTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would send the class data to your API
    toast({
      title: "Class scheduled",
      description: `${newClassTitle} has been scheduled for ${newClassDate} at ${newClassTime}`,
    });
    
    // Reset form
    setNewClassTitle("");
    setNewClassDate("");
    setNewClassTime("");
    setNewClassDescription("");
  };
  return (
    <Tabs defaultValue="materials" className="w-full">
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
                            {batch.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fileUpload">Upload Files</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Input
                          id="fileUpload"
                          type="file"
                          multiple
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
                        
                        {selectedFiles && selectedFiles.length > 0 && (
                          <div className="mt-4 text-left border rounded-md p-3 bg-muted/50">
                            <p className="font-medium mb-2">Selected files:</p>
                            <ul className="text-sm space-y-1">
                              {Array.from(selectedFiles).map((file, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </li>
                              ))}
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



            {/* //second one */}
            
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
                            {batch.name}
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

              <div className='flex w-full place-items-center place-content-center border-blue-600 border-b border-spacing-4'>
              <h2 className='text-center text-3xl'> Scheduled Classes</h2>
              <div>
               <div>
             {scheduledClassses.length !== 0 && scheduledClassses.map((item) => {
                return 1 
              })}

              </div>
              </div>
              </div>

            </TabsContent>
          </Tabs>

  )
}

export default Coursestabs;