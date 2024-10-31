import { useGetAllCommentsQuery } from "../api/commentsApi";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/card.scss";
import PostCard from "../components/Card";
import { useGetAllPostsQuery } from "../api/postsApi";
import { Col } from "react-bootstrap";
import { useGetAllUsersQuery } from "../api/usersApi";
import { useEffect, useState } from "react";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../api/commentsApi";
import { CommentType } from "../types/types";
import { Header } from "../components/Header";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/userInfoSlice";

export const CommentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { id } = useParams();
  const [addCommentToggle, setAddCommentToggle] = useState(false);
  const [commentInputData, setCommentInputData] = useState({
    postsId: id,
    authorId: "",
    text: "",
  });
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [commentUpdateInputData, setCommentUpdateInputData] = useState("");

  // Fetch user info when the component mounts
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  // Update comment input data when userInfo changes
  useEffect(() => {
    if (userInfo._id) {
      setCommentInputData((prev) => ({ ...prev, authorId: userInfo._id }));
    }
  }, [userInfo]);

  const handleCommentToggle = () => {
    setAddCommentToggle((prev) => !prev);
  };

  // Fetch comments, posts, and users
  const {
    data: comments,
    isError: commentsIsError,
    error: commentsError,
    isLoading: commentsIsLoading,
    refetch: commentsRefetch,
  } = useGetAllCommentsQuery();
  const {
    data: posts,
    isError: postsIsError,
    error: postsError,
    isLoading: postsIsLoading,
  } = useGetAllPostsQuery();
  const {
    data: users,
    isError: usersIsError,
    error: usersError,
    isLoading: usersIsLoading,
  } = useGetAllUsersQuery();

  const [
    createComment,
    {
      isError: createCommentIsError,
      error: createCommentError,
      isLoading: createCommentIsLoading,
    },
  ] = useCreateCommentMutation();
  const [
    deleteComment,
    {
      isError: deleteCommentIsError,
      error: deleteCommentError,
      isLoading: deleteCommentIsLoading,
    },
  ] = useDeleteCommentMutation();
  const [
    updateComment,
    {
      isError: updateCommentIsError,
      error: updateCommentError,
      isLoading: updateCommentIsLoading,
    },
  ] = useUpdateCommentMutation();

  // Loading states
  if (
    commentsIsLoading ||
    postsIsLoading ||
    usersIsLoading ||
    createCommentIsLoading ||
    deleteCommentIsLoading ||
    updateCommentIsLoading
  ) {
    return <p>Loading...</p>;
  }

  // Error handling
  if (commentsIsError) return <p>{(commentsError as any).data.message}</p>;
  if (postsIsError) return <p>{(postsError as any).data.message}</p>;
  if (usersIsError) return <p>{(usersError as any).data.message}</p>;
  if (createCommentIsError)
    return <p>{(createCommentError as any).data.message}</p>;
  if (deleteCommentIsError)
    return <p>{(deleteCommentError as any).data.message}</p>;
  if (updateCommentIsError)
    return <p>{(updateCommentError as any).data.message}</p>;

  const commentsForPost = comments?.filter((comment) => comment.postsId === id);
  const post = posts?.find((post) => post._id === id);

  if (!post) return <p>No post found.</p>;

  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createComment(commentInputData).unwrap();
      commentsRefetch();
      setCommentInputData((prev) => ({ ...prev, text: "" }));
      setAddCommentToggle(false);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await deleteComment(id).unwrap();
      commentsRefetch();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (comment: CommentType) => {
    setEditCommentId(comment._id);
    setCommentUpdateInputData(comment.text);
  };

  const handleUpdateCommentSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (editCommentId) {
      try {
        await updateComment({
          text: commentUpdateInputData,
          id: editCommentId,
        }).unwrap();
        commentsRefetch();
        setCommentUpdateInputData("");
        setEditCommentId(null);
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <Col xs={12} className="mb-4 d-flex justify-content-center">
        <PostCard
          _id={post._id}
          name={post.name}
          price={post.price}
          description={post.description}
          category={post.category}
          imageUrl={post.imageUrl}
          likes={post.likes}
          status={post.status}
          UserId={post.userId}
          showCommentButton={false}
        />
      </Col>

      <Col xs={12} className="mb-4 d-flex w-100 justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          {!addCommentToggle ? (
            <button className="btn btn-dark" onClick={handleCommentToggle}>
              Add a comment
            </button>
          ) : (
            <form onSubmit={handleCreateComment}>
              <div className="mb-3">
                <input
                  name="text"
                  type="text"
                  className="form-control"
                  placeholder="Add a comment..."
                  value={commentInputData.text}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex justify-content-around">
                <button className="btn btn-dark" type="submit">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleCommentToggle}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {commentsForPost?.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul className="comment-section">
              {commentsForPost?.map((comment) => {
                const author = users?.find(
                  (user) => user._id === comment.authorId
                );
                return (
                  <li key={comment._id}>
                    <h6>{author ? author.username : "Unknown User"}</h6>
                    <p>{comment.text}</p>
                    <div>
                      {(userInfo.role === "admin" ||
                        userInfo._id === comment.authorId) && (
                        <>
                          <button
                            className="btn btn-dark"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            delete
                          </button>
                          {editCommentId === comment._id ? (
                            <form onSubmit={handleUpdateCommentSubmit}>
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={commentUpdateInputData}
                                  onChange={(e) =>
                                    setCommentUpdateInputData(e.target.value)
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <button className="btn btn-dark" type="submit">
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => setEditCommentId(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          ) : (
                            <button
                              className="btn btn-dark"
                              onClick={() => handleEditComment(comment)}
                            >
                              update
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Col>
    </div>
  );
};
