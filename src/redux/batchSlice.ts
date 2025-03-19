import {createSlice} from "@reduxjs/toolkit";

const initialState={
    batches:[],
};

const batchSlice=createSlice({
    name:"batch",
    initialState,
    reducers:{
        setBatches:(state,action)=>{
            state.batches=action.payload;
        },
        addBatch:(state,action)=>{
            state.batches.push(action.payload);
        },
        deleteBatch:(state,action)=>{
            state.batches=state.batches.filter(batch=>batch.id!=action.payload);
        },
        updateBatchName:(state,action)=>{
            const index=state.batches.findIndex(item=>item.id==action.payload.id);
            state.batches[index].batch_name=action.payload.name;

        }
    },
});
export const{setBatches,addBatch,deleteBatch,updateBatchName}=batchSlice.actions;
export default batchSlice.reducer;