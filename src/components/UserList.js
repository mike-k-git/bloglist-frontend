import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../reducers";

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchUsers()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [dispatch]);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
