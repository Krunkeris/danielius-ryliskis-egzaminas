import { Header } from "../../components/Header";
import {
  useBlockOrUnblockUserMutation,
  useGetAllUsersQuery,
} from "../../api/usersApi";
import { Accordion } from "react-bootstrap";

export const Users = () => {
  const { data: users, refetch } = useGetAllUsersQuery();
  const [blockOrUnblock] = useBlockOrUnblockUserMutation();

  const handleBlockOrUnblockToggle = async (id: string) => {
    try {
      const response = await blockOrUnblock(id).unwrap();
      refetch();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const usersToMap = users?.filter((user) => user.role === "user");

  return (
    <div>
      <Header />

      <Accordion defaultActiveKey={null}>
        {usersToMap?.map((user, index) => (
          <Accordion.Item key={user._id} eventKey={`${index}`}>
            <Accordion.Header>
              {user.username} | {user.status}
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>ID:</strong> {user._id}
              </p>
              <button
                className="btn btn-dark"
                onClick={() => handleBlockOrUnblockToggle(user._id)}
              >
                {user.status === "blocked" ? "accept" : "block"}
              </button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};
