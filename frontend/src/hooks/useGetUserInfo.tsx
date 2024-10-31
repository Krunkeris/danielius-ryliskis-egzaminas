import { AppDispatch, RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo as fetchUserInfo } from "../features/userInfoSlice"; // Renamed to avoid confusion
import { useEffect } from "react";

export const useGetUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    console.log(`from useGetUserInfo hook, userInfo:`, userInfo);
  }, [userInfo]);

  return { userInfo, getUserInfo: () => dispatch(fetchUserInfo()) };
};
