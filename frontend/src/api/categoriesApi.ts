import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType } from "../types/types";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/categories",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryType[], void>({
      query: () => "/",
    }),
    getCategoryById: builder.query<CategoryType, string>({
      query: (id) => `/${id}`,
    }),
    createCategory: builder.mutation<CategoryType, { name: string }>({
      query: (newCategory) => ({
        url: "/",
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation<
      CategoryType,
      { id: string; name: string }
    >({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
