const paths = {
  grid: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  cart: <><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M2 3h2l2.7 12.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L22 7H5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 00-1.8.5l-.1.2h-3.4l-.1-.2a1.7 1.7 0 00-1.8-.5l-.2.1-1.7-2.9.1-.1a1.7 1.7 0 00.3-1.9l-.1-.2-3.3-1.7v-3.4l.2-.1a1.7 1.7 0 00.5-1.8l-.1-.2 2.9-1.7.1.1a1.7 1.7 0 001.9.3l.2-.1h3.4l.1.2a1.7 1.7 0 001.8.5l.2-.1 1.7 2.9-.1.1a1.7 1.7 0 00-.3 1.9l.1.2 3.3 1.7v3.4l-.2.1a1.7 1.7 0 00-.5 1.8l.1.2-2.9 1.7-.1-.1A1.7 1.7 0 0017 15l-.2.1z" transform="translate(-1.5 -2)" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 .3c0 1.7-2.5 1.9-2.5 3.7" /><path d="M12 17h.01" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M19 12H5m7 7-7-7 7-7" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="m20 6-11 11-5-5" />,
  circle: <circle cx="12" cy="12" r="9" />,
  ticket: <path d="M4 4h16l-2 9H6L4 4z" />,
};

export default function Icon({ name, className = "icon", ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
