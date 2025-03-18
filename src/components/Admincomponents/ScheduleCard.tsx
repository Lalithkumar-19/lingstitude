import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 
import { Plus, Calendar } from "lucide-react";

export type ScheduleTypes = {
  classTitle: string;
  batch: string;
  description: string;
  date: Date;
  time: string;
};

export const ScheduleCard: React.FC<ScheduleTypes> = ({
  classTitle,
  batch,
  description,
  date,
  time,
}) => {
  return (
    <Card className="mt-10 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" aria-hidden="true" />
          {classTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Batch</Label>
          <p className="text-gray-600">{batch}</p>
        </div>

        <div className="space-y-2">
          <Label>Class Title</Label>
          <p className="text-gray-600 line-clamp-1">{classTitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <p className="text-gray-600">{date.toLocaleDateString()}</p>
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <p className="text-gray-600 line-clamp-2 h-20">{description}</p>
        </div>

        <Button type="button" className="w-full">
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Remove Scheduled Class
        </Button>
      </CardContent>
    </Card>
  );
};
