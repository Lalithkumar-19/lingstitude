import {configureStore} from "@reduxjs/toolkit";
import batchReducer from "./batchSlice";
import schedulesSlice from "./schedulesSlice";
import userSlice from "./userSlice";

export const store=configureStore({
    reducer:{
        batch:batchReducer,
        schedule:schedulesSlice,
        user:userSlice,
    },
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;


export default store;