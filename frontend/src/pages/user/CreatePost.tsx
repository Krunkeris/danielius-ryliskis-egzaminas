import { Form, Button, Container } from "react-bootstrap";
import { PostInputDataType } from "../../types/types";
import { useState } from "react";
import { useCreatePostMutation } from "../../api/postsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetAllPostsQuery } from "../../api/postsApi";
import { Header } from "../../components/Header";
import { useGetAllCategoriesQuery } from "../../api/categoriesApi";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetAllCategoriesQuery();

  const navigate = useNavigate();

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error loading categories.</div>;

  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [postInputData, setPostInputData] = useState<PostInputDataType>({
    userId: userInfo._id,
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInputData({
      ...postInputData,
      [e.target.name]: e.target.value,
    });
  };

  const { refetch } = useGetAllPostsQuery();

  const [
    createPost,
    { isLoading: createPostLoading, isError, error: createPostError },
  ] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createPost(postInputData).unwrap();
      console.log(response);
      navigate("/myPosts");
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (createPostLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container>
        <h2>Add a New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter product name"
              value={postInputData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              as="select"
              value={postInputData.category}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={postInputData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              value={postInputData.price}
              onChange={handleChange}
              required
              name="price"
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter image URL (HTTPS)"
              value={postInputData.imageUrl}
              onChange={handleChange}
              required
              name="imageUrl"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          {isError && (
            <p className="text-danger mt-2">
              {(createPostError as any).data.message ||
                "Creating a post failed"}
            </p>
          )}
        </Form>
      </Container>
    </div>
  );
};
