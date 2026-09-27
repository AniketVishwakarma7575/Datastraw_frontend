import Avatar from "../ui/Avatar.jsx";
import Icon from "../ui/Icon.jsx";
import Logo from "./Logo.jsx";

const navGroups = [
  {
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "grid" },
      { id: "tickets", label: "Tickets", icon: "ticket" },
    ],
  },
  {
    label: "Management",
    items: [{ id: "settings", label: "Settings", icon: "settings" }],
  },
];

export default function Sidebar({ page, onNavigate, onCreateTicket }) {
  const isTicketsPage = page === "tickets" || page === "detail";

  return (
    <aside className="sidebar">
      <Logo onClick={() => onNavigate("dashboard")} />
      <nav className="nav" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => (
              <button
                className={`nav-item ${page === item.id || (page === "detail" && item.id === "tickets") ? "active" : ""}`}
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <button
          className={`mobile-nav-item ${page === "dashboard" ? "active" : ""}`}
          type="button"
          onClick={() => onNavigate("dashboard")}
          aria-current={page === "dashboard" ? "page" : undefined}
        >
          <Icon name="grid" />
          <span>Home</span>
        </button>
        <button
          className={`mobile-nav-item ${isTicketsPage ? "active" : ""}`}
          type="button"
          onClick={() => onNavigate("tickets")}
          aria-current={isTicketsPage ? "page" : undefined}
        >
          <Icon name="ticket" />
          <span>Tickets</span>
        </button>
        <button className="mobile-nav-item mobile-nav-new" type="button" onClick={onCreateTicket}>
          <Icon name="plus" />
          <span>New</span>
        </button>
        <button
          className={`mobile-nav-item ${page === "settings" ? "active" : ""}`}
          type="button"
          onClick={() => onNavigate("settings")}
          aria-current={page === "settings" ? "page" : undefined}
        >
          <Icon name="settings" />
          <span>Settings</span>
        </button>
      </nav>
      <div className="profile">
        <Avatar name="Aniket Vishwakarma" />
        <div>
          <div className="profile-name">Aniket Vishwakarma</div>
          <div className="profile-role">Support Agent</div>
        </div>
      </div>
    </aside>
  );
}
