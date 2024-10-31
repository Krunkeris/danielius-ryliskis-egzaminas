import { Header } from "../../components/Header";
import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useCreateCategoryMutation } from "../../api/categoriesApi";
import { useGetAllCategoriesQuery } from "../../api/categoriesApi";
import { ListCategories } from "./ListCategories";

export const CreateCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();

  const { refetch } = useGetAllCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Error loading categories.</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createCategory({ name: categoryName }).unwrap();
      console.log(response);
      refetch();
      setCategoryName("");
    } catch (err) {
      console.error("Failed to create category: ", err);
    }
  };

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <h2>Create Category</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Category"}
          </Button>

          {error && (
            <div className="text-danger mt-2">Error creating category</div>
          )}
        </Form>
      </Container>
      <br />
      <ListCategories />
    </div>
  );
};
