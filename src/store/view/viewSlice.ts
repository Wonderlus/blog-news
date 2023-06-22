import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = true;

export const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setViewState(state, action) {
            return action.payload;
        },
    },
})

export const { setViewState } = viewSlice.actions;
export default viewSlice.reducer;