import React, { useState } from 'react'
import { Label } from 'recharts'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const   ContentUpload:React.FC = () => {
const [selectedBatch, setSelectedBatch] = useState<string>("");
 const [batches,setBatches]=useState<any[]>([{
    name:"lalith",
    creted_At:"12-09-2025"
  },{
    name:"ganesh",
    created_At:"8-09-2030",
  }
]);
  return (
    <div className='mt-10 flex flex-col w-full border  p-4'>
        <h2 className='text-2xl mb-3'>Upload Content</h2>
         <div className="space-y-6 mb-10">
                      <Label >Select Batch</Label>
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
                    <div className='flex w-ful flex-col gap-4'>
                    <Input placeholder='Enter Title of video'/>
                    <Input placeholder='Enter valid Video Src'/>
                    <Button>Upload content</Button>
                </div>
                   
                    
        
    </div>
  )
}

export default ContentUpload