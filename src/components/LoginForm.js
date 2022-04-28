import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername("");
    setPassword("");
  };
  return (
    <div className="ml-5 mt-5 space-y-3 w-64">
      <h2 className="text-lg font-medium leading-6 text-slate-900">
        Log in to application
      </h2>
      <form onSubmit={handleSubmit} data-cy="login-form">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            data-cy="username-input"
            className="focus:ring-orange-300 focus:border-orange-300 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={password}
            data-cy="password-input"
            className="focus:ring-orange-300 focus:border-orange-300 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="text-right">
          <button
            className="mt-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
            type="submit"
            data-cy="login-submit"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
