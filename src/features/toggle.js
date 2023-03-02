import { createSlice } from "@reduxjs/toolkit";

const initianState = false;

export const toggleSlice = createSlice({
    name: "navbar",
    initialState: {value : initianState},
    reducers: {
        toggleNavbar(state) {
            state.value = !state.value;
        }
    }
})

export const { toggleNavbar } = toggleSlice.actions;

export default toggleSlice.reducer;