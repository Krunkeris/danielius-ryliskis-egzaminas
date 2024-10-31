import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../types/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => "/",
    }),
    getUserById: builder.query<UserType, string>({
      query: (id) => `/${id}`,
    }),
    blockOrUnblockUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useBlockOrUnblockUserMutation,
} = usersApi;
