import { useGetAllPostsQuery } from "../../api/postsApi";
import PostCard from "../../components/Card";
import { Header } from "../../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/card.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

export const LikedPosts = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { data: posts, error, isLoading } = useGetAllPostsQuery();

  // State for the search query and selected category
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).data.message}</div>;

  // Filter posts based on the search query
  const likedPosts = posts?.filter((post) => post.likes.includes(userInfo._id));

  // Filter posts based on the search query and selected category
  const filteredPosts = likedPosts?.filter((post) => {
    const matchesSearch = post.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Container fluid>
        <Row className="mb-4 row-responsive">
          {filteredPosts?.map((post) => (
            <Col key={post._id} xs={10} sm={8} md={6} lg={4} className="mb-4">
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
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
