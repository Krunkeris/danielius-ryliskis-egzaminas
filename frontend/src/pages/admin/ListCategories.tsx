import {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../api/categoriesApi";
import { Accordion, Button, Form } from "react-bootstrap";
import { useState } from "react";

export const ListCategories = () => {
  const { data: categories, refetch } = useGetAllCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleUpdate = async (categoryId: string) => {
    if (newCategoryName.trim()) {
      try {
        await updateCategory({
          id: categoryId,
          name: newCategoryName,
        }).unwrap();
        refetch();
        setEditingCategoryId(null);
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div>
      <Accordion defaultActiveKey="0">
        {categories?.map((category) => (
          <Accordion.Item eventKey={category._id} key={category._id}>
            <Accordion.Header>{category.name}</Accordion.Header>
            <Accordion.Body>
              {editingCategoryId === category._id ? (
                <div>
                  <Form.Control
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter new category name"
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate(category._id)}
                    className="mt-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEditingCategoryId(null)}
                    className="mt-2"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant="dark"
                    onClick={() => {
                      setEditingCategoryId(category._id);
                      setNewCategoryName(category.name);
                    }}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="dark"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};
