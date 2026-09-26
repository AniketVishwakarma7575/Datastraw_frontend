import Icon from "./Icon.jsx";

export default function IconButton({ icon, label, className = "", ...props }) {
  return (
    <button className={`icon-btn ${className}`.trim()} type="button" aria-label={label} title={label} {...props}>
      <Icon name={icon} />
    </button>
  );
}
