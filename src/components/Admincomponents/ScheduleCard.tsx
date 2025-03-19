import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 
import { Plus, Calendar } from "lucide-react";
import dateformat from "@/lib/dateformat";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { removeSchedule } from "@/redux/schedulesSlice";

export type ScheduleTypes = {
  batchname: string;
  title: string;
  description: string;
  date: string;
  time: string;
  _id:string;
};

export const ScheduleCard: React.FC<ScheduleTypes> = ({
  batchname,
  title,
  description,
  date,
  time,
  _id

}) => {


  const dispatch=useDispatch<AppDispatch>();
  const batches=useSelector((state:RootState)=>state.schedule.schedules);
   
  const handleDelete=async()=>{
    try {
      const res=await axiosInstance.delete(`/api/admin/schedule?id=${_id}`);
      if(res.status==200){
        dispatch(removeSchedule(_id));
        toast({
          title:"Deleted Successfully",
          description:"Deleted from batch",
        });
      }
      
    } catch (error) {
     console.log(error); 
    }

  }

  return (
    <Card className="mt-10 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Batch</Label>
          <p className="text-gray-600">{batchname}</p>
        </div>

        <div className="space-y-2">
          <Label>Class Title</Label>
          <p className="text-gray-600 line-clamp-1">{title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <p className="text-gray-600">{dateformat(date)}</p>
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

        <Button type="button" className="w-full" onClick={()=>handleDelete()}>
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Remove Scheduled Class
        </Button>
      </CardContent>
    </Card>
  );
};
