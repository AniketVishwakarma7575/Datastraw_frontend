import Avatar from "../ui/Avatar.jsx";
import Icon from "../ui/Icon.jsx";
import Logo from "./Logo.jsx";

const navGroups = [
  {
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "grid" },
      { id: "tickets", label: "Tickets", icon: "cart" },
    ],
  },
  {
    label: "Management",
    items: [{ id: "settings", label: "Settings", icon: "settings" }],
  },
];

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <Logo />
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
