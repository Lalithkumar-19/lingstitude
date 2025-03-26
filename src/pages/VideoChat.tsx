import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { Button } from "@/components/ui/button";
import { PhoneOff } from "lucide-react";

const VideoChat = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isMatching, setIsMatching] = useState(false);

  const peerInstance = useRef<Peer | null>(null);
  const socketRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const currentCall = useRef<Peer.MediaConnection | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize Peer and Socket
  useEffect(() => {
    // Create Peer instance
    const peer = new Peer({
      debug: 3,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" },
        ],
      },
    });

    peer.on("open", (id) => {
      console.log("My peer ID:", id);
      setPeerId(id);
    });

    peer.on("call", async (call) => {
      try {
        console.log("Receiving call from:", call.peer);
        const stream = await getMediaStream();
        call.answer(stream);

        call.on("stream", (remoteStream) => {
          console.log("Received remote stream from answer");
          setRemoteVideo(remoteStream);
          setRemotePeerId(call.peer);
          setConnectionStatus("connected");
        });

        call.on("close", () => {
          console.log("Call closed by remote peer");
          endCall();
        });

        currentCall.current = call;
      } catch (error) {
        console.error("Error answering call:", error);
        endCall();
      }
    });

    peer.on("error", (err) => {
      console.error("PeerJS error:", err);
      endCall();
    });

    // Create Socket connection
    const socket = io("http://localhost:5001", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("match-found", (data) => {
      console.log("Matched with peer:", data.peerId);
      setRemotePeerId(data.peerId);
      initiateCall(data.peerId);
    });

    socket.on("partner-disconnected", () => {
      console.log("Partner disconnected");
      endCall();
    });

    peerInstance.current = peer;
    socketRef.current = socket;

    return () => {
      endCall();
      if (peer) peer.destroy();
      if (socket) socket.disconnect();
    };
  }, []);

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  };

  const setRemoteVideo = (stream: MediaStream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
    }
  };

  const initiateCall = async (remotePeerId: string) => {
    if (!peerInstance.current || !remotePeerId) return;

    try {
      setIsMatching(false);
      setConnectionStatus("connecting");

      const stream = await getMediaStream();
      console.log("Calling peer:", remotePeerId);

      const call = peerInstance.current.call(remotePeerId, stream);
      currentCall.current = call;

      call.on("stream", (remoteStream) => {
        console.log("Received remote stream from call");
        setRemoteVideo(remoteStream);
        setConnectionStatus("connected");
      });

      call.on("close", () => {
        console.log("Call closed");
        endCall();
      });

      call.on("error", (err) => {
        console.error("Call error:", err);
        endCall();
      });
    } catch (error) {
      console.error("Error initiating call:", error);
      endCall();
    }
  };

  const startRandomCall = async () => {
    if (!peerId || !socketRef.current) return;

    try {
      setIsMatching(true);
      setConnectionStatus("connecting");

      await getMediaStream();
      socketRef.current.emit("join-video-chat", peerId);

      // Timeout after 30 seconds if no match found
      setTimeout(() => {
        if (connectionStatus === "connecting") {
          endCall();
          alert("No match found. Please try again.");
        }
      }, 30000);
    } catch (error) {
      console.error("Error starting call:", error);
      endCall();
    }
  };

  const endCall = () => {
    console.log("Ending call and cleaning up...");

    if (currentCall.current) {
      currentCall.current.close();
      currentCall.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setRemotePeerId("");
    setIsMatching(false);
    setConnectionStatus("disconnected");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Random Practice </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-64 h-48 bg-black rounded-lg border-2 border-blue-500"
          />
          <span className="mt-2 text-sm">Your Camera</span>
        </div>
        <div className="flex flex-col items-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-64 h-48 bg-black rounded-lg border-2 border-green-500"
          />
          <span className="mt-2 text-sm">Partner Camera</span>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Button
          onClick={startRandomCall}
          disabled={isMatching || connectionStatus === "connected"}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isMatching ? "Searching for partner..." : "Start Random Chat"}
        </Button>
        <Button
          onClick={endCall}
          disabled={connectionStatus !== "connected"}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <PhoneOff className="w-5 h-5" /> End Call
        </Button>
      </div>

      <div className="space-y-2 text-center">
        <div className="text-sm text-gray-600">
          Your ID: {peerId || "Generating..."}
        </div>
        {remotePeerId && (
          <div className="text-sm text-green-600">
            Connected to: {remotePeerId}
          </div>
        )}
        {connectionStatus === "connecting" && (
          <div className="text-sm text-blue-600">
            Establishing connection...
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
