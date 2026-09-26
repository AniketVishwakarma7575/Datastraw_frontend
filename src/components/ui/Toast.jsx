import Icon from "./Icon.jsx";

export default function Toast({ title, message, type, onDismiss }) {
  return (
    <div className="toast" role={type === "error" ? "alert" : "status"}>
      <div className={`toast-icon ${type}`}>
        <Icon name={type === "error" ? "close" : "check"} />
      </div>
      <div>
        <div className="toast-title">{title}</div>
        <div className="toast-msg">{message}</div>
      </div>
      <button className="toast-close" type="button" aria-label="Dismiss notification" onClick={onDismiss}>
        <Icon name="close" />
      </button>
    </div>
  );
}
