import { RootState } from "../store/store";
import { useSelector } from "react-redux";

import { LogoutComponent } from "../components/LogoutComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    const handleDirectToHome = async () => {
      try {
        if (userInfo.status === "blocked") {
          navigate("/blockedPage");
        } else {
          if (userInfo.role === "admin") {
            navigate("/adminHome");
          } else if (userInfo.role === "user") {
            navigate("/userHome");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleDirectToHome();
  }, [userInfo]);

  return (
    <div>
      <div>Home</div>
      <LogoutComponent />
    </div>
  );
};
