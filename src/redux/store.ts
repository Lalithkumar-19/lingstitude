import {configureStore} from "@reduxjs/toolkit";
import batchReducer from "./batchSlice";

export const store=configureStore({
    reducer:{
        batch:batchReducer
    },
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;


export default store;