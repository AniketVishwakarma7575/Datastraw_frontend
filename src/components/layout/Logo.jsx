export default function Logo({ onClick }) {
  return (
    <button className="brand" type="button" onClick={onClick} aria-label="DataStraw home">
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="19" width="5" height="11" rx="2" fill="currentColor" opacity=".45" />
        <rect x="10" y="13" width="5" height="17" rx="2" fill="currentColor" opacity=".62" />
        <rect x="18" y="7" width="5" height="23" rx="2" fill="currentColor" opacity=".8" />
        <rect x="26" y="2" width="5" height="28" rx="2" fill="currentColor" />
      </svg>
      <span>DataStraw</span>
    </button>
  );
}
