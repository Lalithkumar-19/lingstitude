import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Corrected import
import { Plus, Calendar } from "lucide-react";

export interface ScheduleTypes {
  classTitle: string;
  batch: string;
  description: string;
  date: Date;
  time: string;
}

export const ScheduleCard: React.FC<ScheduleTypes> = ({
  classTitle,
  batch,
  description,
  date,
  time,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
         {classTitle}
        </CardTitle>
        <CardDescription>
          Create and schedule new live classes for your students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Batch</Label>
          <p className="text-gray-600">{batch}</p>
        </div>

        <div className="space-y-2">
          <Label>Class Title</Label>
          <p className="text-gray-600">{classTitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <p className="text-gray-600">{date.toDateString()}</p>
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <p className="text-gray-600">{description}</p>
        </div>

        <Button type="button" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Delete Scheduled Class
        </Button>
      </CardContent>
    </Card>
  );
};
