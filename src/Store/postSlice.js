import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []

} 

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPostsstore: (state, action) => {
            state.posts = action.payload;
        }
        
    }
})


export const { setPostsstore } = postSlice.actions
export default postSlice.reducer
