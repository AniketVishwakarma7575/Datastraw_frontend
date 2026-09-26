export default function Badge({ status }) {
  const className = status === "Open" ? "open" : status === "In Progress" ? "progress" : "closed";
  return (
    <span className={`badge ${className}`}>
      <span className="dot" />
      {status}
    </span>
  );
}
