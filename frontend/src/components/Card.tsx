import { Card, Button } from "react-bootstrap";
import { CardType } from "../types/types";
import "../styles/card.scss";
import {
  useLikePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
} from "../api/postsApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
export const PostCard = ({
  _id,
  name,
  category,
  description,
  price,
  imageUrl,
  status,
  likes,
  UserId,
  showCommentButton = true,
}: CardType) => {
  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { refetch } = useGetAllPostsQuery();
  const [updatePost] = useUpdatePostMutation();

  const userInfo = useSelector((state: RootState) => state.userInfo);

  const navigate = useNavigate();

  const handleLike = async (id: string) => {
    try {
      const response = await likePost(id).unwrap();
      refetch();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePost(id).unwrap();
      navigate("/myPosts");
      refetch();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      const updatedPost = { status: "accepted" };
      const response = await updatePost({ id, updatedPost }).unwrap();
      refetch();
      console.log(response);
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  const handlePending = async (id: string) => {
    try {
      const updatedPost = { status: "pending" };
      const response = await updatePost({ id, updatedPost }).unwrap();
      refetch();
      console.log(response);
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  return (
    <Card className="mb-4 shadow-sm card-min-max-width">
      <Link to={`/comments/${_id}`}>
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={name}
          className="img-style"
        />
      </Link>
      <Card.Body>
        <Card.Title>{name.slice(0, 12)}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Kategorija: {category} | Statusas: {status}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Kaina: {price} eur.</strong>
        </Card.Text>
        <div className="mt-3">
          {userInfo.role === "user" || userInfo.role === "admin" ? (
            <>
              <Button
                variant="dark"
                className="me-2"
                onClick={() => handleLike(_id)}
              >
                <i className="bi bi-hand-thumbs-up"></i> {likes.length}
              </Button>
              <Link to={`/comments/${_id}`}>
                {showCommentButton === true ? (
                  <Button variant="dark" className="me-2">
                    <i className="bi bi-chat"></i>
                  </Button>
                ) : (
                  <></>
                )}
              </Link>
            </>
          ) : (
            ""
          )}

          {userInfo._id === UserId ? (
            <>
              <Button variant="dark" className="me-2">
                <Link
                  to={`/updatePost/${_id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <i className="bi bi-pencil"></i>
                </Link>
              </Button>
              <Button variant="dark" onClick={() => handleDelete(_id)}>
                <i className="bi bi-trash3"></i>
              </Button>
            </>
          ) : (
            <></>
          )}
          {userInfo.role === "admin" ? (
            status === "pending" ? (
              <Button variant="dark" onClick={() => handleAccept(_id)}>
                Patvirtinti
              </Button>
            ) : (
              <Button variant="dark" onClick={() => handlePending(_id)}>
                Blokuoti
              </Button>
            )
          ) : (
            <></>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
