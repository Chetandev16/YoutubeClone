import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

export const searchSlice = createSlice({
    name: "search",
    initialState : {value:  initialState},
    reducers: {
        search(state, action) {
            state.value = action.payload;
        }
    }
})

export const { search } = searchSlice.actions;

export default searchSlice.reducer;