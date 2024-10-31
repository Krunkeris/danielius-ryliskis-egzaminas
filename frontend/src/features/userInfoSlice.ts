import { createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "../types/types";

const initialState: UserInfoType = {
  _id: "",
  username: "",
  email: "",
  role: "",
  status: "accepted",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser: UserInfoType = JSON.parse(user);
        return { ...state, ...parsedUser };
      }
      console.log(`from slice ${user}`);
      return state;
    },
    clearUserInfo: () => initialState,
  },
});

export const { getUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
