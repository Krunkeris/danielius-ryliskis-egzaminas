import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType } from "../types/types";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/comments",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllComments: builder.query<CommentType[], void>({
      query: () => "/",
    }),
    getCommentsByPostId: builder.query<CommentType[], string>({
      query: (postId) => `/${postId}`,
    }),
    createComment: builder.mutation<CommentType, Partial<CommentType>>({
      query: (newComment) => ({
        url: "/",
        method: "POST",
        body: newComment,
      }),
      async onQueryStarted(newComment, { dispatch, queryFulfilled }) {
        if (!newComment.postsId) {
          throw new Error("postsId is required");
        }

        const patchResult = dispatch(
          commentsApi.util.updateQueryData(
            "getCommentsByPostId",
            newComment.postsId,
            (draft) => {
              draft.push({
                _id: Math.random().toString(),
                postsId: newComment.postsId,
                authorId: newComment.authorId || "defaultAuthorId",
                text: newComment.text || "",
              });
            }
          )
        );

        try {
          const { data } = await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateComment: builder.mutation<CommentType, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { text },
      }),
      async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApi.util.updateQueryData(
            "getCommentsByPostId",
            id,
            (draft) => {
              const comment = draft.find((comment) => comment._id === id);
              if (comment) {
                comment.text = text;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteComment: builder.mutation<string, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApi.util.updateQueryData(
            "getCommentsByPostId",
            id,
            (draft) => {
              return draft.filter((comment) => comment._id !== id);
            }
          )
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
  useGetAllCommentsQuery,
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
