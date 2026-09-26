export default function Logo() {
  return (
    <div className="brand">
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="brand-gradient" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path
          d="M9 10C9 7 12 5 16 5C21 5 24 8 24 11C24 14.5 20 15.5 16 16C12 16.5 8 17.5 8 21C8 24 11 27 16 27C20 27 23 25 23 22"
          stroke="url(#brand-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="23" cy="22" r="2.1" fill="url(#brand-gradient)" />
      </svg>
      <span>SupportFlow</span>
    </div>
  );
}
