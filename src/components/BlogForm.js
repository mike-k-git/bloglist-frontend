import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onBlogCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    onBlogCreate({ title, author, url });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="ml-5 mt-5 space-y-3 w-64">
      <h2 className="text-lg font-medium leading-6 text-slate-900">
        Create New
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            data-cy="blog-title"
            className="focus:ring-orange-300 focus:border-orange-300 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            data-cy="blog-author"
            className="focus:ring-orange-300 focus:border-orange-300 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            url
          </label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            data-cy="blog-url"
            className="focus:ring-orange-300 focus:border-orange-300 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div className="text-right">
          <button
            className="mt-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
            type="submit"
            data-cy="blog-create"
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onBlogCreate: PropTypes.func.isRequired,
};

export default BlogForm;
