import {configureStore} from "@reduxjs/toolkit";
import batchReducer from "./batchSlice";
import schedulesSlice from "./schedulesSlice";

export const store=configureStore({
    reducer:{
        batch:batchReducer,
        schedule:schedulesSlice,
    },
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;


export default store;