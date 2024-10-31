import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/userInfoSlice";
import { useEffect } from "react";

export const GetUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await dispatch(getUserInfo());
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};
