import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Coursestabs from "@/components/Admincomponents/Coursestabs";
import UsersStudentstab from "@/components/Admincomponents/UsersStudentstab";
import CreateBatch from "@/components/Admincomponents/Batchmanagement";
import ContentUpload from "@/components/Admincomponents/ContentUpload";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axiosInstance from "@/lib/axiosInstance";
import { addSchedule } from "@/redux/schedulesSlice";


const AdminDashboard = () => {
    const dispatch=useDispatch<AppDispatch>();

  

    useEffect(()=>{
      const fetchSchedule=async()=>{
        try {
         const res= await axiosInstance.get("/api/admin/schedule");
         if(res.status==200){
          console.log("courses",res.data.data);
           res.data.data.map((item)=>{
            console.log(item,"item");
            dispatch(addSchedule(item));
           })
         }
        } catch (error) {
          console.log(error);
        }
      }
      fetchSchedule();
    },[dispatch]);
  

   


 

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 mt-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Admin Dashboard</h1>
            <CreateBatch/>
            <h2 className="text-2xl ">
              Manage classes, upload materials, and organize batches
            </h2>
          </div>
          <Coursestabs/>
          <ContentUpload/>
         <UsersStudentstab/>

          </div>
      </main>
      
    </div>
  );
};

export default AdminDashboard;
