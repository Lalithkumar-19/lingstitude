import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { Label } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

const AllstudentsDisplay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const batches = useSelector((state: RootState) => state.batch.batches);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debounceTimer = useRef(null); // Use useRef for debounce timer

  console.log("user", users);
  // Fetch users with pagination
  const fetchUsers = async (page) => {
    try {
      const res = await axiosInstance.get(
        `/api/admin/fetch-users?page=${page}`
      );
      if (res.status === 200) {
        setUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async (email) => {
    if (!email.trim()) {
      setSearchResult(null);
      fetchUsers(page);
      return;
    }
    try {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(async () => {
        const res = await axiosInstance.get(
          `/api/admin/get-user-by-mail?email=${email}`
        );
        if (res.status === 200) {
          setSearchResult(res.data);
        } else {
          setSearchResult(null);
        }
      }, 500);
    } catch (error) {
      console.error("Error searching user:", error);
      setSearchResult(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/delete-user?id=${id}`);
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Deleted permanently",
        });
        setUsers((prevUsers) =>
          prevUsers.filter((item) => String(item._id) !== String(id))
        );

        if (searchResult?._id === id) setSearchResult(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleMakeStudent = async (id) => {
    if (!selectedBatch) {
      toast({
        title: "select batch to make as student",
        description: "to make student ,select batch",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axiosInstance.post(
        "/api/admin/join-students-to-batch",
        {
          batchId: selectedBatch,
          student_id: id,
        }
      );

      if (res.status == 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((item) => String(item._id) !== String(id))
        );
        if (searchResult?._id === id) setSearchResult(null);
        toast({ title: "successfully added", description: "" });
      } else {
        toast({ title: "Something went wrong", description: "try again.." });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Fetch users when page changes
  useEffect(() => {
    if (!search) {
      fetchUsers(page);
    }
  }, [page, search]);

  return (
    <div className="flex-1 container mx-auto py-12 mt-10 px-4">
      <h1 className="text-3xl text-center md:text-4xl font-bold mb-4">
        All Users
      </h1>
      <Input
        placeholder="Search user by email"
        className="rounded-lg mb-10 mt-10"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse border border-gray-300">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="border border-gray-300 px-4 py-2">
                Full Name
              </TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">
                Phone Number
              </TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">
                Email
              </TableHead>
              <TableHead className="border border-gray-300 px-4 py-2">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResult ? (
              <TableRow key={searchResult._id} className="hover:bg-gray-100">
                <TableCell className="border border-gray-300 px-4 py-2">
                  {searchResult.fullName}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {searchResult.phoneNumber
                    ? searchResult.phoneNumber
                    : "Not provided yet"}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  {searchResult.email}
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 flex w-full flex-wrap gap-3">
                  <Button onClick={() => handleDelete(searchResult._id)}>
                    Delete
                  </Button>
                  <div className="space-y-2">
                    <Label>Add to Batch</Label>
                    <select
                      id="class-batch"
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Add to Batch </option>
                      {batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.batch_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={() => handleMakeStudent(searchResult._id)}>
                    Mk Student
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id} className="hover:bg-gray-100">
                  <TableCell className="border border-gray-300 px-4 py-2">
                    {user.fullName}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">
                    {user.phoneNumber ? user.phoneNumber : "Not provided yet"}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2 flex w-full flex-wrap gap-3">
                    <Button onClick={() => handleDelete(user._id)}>
                      Delete
                    </Button>
                    <div className="space-y-2">
                      <Label>Add to Batch</Label>
                      <select
                        id="class-batch"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Add to Batch </option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.batch_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button onClick={() => handleMakeStudent(user._id)}>
                      Mk Student
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!searchResult && (
          <div className="flex justify-center mt-4 gap-4">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <span className="mt-2">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllstudentsDisplay;
