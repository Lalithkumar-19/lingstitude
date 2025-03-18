import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React, { useState } from 'react'
import AllstudentsDisplay from './AllstudentsDisplay'
import BatchStudentsDisplay from './BatchStudentsDisplay'

const UsersStudentstab = () => {
    const [flag,setFlag]=useState<boolean>(true);
  return (
    <Tabs defaultValue='users' className='w-full mt-10'>
        <TabsList className='grid w-full grid-cols-2 bg-gray-200 h-11 rounded-lg border' >
            <TabsTrigger
              value='users' className={`${flag?"bg-white/80":""}`} 
              onClick={()=>setFlag(true)}>
                User list 
              </TabsTrigger>
               <TabsTrigger
              value='students' 
               className={`${!flag?"bg-white/80":""}`}
            onClick={()=>setFlag(false)}>
                  Students
              </TabsTrigger>
        </TabsList>
        <TabsContent value='users'>
            <AllstudentsDisplay/>
        </TabsContent>

        <TabsContent value='students'>
            <BatchStudentsDisplay/>
        </TabsContent>

    </Tabs>
    
  )
}

export default UsersStudentstab