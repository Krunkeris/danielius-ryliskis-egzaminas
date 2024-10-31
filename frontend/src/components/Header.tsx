import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LogoutComponent } from "./LogoutComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../api/categoriesApi";
import { HeaderPropsType } from "../types/types";
import "../styles/card.scss";
import Spinner from "react-bootstrap/Spinner";

export const Header = ({
  searchQuery = "",
  onSearchChange = () => {},
  selectedCategory = "",
  setSelectedCategory = () => {},
}: HeaderPropsType) => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  if (!userInfo) {
    throw new Error("No user info");
  }

  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) return <Spinner animation="border" variant="primary" />;
  if (error) return <div>Error loading categories.</div>;

  return (
    <Navbar expand="md" className="bg-body-tertiary mb-3 sticky-top">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/acceptedPosts"
            style={{ textDecoration: "none", color: "black" }}
          >
            Skelbimu aplikacija
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Form className="d-flex w-100">
                <Form.Select
                  aria-label="Select category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="me-2 categories-width"
                >
                  <option value="">All Categories</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </Form>

              {userInfo.role === "user" ? (
                <NavDropdown
                  title={userInfo.username}
                  id="offcanvasNavbarDropdown-expand-lg"
                  className="custom-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/acceptedPosts">
                    All posts
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/createPost">
                    Create post
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/likedPosts">
                    Liked posts
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/myPosts">
                    My posts
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <LogoutComponent />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={userInfo.username}
                  id="offcanvasNavbarDropdown-expand-lg"
                  className="custom-dropdown "
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/acceptedPosts">
                    All posts
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/createCategories">
                    Manage categories
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/posts">
                    Manage posts
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/users">
                    Manage users
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <LogoutComponent />
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
