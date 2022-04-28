import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      <h2 className="text-orange-300 text-3xl sm:text-4xl lg:text-5xl font-semibold">
        Users
      </h2>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-slate-900 px-6 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-slate-900 px-6 py-4 text-left"
                    >
                      Blogs Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        <Link to={`${user.id}`}>{user.name}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-slate-900">
                        {user.blogs.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
