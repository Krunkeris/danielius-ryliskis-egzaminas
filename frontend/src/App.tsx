import { RegisterPage } from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRouteToHome } from "./protectedRoutes/ProtectedRouteToHome";
import { UserHomePage } from "./pages/user/UserHomePage";
import { ProtectedRouteToUserHome } from "./protectedRoutes/ProtectedRouteToUserHome";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { ProtectedRouteToAdminHome } from "./protectedRoutes/ProtectedRouteToAdminHome";
import { LikedPosts } from "./pages/user/LikedPosts";
import { CreatePost } from "./pages/user/CreatePost";
import { AcceptedPosts } from "./pages/user/AcceptedPosts";
import { MyPosts } from "./pages/user/MyPosts";
import { UpdatePost } from "./pages/user/UpdatePost";
import { CommentsPage } from "./pages/CommentsPage";
import { CreateCategories } from "./pages/admin/CreateCategories";
import { Posts } from "./pages/admin/Posts";
import { Users } from "./pages/admin/Users";
import { GetUserInfo } from "./components/GetUserInfo";
import { BlockedPage } from "./pages/BlockedPage";

function App() {
  return (
    <Router>
      <GetUserInfo />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/likedPosts" element={<LikedPosts />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/acceptedPosts" element={<AcceptedPosts />} />
        <Route path="/myPosts" element={<MyPosts />} />

        <Route path="/updatePost/:id" element={<UpdatePost />} />
        <Route path="/comments/:id" element={<CommentsPage />} />

        <Route path="/createCategories" element={<CreateCategories />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />

        <Route path="/blockedPage" element={<BlockedPage />} />

        <Route
          path="/"
          element={
            <ProtectedRouteToHome>
              <HomePage />
            </ProtectedRouteToHome>
          }
        />

        <Route
          path="/userHome"
          element={
            <ProtectedRouteToUserHome>
              <UserHomePage />
            </ProtectedRouteToUserHome>
          }
        />

        <Route
          path="/adminHome"
          element={
            <ProtectedRouteToAdminHome>
              <AdminHomePage />
            </ProtectedRouteToAdminHome>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
