import PropTypes from "prop-types";

const Notification = (props) => {
  const { text, type } = props.notification;
  if (!text) return null;
  const success = "bg-green-100 py-5 px-6 mb-4 text-base text-green-700 mb-3";
  const error = "bg-red-100 py-5 px-6 mb-4 text-base text-red-700 mb-3";
  return (
    <div
      className={type === "success" ? success : error}
      data-cy="notification"
    >
      {text}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Notification;
