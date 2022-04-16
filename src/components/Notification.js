import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) return null
  const { text, type } = notification
  const style = {
    color: type === 'success' ? 'green' : 'red',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'dashed',
  }
  return (
    <div style={style} data-cy="notification">
      {text}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
}

export default Notification
