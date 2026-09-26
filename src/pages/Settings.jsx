import Avatar from "../components/ui/Avatar.jsx";

export default function Settings() {
  return (
    <section className="settings-page">
      <div className="page-head">
        <div><h1 className="page-title">Settings</h1><p className="page-sub">Manage your workspace preferences.</p></div>
      </div>
      <article className="panel settings-card">
        <h2 className="panel-title">Profile</h2>
        <div className="settings-profile"><Avatar name="Aniket Vishwakarma" /><div><b>Aniket Vishwakarma</b><span>Support Agent</span></div></div>
        <div className="side-row"><span>Workspace</span><span>SupportFlow</span></div>
      </article>
    </section>
  );
}
