const LoginForm = ({
  username,
  password,
  handleSubmit,
  onUsernameChange,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username{' '}
        <input
          type="text"
          name="username"
          id="username"
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
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
