import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { Select } from "@radix-ui/react-select";
axios.defaults.baseURL = "http://localhost:5001";

const BatchStudentsDisplay = () => {


  const [search, setSearch] = useState("batch1");
  const [searchResult, setSearchResult] = useState(null);
  const [students, setstudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



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
     

    
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="border border-gray-300 px-4 py-2">ID</TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">Name</TableHead>
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
