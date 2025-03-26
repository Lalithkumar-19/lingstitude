import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Mic,
  MicOff,
  Phone,
  MessageCircle,
  MessagesSquare,
  UserPlus,
  Loader2,
  Send,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: string;
  sender: "user" | "partner";
  text: string;
  timestamp: Date;
};

type ConversationTopic = {
  id: string;
  title: string;
  description: string;
  prompts: string[];
};

const topics: ConversationTopic[] = [
  {
    id: "t1",
    title: "Job Interview Practice",
    description: "Practice answering common job interview questions",
    prompts: [
      "Tell me about yourself.",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in five years?",
      "Why are you interested in this position?",
      "Describe a challenge you faced at work and how you overcame it.",
    ],
  },
  {
    id: "t2",
    title: "Business Meeting",
    description: "Practice participating in a business meeting",
    prompts: [
      "Let's discuss the quarterly results.",
      "What do you think about the new project proposal?",
      "How can we improve our team's productivity?",
      "Do you have any suggestions for the upcoming client presentation?",
      "Let's brainstorm solutions to the current challenge.",
    ],
  },
  {
    id: "t3",
    title: "Networking Event",
    description: "Practice conversation starters and small talk",
    prompts: [
      "What brings you to this event?",
      "Tell me about your work/studies.",
      "Have you attended any interesting events lately?",
      "What do you think about [current industry trend]?",
      "Would you like to connect and discuss potential collaboration?",
    ],
  },
];

const PracticePartner = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<ConversationTopic | null>(
    null
  );
  const [activeTopic, setActiveTopic] = useState<ConversationTopic | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Practice Partner | Lingstitude";
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleConnect = () => {
    if (!selectedTopic) {
      toast({
        title: "Please select a topic",
        description: "Choose a conversation topic before connecting",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    setIsMatching(true);

    // Simulate finding a partner
    setTimeout(() => {
      setIsMatching(false);
      setIsConnected(true);
      setActiveTopic(selectedTopic);

      // Add welcome message from partner
      addMessage(
        "partner",
        `Hello! I'm your practice partner. Let's practice English conversation with the "${selectedTopic.title}" topic. I'll start with a question: ${selectedTopic.prompts[0]}`
      );

      toast({
        title: "Connected",
        description: "You are now connected with a practice partner",
      });
    }, 3000);
  };

  const handleDisconnect = () => {
    setIsConnecting(false);
    setIsConnected(false);
    setIsMicActive(false);
    setMessages([]);
    setActiveTopic(null);

    toast({
      title: "Disconnected",
      description: "You have disconnected from your practice partner",
    });
  };

  const toggleMic = () => {
    // In a real app, this would handle microphone permissions and streaming
    setIsMicActive(!isMicActive);

    if (!isMicActive) {
      toast({
        title: "Microphone activated",
        description: "Your practice partner can now hear you",
      });
    } else {
      toast({
        title: "Microphone muted",
        description: "Your microphone is now muted",
      });
    }
  };

  const addMessage = (sender: "user" | "partner", text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!messageInput.trim() || !isConnected) return;

    // Add user message
    addMessage("user", messageInput);
    setMessageInput("");

    // Simulate partner response after a delay
    setTimeout(() => {
      if (activeTopic) {
        const randomPrompt =
          activeTopic.prompts[
            Math.floor(Math.random() * activeTopic.prompts.length)
          ];
        const responses = [
          "That's interesting! " + randomPrompt,
          "I see. Let me ask you this: " + randomPrompt,
          "Great point! Now, " + randomPrompt,
          "Thanks for sharing that. " + randomPrompt,
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        addMessage("partner", randomResponse);
      }
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Practice Partner
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with another person to practice your English speaking and
              listening skills
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessagesSquare className="h-5 w-5" />
                    Conversation Topics
                  </CardTitle>
                  <CardDescription>
                    Select a topic to practice with your partner
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedTopic?.id === topic.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => !isConnected && setSelectedTopic(topic)}
                    >
                      <h3 className="font-medium mb-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  {!isConnected ? (
                    <Button
                      className="w-full"
                      onClick={handleConnect}
                      disabled={isConnecting || !selectedTopic}
                    >
                      {isMatching ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Finding a partner...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect with Partner
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleDisconnect}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Disconnect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Conversation
                    </div>
                    {isConnected && (
                      <Button
                        variant={isMicActive ? "default" : "outline"}
                        size="sm"
                        onClick={toggleMic}
                      >
                        {isMicActive ? (
                          <>
                            <Mic className="h-4 w-4 mr-2" />
                            Mic On
                          </>
                        ) : (
                          <>
                            <MicOff className="h-4 w-4 mr-2" />
                            Mic Off
                          </>
                        )}
                      </Button>
                    )}
                  </CardTitle>
                  {activeTopic && (
                    <CardDescription>
                      Current topic: {activeTopic.title}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  {isConnected ? (
                    <div className="flex flex-col h-full">
                      <ScrollArea className="flex-1 pr-4 mb-4 h-[300px]">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.sender === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  message.sender === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                <p>{message.text}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      <form onSubmit={sendMessage} className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button type="submit" disabled={!messageInput.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center p-8">
                      <div>
                        <MessagesSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          Not Connected
                        </h3>
                        <p className="text-muted-foreground">
                          Select a conversation topic and connect with a
                          practice partner to start practicing your English
                          skills.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticePartner;
