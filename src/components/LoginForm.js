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
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit} data-cy="login-form">
        <div>
          Username{" "}
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            data-cy="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={password}
            data-cy="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-cy="login-submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
