import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) {
    return null;
  }
  return (
    <div>
      <h2 className="text-orange-300 text-3xl sm:text-4xl lg:text-5xl font-semibold">
        Addded Blogs
      </h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id} className="text-lg tracking-wide pt-2">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
