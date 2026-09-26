import img from "./aniket.png";

export default function Settings() {
  return (
    <section className="settings-page">
      <div className="page-head">
        <div><h1 className="page-title">Settings</h1><p className="page-sub">Manage your workspace preferences.</p></div>
      </div>
      <a
        className="panel settings-card settings-card-link"
        href="https://github.com/AniketVishwakarma7575"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Aniket Vishwakarma's GitHub profile in a new tab"
      >
        <h2 className="panel-title">Profile</h2>
        <div className="settings-profile"><img src={img} alt="Aniket Vishwakarma" /><div><b>Aniket Vishwakarma</b><span>Support Agent</span></div></div>
        <div className="side-row"><span>Workspace</span><span>SupportFlow</span></div>
      </a>
    </section>
  );
}
