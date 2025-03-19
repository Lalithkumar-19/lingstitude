import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import axiosInstance from "@/lib/axiosInstance";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";


const BatchStudentsDisplay = () => {

  const dispatch=useDispatch<AppDispatch>();
  const batches=useSelector((state:RootState)=>state.batch.batches);

  const [selectedBatch, setSelectedBatch] = useState<string>("")
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  const fetchStudents = async () => {
    if (!selectedBatch) return;
      setLoading(true);
      setError("");

      try {
        const res = await axiosInstance.post("/api/admin/get-students-by-batch", {
          batch_name: selectedBatch,
        }, { params: { page, limit: 10 } });
        console.log("students by batch",res.data);

        setStudents(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

  // Fetch students based on batch and pagination
  useEffect(() => {
    fetchStudents();
  }, [selectedBatch, page]);


  console.log(selectedBatch,"fkh")


  const handleRemove=async(email)=>{
    if(!email||!selectedBatch){
      toast({title:"please select batch or email is not found"});
      return;
    }
    try {
    const res= await axiosInstance.delete(`/api/admin/remove-from-batch?batch=${selectedBatch}&email=${email}`);
    if(res.status==200){
      toast({title:"Successfully Removed"});
      fetchStudents();
    }else{
      toast({title:"Something went wrong",variant:"destructive"});
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 container mx-auto py-12 mt-10 px-4">
      <h1 className="text-3xl text-center md:text-4xl font-bold mb-4">All Students</h1>

      {/* Batch Selection Dropdown */}
      <div className="space-y-6 mb-10">
        <Label htmlFor="batch">Select Batch</Label>
        <select
          id="batch"
          value={selectedBatch}
          onChange={(e) => { 
            setSelectedBatch(e.target.value); 
            setPage(1); 
          }}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select a batch</option>
          {batches.map((batch) => (
            <option key={batch._id} value={batch._id}>
              {batch.batch_name}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading students...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500">No students found</p>
        ) : (
          <>
            <Table className="w-full border-collapse border border-gray-300">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="border border-gray-300 px-4 py-2">Name</TableHead>
                  <TableHead className="border border-gray-300 px-4 py-2">Phone Number</TableHead>
                  <TableHead className="border border-gray-300 px-4 py-2">Email</TableHead>
                  <TableHead className="border border-gray-300 px-4 py-2">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id} className="hover:bg-gray-100">
                    <TableCell className="border border-gray-300 px-4 py-2">{student.fullName}</TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">{student.phoneNumber}</TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">{student.email}</TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2 flex w-full flex-wrap gap-3">
                      <Button 
                      onClick={()=>handleRemove(student.email)}
                      className="bg-red-500 text-white">Remove From This Batch</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-4">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <span className="mt-2">Page {page} of {totalPages}</span>
              <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BatchStudentsDisplay;
