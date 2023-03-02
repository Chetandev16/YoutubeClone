import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const videosSlice = createSlice({
    name: "videos",
    initialState : {value: initialState},
    reducers: {
        setVideos: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { setVideos } = videosSlice.actions;

export default videosSlice.reducer;