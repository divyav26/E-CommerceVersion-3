import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState{
  userId: string;
}

const initialState: userState = {
  userId: "",
};
export const userSlice =  createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId:(state, action:PayloadAction<string>) => {
      state.userId = action.payload;
    },
  }
})

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;