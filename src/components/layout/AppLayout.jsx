import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppLayout({ page, ticketId, onNavigate, children }) {
  return (
    <div className="app">
      <Sidebar page={page} onNavigate={onNavigate} />
      <main className="main">
        <Topbar page={page} ticketId={ticketId} />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
