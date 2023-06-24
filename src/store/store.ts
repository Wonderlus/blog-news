import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import sourceReducer from "./source/sourceSlice";
import viewReducer from "./view/viewSlice";
import searchReducer from "./search/searchSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        sourceReducer,
        viewReducer,
        searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector