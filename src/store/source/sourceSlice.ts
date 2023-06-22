import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

export const sourceSlice = createSlice({
    name: "source",
    initialState,
    reducers: {

        setSourceState(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
})

export const { setSourceState } = sourceSlice.actions;
export default sourceSlice.reducer;