import { createSlice } from "@reduxjs/toolkit";

const initialState={
    schedules:[],
}

const scheduleSlice=createSlice({
    name:"schedule",
    initialState,
    reducers:{
        addSchedule:(state,action)=>{
            state.schedules.push(action.payload);
        },
        removeSchedule:(state,action)=>{
            state.schedules=state.schedules.filter(item=>item._id!=action.payload);
        }


    }
});

export const{addSchedule,removeSchedule}=scheduleSlice.actions;
export default scheduleSlice.reducer;
