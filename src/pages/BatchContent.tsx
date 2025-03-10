
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Calendar, Download, Clock, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type BatchDetails = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  modules: Module[];
  upcomingClasses: ClassSession[];
  completedClasses: ClassSession[];
};

type Module = {
  id: string;
  title: string;
  description: string;
  materials: Material[];
};

type Material = {
  id: string;
  title: string;
  type: "pdf" | "video" | "presentation";
  url: string;
  dateAdded: string;
  size?: string;
};

type ClassSession = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  teacher: string;
  recording?: string;
  materials?: Material[];
};

const BatchContent = () => {
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("id") || "batch-2023-A"; // Default to first batch if none specified
  const [batchDetails, setBatchDetails] = useState<BatchDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Batch Content | Lingstitude";
    
    // Fetch batch details - this would come from your API in a real app
    const fetchBatchDetails = async () => {
      setIsLoading(true);
      
      // Mock data
      const mockBatchDetails: BatchDetails = {
        id: batchId,
        name: batchId === "batch-2023-A" ? "Professional Communication 2023-A" : "Interview Skills Workshop 2023-B",
        description: batchId === "batch-2023-A" 
          ? "A comprehensive program focused on business English and professional communication skills for career advancement."
          : "Intensive training designed to help you excel in job interviews through practical exercises and real-world scenarios.",
        startDate: batchId === "batch-2023-A" ? "September 1, 2023" : "October 5, 2023",
        endDate: batchId === "batch-2023-A" ? "December 15, 2023" : "November 30, 2023",
        modules: [
          {
            id: "module-1",
            title: "Foundation Skills",
            description: "Core communication concepts and vocabulary building",
            materials: [
              {
                id: "m1-1",
                title: "Business English Vocabulary Guide",
                type: "pdf",
                url: "#",
                dateAdded: "2023-09-05",
                size: "2.4 MB"
              },
              {
                id: "m1-2",
                title: "Email Writing Best Practices",
                type: "pdf",
                url: "#",
                dateAdded: "2023-09-07",
                size: "1.8 MB"
              },
              {
                id: "m1-3",
                title: "Introduction to Business Communication",
                type: "video",
                url: "#",
                dateAdded: "2023-09-10"
              }
            ]
          },
          {
            id: "module-2",
            title: "Professional Interactions",
            description: "Meetings, presentations, and networking skills",
            materials: [
              {
                id: "m2-1",
                title: "Effective Meeting Participation",
                type: "pdf",
                url: "#",
                dateAdded: "2023-09-15",
                size: "3.1 MB"
              },
              {
                id: "m2-2",
                title: "Presentation Skills Handbook",
                type: "pdf",
                url: "#",
                dateAdded: "2023-09-18",
                size: "4.5 MB"
              },
              {
                id: "m2-3",
                title: "Networking Phrases and Strategies",
                type: "presentation",
                url: "#",
                dateAdded: "2023-09-20",
                size: "5.2 MB"
              }
            ]
          }
        ],
        upcomingClasses: [
          {
            id: "c1",
            title: "Business Communication Essentials",
            date: "2023-10-15",
            time: "09:00",
            duration: "60 minutes",
            description: "Learn key phrases and vocabulary for professional settings",
            teacher: "Sarah Johnson"
          },
          {
            id: "c2",
            title: "Presentation Techniques",
            date: "2023-10-18",
            time: "11:00",
            duration: "75 minutes",
            description: "Master the art of delivering engaging presentations in English",
            teacher: "Michelle Williams"
          }
        ],
        completedClasses: [
          {
            id: "c0",
            title: "Introduction and Course Overview",
            date: "2023-09-05",
            time: "10:00",
            duration: "90 minutes",
            description: "Course introduction, expectations, and overview of the curriculum",
            teacher: "David Chen",
            recording: "#",
            materials: [
              {
                id: "c0-m1",
                title: "Course Syllabus",
                type: "pdf",
                url: "#",
                dateAdded: "2023-09-05",
                size: "1.2 MB"
              }
            ]
          }
        ]
      };
      
      // Simulate API call
      setTimeout(() => {
        setBatchDetails(mockBatchDetails);
        setIsLoading(false);
      }, 800);
    };
    
    fetchBatchDetails();
  }, [batchId]);

  const handleDownload = (material: Material) => {
    // In a real app, this would trigger a file download
    toast({
      title: "Download started",
      description: `Downloading ${material.title}`,
    });
  };

  const handleViewRecording = (classSession: ClassSession) => {
    // In a real app, this would open the recording
    if (classSession.recording) {
      toast({
        title: "Opening recording",
        description: `Opening recording for ${classSession.title}`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-[200px] bg-muted rounded"></div>
              <div className="h-[200px] bg-muted rounded"></div>
              <div className="h-[200px] bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!batchDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Batch not found</h2>
            <p className="text-muted-foreground">The requested batch could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{batchDetails.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {batchDetails.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{batchDetails.startDate} to {batchDetails.endDate}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="materials">Course Materials</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Learning Materials
                  </CardTitle>
                  <CardDescription>
                    Access all course modules and learning resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {batchDetails.modules.map((module) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="text-left">
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-1">
                            {module.materials.map((material) => (
                              <div 
                                key={material.id} 
                                className="flex items-center justify-between p-3 rounded-lg border"
                              >
                                <div className="flex items-center gap-3">
                                  {material.type === "pdf" && (
                                    <FileText className="h-5 w-5 text-red-500" />
                                  )}
                                  {material.type === "video" && (
                                    <Video className="h-5 w-5 text-blue-500" />
                                  )}
                                  {material.type === "presentation" && (
                                    <FileText className="h-5 w-5 text-orange-500" />
                                  )}
                                  <div>
                                    <p className="font-medium">{material.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Added on {new Date(material.dateAdded).toLocaleDateString()}
                                      {material.size && ` • ${material.size}`}
                                    </p>
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDownload(material)}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="classes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Scheduled Classes
                  </CardTitle>
                  <CardDescription>
                    View your upcoming and past classes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Upcoming Classes</h3>
                      {batchDetails.upcomingClasses.length > 0 ? (
                        <div className="space-y-3">
                          {batchDetails.upcomingClasses.map((classSession) => (
                            <div 
                              key={classSession.id} 
                              className="p-4 rounded-lg border"
                            >
                              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
                                <h4 className="font-medium">{classSession.title}</h4>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(classSession.date).toLocaleDateString()}</span>
                                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                  <span>{classSession.time} • {classSession.duration}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {classSession.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Teacher: {classSession.teacher}</span>
                                <Button variant="default" size="sm">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Add to Calendar
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No upcoming classes scheduled.</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Past Classes</h3>
                      {batchDetails.completedClasses.length > 0 ? (
                        <div className="space-y-3">
                          {batchDetails.completedClasses.map((classSession) => (
                            <div 
                              key={classSession.id} 
                              className="p-4 rounded-lg border"
                            >
                              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
                                <h4 className="font-medium">{classSession.title}</h4>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(classSession.date).toLocaleDateString()}</span>
                                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                  <span>{classSession.time} • {classSession.duration}</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {classSession.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {classSession.recording && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewRecording(classSession)}
                                  >
                                    <Video className="h-4 w-4 mr-1" />
                                    View Recording
                                  </Button>
                                )}
                                
                                {(classSession.materials && classSession.materials.length > 0) && (
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Class Materials
                                  </Button>
                                )}
                              </div>
                              
                              <div className="text-sm">
                                Teacher: {classSession.teacher}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No past classes yet.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BatchContent;
