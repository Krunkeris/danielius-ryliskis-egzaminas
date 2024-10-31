import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostType } from "../types/types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/posts",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostType[], void>({
      query: () => "/",
    }),
    getPostById: builder.query<PostType, void>({
      query: (id) => `/${id}`,
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/",
        method: "POST",
        body: newPost,
      }),
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            draft.push({ ...newPost, _id: Date.now().toString() });
          })
        );

        try {
          const { data: createdPost } = await queryFulfilled;
          patchResult.undo();
          dispatch(
            postsApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
              draft[draft.length - 1] = createdPost;
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
      async onQueryStarted({ id, updatedPost }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            const post = draft.find((post) => post._id === id);
            if (post) {
              Object.assign(post, updatedPost);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/${id}/like`,
        method: "PUT",
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            return draft.filter((post) => post._id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useDeletePostMutation,
} = postsApi;
