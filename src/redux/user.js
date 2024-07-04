import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    Auth:false,
    token:'',
    role:false
  },
  reducers: {
    logIn: (state, action) => {
        state.Auth = true;
        state.token = action.payload[0];
        state.role = action.payload[1]
    },
    logOut : (state) => {
        state.Auth = false;
        state.token = '';
        state.role = false;
    }

  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;