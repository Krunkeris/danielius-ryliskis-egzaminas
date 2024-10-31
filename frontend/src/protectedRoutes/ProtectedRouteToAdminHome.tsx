import { ProtectedRouteToAdminHomeProps } from "../types/types";
import { useGetAccesToAdminHomeMutation } from "../api/protectedRouteApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRouteToAdminHome = ({
  children,
}: ProtectedRouteToAdminHomeProps) => {
  const navigate = useNavigate();
  const [getAccesToAdminHome, { isLoading, isError, error }] =
    useGetAccesToAdminHomeMutation();

  useEffect(() => {
    const handleGetAccesToAdminHome = async () => {
      try {
        const response = await getAccesToAdminHome({}).unwrap();
        console.log(response);
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };
    handleGetAccesToAdminHome();
  }, [getAccesToAdminHome]);

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
