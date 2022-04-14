const LoginForm = ({
  username,
  password,
  handleSubmit,
  onUsernameChange,
  onPasswordChange,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username{' '}
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          Password{' '}
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
