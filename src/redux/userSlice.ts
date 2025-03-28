import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
    isAdmin:false,
    enrolled_batch:"",
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload;
            state.enrolled_batch=action.payload.enrolled_batch;
        },
        adminToggle:(state,action)=>{
            state.isAdmin=action.payload;
            localStorage.removeItem("Usertoken");
        },
        removeUser:(state)=>{
            state.user={};
            localStorage.removeItem("Usertoken");
        },
        removeAdmin:(state)=>{
            state.isAdmin=false;
            localStorage.removeItem("Admintoken");
        }

    }
});

export const{addUser,adminToggle}=userSlice.actions;
export default userSlice.reducer;
