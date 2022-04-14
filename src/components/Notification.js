const Notification = ({ notification }) => {
  if (!notification) return null
  const { text, type } = notification
  const style = {
    color: type === 'success' ? 'green' : 'red',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'dashed',
  }
  return <div style={style}>{text}</div>
}

export default Notification
