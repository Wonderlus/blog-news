import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchState(state, action: PayloadAction<string>) {
            return action.payload;
        }
    }
})

export const { setSearchState } = searchSlice.actions;
export default searchSlice.reducer;