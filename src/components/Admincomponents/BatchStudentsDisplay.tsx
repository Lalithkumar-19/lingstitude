import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "../ui/button";
import axios from "axios";
import { Batch } from "./Coursestabs";
import { Label } from "@radix-ui/react-label";
axios.defaults.baseURL = "http://localhost:5001";

const BatchStudentsDisplay = () => {


  const [search, setSearch] = useState("batch1");
  const [searchResult, setSearchResult] = useState(null);
  const [students, setstudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [batches, setBatches] = useState<Batch[]>([]);

useEffect(() => {
    document.title = "Admin Dashboard | Lingstitude";
    
    // Mock batches data
    const mockBatches = [
      {
        id: "batch-2023-A",
        name: "Professional Communication 2023-A",
        startDate: "2023-09-01",
        endDate: "2023-12-15",
        studentsCount: 24,
        description: "Focus on business English and professional communication"
      },
      {
        id: "batch-2023-B",
        name: "Interview Skills Workshop 2023-B",
        startDate: "2023-10-05",
        endDate: "2023-11-30",
        studentsCount: 18,
        description: "Intensive training for job interviews and career advancement"
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setBatches(mockBatches);
    }, 800);
  }, []);





  async function fetchstudents(page) {
    try {
      const res = await axios.get("/fetchAllstudents", { params: { page, limit: 10 } });
      if (res.status === 200) {
        setstudents(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearch() {
    try {
      if (search) {
        const res = await axios.get("/searchUser", { params: { email: search } });
        if (res.status === 200) {
          setSearchResult(res.data.data);
        }
      } else {
        setSearchResult(null);
        fetchstudents(page);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchstudents(page);
  }, [page]);

  useEffect(() => {
    let timer = setTimeout(() => {
      handleSearch();
    }, 4000);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex-1 container mx-auto py-12 mt-10 px-4">
      <h1 className="text-3xl text-center md:text-4xl font-bold mb-4">All students</h1>
     

                   <div className="space-y-6 mb-10">
                      <Label htmlFor="batch">Select Batch</Label>
                      <select
                        id="batch"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select a batch</option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.name}
                          </option>
                        ))}
                      </select>
                    </div>
       
      <div className="overflow-x-auto">
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
            {search ? (
              searchResult ? (
                <TableRow key={searchResult.id} className="hover:bg-gray-100">
                  <TableCell className="border border-gray-300 px-4 py-2">{searchResult.id}</TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">{searchResult.name}</TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">{searchResult.email}</TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2 flex w-full flex-wrap gap-3">
                    <Button>Delete</Button>
                    <Button>Mk student</Button>
                  </TableCell>
                </TableRow>
              ) : null
            ) : (
              students.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-100">
                  <TableCell className="border border-gray-300 px-4 py-2">{user.id}</TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">{user.name}</TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">{user.email}</TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2 flex w-full flex-wrap gap-3">
                    <Button>Delete</Button>
                    <Button>Mk student</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4 gap-4">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="mt-2">Page {page} of {totalPages}</span>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BatchStudentsDisplay;
