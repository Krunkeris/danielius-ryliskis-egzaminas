import { useLogoutMutation } from "../api/authApi";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../features/userInfoSlice";
import { useNavigate } from "react-router-dom";

export const LogoutComponent = ({ visibility = true }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [logout, { isLoading, isError, error }] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();
      navigate("/login");
      localStorage.clear();
      dispatch(clearUserInfo());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {visibility === true ? (
        <div>
          <button
            className="btn btn-dark w-100"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Atsijungiama..." : "Atsijungti"}
          </button>
          {isError && (
            <div className="text-danger mt-2">
              Nepavyko atsijungti: {(error as any).data.message}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
