import React, { useState } from "react";
import { LoginInputDataType } from "../types/types";
import { useLoginMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [loginInputData, setLoginInputData] = useState<LoginInputDataType>({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputData({
      ...loginInputData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const { getUserInfo } = useGetUserInfo();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(loginInputData).unwrap();
      navigate("/");
      localStorage.setItem("user", JSON.stringify(response));
      getUserInfo();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="form shadow p-4 rounded"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mb-4">Prisijungimas</h2>

      <div className="mb-3">
        <label htmlFor="email" className="form-label" hidden>
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          placeholder="Iveskite elektronini pasta..."
          required
          value={loginInputData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label" hidden>
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          placeholder="Iveskite slaptazodi"
          required
          value={loginInputData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {isLoading ? "Prisijungiama..." : "Prisijungti"}
      </button>
      {isError && (
        <p className="text-danger mt-2">
          {(error as any).data.message || "Logging in failed"}
        </p>
      )}
      <div className="mt-3">
        Dar neturite paskyros?{" "}
        <Link to="/register">Prisiregistruokite cia</Link>
      </div>
    </form>
  );
};
