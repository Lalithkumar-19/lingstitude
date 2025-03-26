import { Card, Flex, Text, Avatar, Button } from "@radix-ui/themes";
import { Newspaper, PercentSquareIcon } from "lucide-react";

export const ThoughtDayCard = ({content,author,heading}) => {


  return (
    <Card 
      size="3"
      className="w-[400px] h-[210px]"
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
          fallback={<PercentSquareIcon size={28} strokeWidth={1.5} />}
        />
        <Flex direction="column" gap="1" style={{ flex: 1 }} className="mt-2">
          <Text as="div" size="4" weight="bold" style={{ color: "#fff" }}>
           {heading}
          </Text>
          <Text as="div" size="3" color="gray" style={{ opacity: 1, color: "#f1f1f1" }}>
          " {content}"
          </Text>
          <Text as="div" size="3" color="gray" className="text-end" style={{ opacity: 1, color: "#f1f1f1" }}>
           -{author}
          </Text>
        </Flex>
    
      </Flex>
    </Card>
  );
};
