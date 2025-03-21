import { Label } from '@radix-ui/react-label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Swal from 'sweetalert2'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from '@/hooks/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addBatch, deleteBatch, setBatches, updateBatchName } from "@/redux/batchSlice";
import { AppDispatch, RootState } from '@/redux/store';






const CreateBatch:React.FC = () => {

  const dispatch=useDispatch<AppDispatch>();
  const batches=useSelector((state:RootState)=>state.batch.batches);

  const [newBatch,setnewBatch]=useState("");
  const[editBatch,setEditbatch]=useState("");
  
  useEffect(()=>{
    const fetchBatches=async()=>{
      try {
        const res=await axiosInstance.get("/api/admin/get-branches");
        dispatch(setBatches(res.data.batches));
        console.log(res.data,"red");
      } catch (error) {
        console.log(error);
      }
    }
    fetchBatches();
  },[dispatch]);


  const handleEditName=async(id:string,name:string)=>{
    if(!id||name.trim()=="") {
      toast({title:"please enter name to replace",description:"enter a good batch name"})
      return;
    }
    try {
     const res= await axiosInstance.put("/api/admin/edit-batchname",{id,name});
     if(res.status==200){
      dispatch(updateBatchName({id,name}));
        setnewBatch("");
        Swal.fire("Updated!", "Your batch has been  Updated", "success");
     }
    } catch (error) {
      console.log(error);
    }
     
  }


  const handleDeleteBatch=async(id:string)=>{
     Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete. This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
  }).then(async(result) => {
    if (result.isConfirmed) {
      try {
      const res=await axiosInstance.delete(`/api/admin/delete-batch?id=${id}`);
      if(res.status==200){
        dispatch(deleteBatch(id));
         Swal.fire("Deleted!", "Your batch has been deleted.", "success");
      }

      } catch (error) {
        console.log(error);
        return;
      }

      Swal.fire("Deleted!", "Your batch has been deleted.", "success");
    }
  });    


  }


  const handleCreateBatch=async()=>{
    try {
      if(newBatch==undefined||newBatch.trim()=="") {
         toast({
          title: "please provide the batch name",
          description: "name is required to create",
        });
        return;
      }
      const res=await axiosInstance.post("/api/admin/new-branch",{name:newBatch});
      console.log(res);
      if(res.status==201){
        setnewBatch("");
        dispatch(addBatch(res.data.batch));
        toast({
          title:"sucessfully created new Batch",
          description:"created new batch",
        })
      }else{
        toast({
          title:"Something went wrong",
          description:"Error occured | try again"
        })
      }

    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className='flex flex-col w-full mb-20 border p-4'>
      <h2 className='text-2xl mb-10'>Batch Management</h2>
     
        <Tabs defaultValue='batch-create'>


          <TabsList className="grid w-full gap-1 grid-cols-2">
            <TabsTrigger value='batch-create' className='bg-gray-300 rounded p-2 data-[state=active]:bg-white data-[state=active]:text-black'>
              Create A Batch
            </TabsTrigger>
            <TabsTrigger value='batches'  className='bg-gray-300 rounded p-2 data-[state=active]:bg-white data-[state=active]:text-black'>
              All batches
            </TabsTrigger>
          </TabsList>
           <TabsContent value='batch-create' className='p-6'>

            <Label htmlFor='create-batch' className='text-xl'>Enter New Batch Name</Label>
            <Input className='mt-4' placeholder='Please Enter a Batch Name' onChange={(e)=>setnewBatch(e.target.value)} value={newBatch}></Input>
            <Button className='mt-3 w-full' onClick={()=>handleCreateBatch()} >Create New Batch</Button>
              
          </TabsContent> 



          <TabsContent value='batches' className='p-6'>
            
             <Label htmlFor='create-batch' className='text-xl mb-4  pl-2'>Batches Currently Running</Label>
             <div  className='grid w-full grid-cols-1 md:grid-cols-2 gap-4'>
             {batches.map((item: any, ind: number) => {
                return (
                  <Card key={ind} className='flex flex-col h-[180px] gap-4 p-4 '>
                    <div className='flex flex-row' >
                      <Label className='md:text-xl text-blue-800 '>Batch Name:</Label>
                      <p className='md:text-xl pl-3 uppercase line-clamp-1'>{item.batch_name}</p>
                    </div>
                    <Input value={editBatch} onChange={(e)=>setEditbatch(e.target.value)} placeholder='please enter new name to edit'></Input>
                    <Button onClick={()=>{handleEditName(item.id,editBatch)}}> Edit Batch Name</Button>
                    <Button  onClick={()=>{handleDeleteBatch(item.id)}}>Delete Batch </Button>

                  </Card>
                );
              })}
            </div>

          </TabsContent>

        </Tabs>

     
    </div>
  )
}

export default CreateBatch