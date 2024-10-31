import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import userInfoReducer from "../features/userInfoSlice";
import { protectedRouteApi } from "../api/protectedRouteApi";
import { postsApi } from "../api/postsApi";
import { commentsApi } from "../api/commentsApi";
import { categoriesApi } from "../api/categoriesApi";
import { usersApi } from "../api/usersApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [protectedRouteApi.reducerPath]: protectedRouteApi.reducer,
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      postsApi.middleware,
      protectedRouteApi.middleware,
      commentsApi.middleware,
      categoriesApi.middleware,
      usersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
