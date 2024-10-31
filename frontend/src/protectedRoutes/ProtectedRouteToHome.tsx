import { useEffect } from "react";
import { useGetAccesToHomeMutation } from "../api/protectedRouteApi";
import { ProtectedRouteToHomeProps } from "../types/types";
import { useNavigate } from "react-router-dom";

export const ProtectedRouteToHome = ({
  children,
}: ProtectedRouteToHomeProps) => {
  const navigate = useNavigate();
  const [getAccesToHome, { isLoading, isError, error }] =
    useGetAccesToHomeMutation();

  useEffect(() => {
    const handleGetAccesToHome = async () => {
      try {
        const response = await getAccesToHome({}).unwrap();
        console.log(response);
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };
    handleGetAccesToHome();
  }, [getAccesToHome]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Error accessing home: {(error as any).data.message || "Unknown error"}
      </p>
    );
  }

  return <>{children}</>;
};
