import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const protectedRouteApi = createApi({
  reducerPath: "protectedRouteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/protected",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAccesToHome: builder.mutation({
      query: () => ({
        url: "/home",
        method: "GET",
      }),
    }),
    getAccesToUserHome: builder.mutation({
      query: () => ({
        url: "/userHome",
        method: "GET",
      }),
    }),
    getAccesToAdminHome: builder.mutation({
      query: () => ({
        url: "/adminHome",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAccesToAdminHomeMutation,
  useGetAccesToUserHomeMutation,
  useGetAccesToHomeMutation,
} = protectedRouteApi;
