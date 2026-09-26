import Avatar from "../ui/Avatar.jsx";
import IconButton from "../ui/IconButton.jsx";

export default function Topbar({ page, ticketId }) {
  const crumb =
    page === "dashboard" ? (
      <b>Dashboard</b>
    ) : page === "detail" ? (
      <>
        Tickets <span className="crumb-separator">/</span> <b>{ticketId}</b>
      </>
    ) : (
      <b>{page === "settings" ? "Settings" : "Tickets"}</b>
    );

  return (
    <header className="topbar">
      <div className="crumb">{crumb}</div>
      <div className="top-actions">
        <IconButton icon="search" label="Search tickets" />
        <IconButton icon="bell" label="Notifications" />
        <IconButton icon="help" label="Help" />
        <Avatar name="Aniket Vishwakarma" className="top-avatar" />
      </div>
    </header>
  );
}
