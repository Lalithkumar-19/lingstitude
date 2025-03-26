import { Card, Flex, Text, Avatar, Button } from "@radix-ui/themes";
import { VideoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VideoChatCard = () => {
  const navigate = useNavigate();

  return (
    <Card 
      size="3"
      style={{ 
        maxWidth: 350,
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "white"
      }}
      onClick={() => navigate('/one-to-connect')}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Flex gap="4" align="center" justify="between">
        <Avatar
          size="5"
          radius="full"
          fallback={<VideoIcon size={28} strokeWidth={1.5} />}
          style={{ backgroundColor: "#fff", padding: "10px" }}
        />
        <Flex direction="column" gap="1" style={{ flex: 1 }}>
          <Text as="div" size="4" weight="bold" style={{ color: "#fff" }}>
            Random Video chat
          </Text>
          <Text as="div" size="3" color="gray" style={{ opacity: 1, color: "#f1f1f1" }}>
            Connect with random people on lingtitute and Practice English with them.Let's enhance the practice.
          </Text>
        </Flex>
        <Button 
          variant="solid" 
          className="p-4 mt-2 flex items-center place-content-center w-full h-10 text-center bg-white text-black"
          onClick={()=>navigate("/one-to-connect")}
        >
          Join
        </Button>
      </Flex>
    </Card>
  );
};
