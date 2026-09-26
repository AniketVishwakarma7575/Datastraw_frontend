export default function Input({ label, className = "", ...props }) {
  const id = props.id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`field ${className}`.trim()}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...props} />
    </div>
  );
}
