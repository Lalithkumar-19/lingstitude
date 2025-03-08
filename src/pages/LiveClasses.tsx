
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, Clock, Users, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ClassSession = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  teacher: string;
  batchId: string;
  meetingUrl?: string;
  joinUrl?: string;
};

const LiveClasses = () => {
  const navigate = useNavigate();
  const [upcomingClasses, setUpcomingClasses] = useState<ClassSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Live Classes | Lingstitude";
    
    // Mock data - in a real app, this would come from an API
    const mockClasses = [
      {
        id: "1",
        title: "Business Communication Essentials",
        description: "Learn key phrases and vocabulary for professional settings",
        date: "2023-10-15",
        time: "09:00",
        duration: "60 minutes",
        teacher: "Sarah Johnson",
        batchId: "batch-2023-A",
        joinUrl: "https://zoom.us/j/example1"
      },
      {
        id: "2",
        title: "Interview Skills Workshop",
        description: "Practice answering common interview questions with confidence",
        date: "2023-10-16",
        time: "15:30",
        duration: "90 minutes",
        teacher: "David Chen",
        batchId: "batch-2023-A",
        joinUrl: "https://zoom.us/j/example2"
      },
      {
        id: "3",
        title: "Presentation Techniques",
        description: "Master the art of delivering engaging presentations in English",
        date: "2023-10-18",
        time: "11:00",
        duration: "75 minutes",
        teacher: "Michelle Williams",
        batchId: "batch-2023-B",
        joinUrl: "https://zoom.us/j/example3"
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setUpcomingClasses(mockClasses);
      setIsLoading(false);
    }, 800);
  }, []);

  const joinClass = (classSession: ClassSession) => {
    // In production, this would handle Zoom SDK integration or redirect to Zoom
    if (classSession.joinUrl) {
      window.open(classSession.joinUrl, "_blank");
      toast({
        title: "Joining class",
        description: `You're joining ${classSession.title}`,
      });
    } else {
      toast({
        title: "Unable to join",
        description: "Meeting link is not available yet",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Live Classes</h1>
            <p className="text-lg text-muted-foreground">
              Join interactive English sessions led by expert tutors to enhance your communication skills
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse flex flex-col space-y-4 w-full">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : upcomingClasses.length > 0 ? (
            <div className="grid gap-6">
              {upcomingClasses.map((classSession) => (
                <Card key={classSession.id} className="transition-all hover:shadow-md">
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
                        <span>{classSession.time} • {classSession.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Teacher: {classSession.teacher}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate(`/batches?id=${classSession.batchId}`)}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Materials
                    </Button>
                    <Button onClick={() => joinClass(classSession)}>
                      <Video className="h-4 w-4 mr-2" />
                      Join Class
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No upcoming classes</h3>
              <p className="text-muted-foreground mb-6">
                There are no scheduled classes at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveClasses;
