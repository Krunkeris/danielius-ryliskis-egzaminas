import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useLogoutMutation } from "../api/authApi";
import { clearUserInfo } from "../features/userInfoSlice";

export const BlockedPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();

      localStorage.clear();
      dispatch(clearUserInfo());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Row>
        <Col>
          <Alert variant="danger" className="text-center">
            <h1 className="display-4">Access Denied</h1>
            <p className="lead">
              Your access to this page has been blocked. If you think this is a
              mistake, please contact us.
            </p>
            <Button
              variant="primary"
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
              onClick={handleLogout}
            >
              Contact Support via Gmail
            </Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};
