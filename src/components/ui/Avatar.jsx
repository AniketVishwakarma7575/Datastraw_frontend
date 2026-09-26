export function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Avatar({ name, className = "", ...props }) {
  return (
    <div className={`avatar ${className}`.trim()} aria-label={name} {...props}>
      {initials(name)}
    </div>
  );
}
