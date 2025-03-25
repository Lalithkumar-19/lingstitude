import { Label } from '@radix-ui/react-label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Swal from 'sweetalert2';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addBatch, deleteBatch, setBatches, updateBatchName } from '@/redux/batchSlice';
import { AppDispatch, RootState } from '@/redux/store';

const CreateBatch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const batches = useSelector((state: RootState) => state.batch.batches);

  const [newBatch, setNewBatch] = useState('');
  const [editBatch, setEditBatch] = useState('');
  const [editBatchDescription,setEditBatchDescription]=useState("");

  const [batchDescription, setBatchDescription] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/get-batches');
        dispatch(setBatches(res.data.batches));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBatches();
  }, [dispatch]);


  const handleEditName = async (id: string, name: string) => {
    if (!id || name.trim() === '') {
      toast({ title: 'Please enter a new name', description: 'Batch name cannot be empty' });
      return;
    }
    
    try {
      const res = await axiosInstance.put('/api/admin/edit-batchname', { id, name,batchDescription:editBatchDescription});

      if (res.status === 200) {
        console.log(res.data,"ds,vf");
        const{batch_description}=res.data.data;
        dispatch(updateBatchName({ id, name,batch_description:batch_description}));
        setEditBatch('');
        setEditBatchDescription("");
        Swal.fire('Updated!', 'Your batch name has been updated.', 'success');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBatch = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/api/admin/delete-batch?id=${id}`);
          if (res.status === 200) {
            dispatch(deleteBatch(id));
            Swal.fire('Deleted!', 'Your batch has been deleted.', 'success');
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const handleCreateBatch = async () => {
    if (!newBatch.trim() || !batchDescription.trim()) {
      toast({ title: 'Missing fields', description: 'Please provide both name and description' });
      return;
    }
    try {
      const res = await axiosInstance.post('/api/admin/new-batch', { name: newBatch, description: batchDescription });
      if (res.status === 201) {
        dispatch(addBatch(res.data.batch));
        setNewBatch('');
        setBatchDescription('');
        toast({ title: 'Batch created successfully', description: 'New batch has been added' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col w-full mb-10 border p-6 rounded-md bg-white'>
      <h2 className='text-2xl font-semibold mb-6'>Batch Management</h2>
      <Tabs defaultValue='batch-create'>
        <TabsList className='grid w-full grid-cols-2 gap-2 mb-4'>
          <TabsTrigger value='batch-create' className='p-3 bg-gray-200 rounded-lg'>Create Batch</TabsTrigger>
          <TabsTrigger value='batches' className='p-3 bg-gray-200 rounded-lg'>All Batches</TabsTrigger>
        </TabsList>

        <TabsContent value='batch-create' className='space-y-4'>
          <Label className='text-lg'>Batch Name</Label>
          <Input placeholder='Enter batch name' value={newBatch} onChange={(e) => setNewBatch(e.target.value)} />
          <Label className='text-lg mt-2'>Batch Description</Label>
          <Input placeholder='Enter batch description' value={batchDescription} onChange={(e) => setBatchDescription(e.target.value)} />
         
          <Button className='w-full' onClick={handleCreateBatch}>Create Batch</Button>
        </TabsContent>

        <TabsContent value='batches' className='space-y-6'>
          <h3 className='text-xl font-semibold'>Batches Currently Running</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {batches.map((item: any) => (
              <Card key={item.id} className='p-4 rounded-md shadow-md space-y-4'>
                <div>
                  <Label className='text-blue-700 font-semibold'>Batch Name:</Label>
                  <p className='text-lg font-medium'>{item.batch_name}</p>
                </div>
                <div>
                  <Label className='text-blue-700 font-semibold'>Description:</Label>
                  <p className='text-sm text-gray-600'>{item.batch_description}</p>
                </div>
                <Input placeholder='New batch name' value={editBatch} onChange={(e) => setEditBatch(e.target.value)} />

                <Input placeholder='New batch description' value={editBatchDescription} onChange={(e) => setEditBatchDescription(e.target.value)} />

                <div className='flex space-x-2'>
                  <Button className='flex-1' onClick={() => handleEditName(item.id, editBatch)}>Edit</Button>
                  <Button className='flex-1 bg-red-500' onClick={() => handleDeleteBatch(item.id)}>Delete</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateBatch;
