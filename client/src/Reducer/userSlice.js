import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        displayName: "",
        uid: "",
        accessToken: "",
        // 유저 고유의 값, -> 현재의 경우 파이어베이스에서 제공함
    },
    reducers: {
        loginUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.accessToken = action.payload.accessToken;
        },

        clearUser: (state) => {
            state.displayName = "";
            state.uid = "";
            state.accessToken = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
