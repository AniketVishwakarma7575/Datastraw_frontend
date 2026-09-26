import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";

const stats = [
  { label: "Total tickets", value: "128", trend: "+12.4% this month", tone: "up", icon: "ticket" },
  { label: "Open", value: "42", trend: "18 need attention", tone: "open", icon: "circle" },
  { label: "In progress", value: "27", trend: "8 updated today", tone: "progress", icon: "circle" },
  { label: "Closed", value: "59", trend: "+14 this week", tone: "closed", icon: "circle" },
];

export default function Dashboard({ onCreateTicket }) {
  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">Good evening, Aniket.</h1>
          <p className="page-sub">Here's the current state of your support workspace.</p>
        </div>
        <Button onClick={onCreateTicket}>
          <Icon name="plus" className="icon small-icon" />
          Create ticket
        </Button>
      </div>

      <div className="kpi-grid">
        {stats.map((stat) => (
          <article className="kpi-card" key={stat.label}>
            <div className="kpi-top">
              <span className="kpi-label">{stat.label}</span>
              <div className={`kpi-icon ${stat.tone}`}>
                <Icon name={stat.icon} className="icon small-icon" />
              </div>
            </div>
            <div className="kpi-value">{stat.value}</div>
            <div className={`kpi-trend ${stat.tone === "up" || stat.tone === "closed" ? "up" : ""}`}>
              {stat.trend}
            </div>
          </article>
        ))}
      </div>

      <div className="dash-grid">
        <article className="panel">
          <h2 className="panel-title">Support health</h2>
          <div className="health-row">
            <div className="donut">
              <div className="donut-inner"><b>128</b><span>Tickets</span></div>
            </div>
            <div className="legend">
              <div><span className="dot open-dot" />Open<b>42</b></div>
              <div><span className="dot progress-dot" />In Progress<b>27</b></div>
              <div><span className="dot closed-dot" />Closed<b>59</b></div>
            </div>
          </div>
          <div className="queue-note"><b>Queue insight.</b> 18 tickets require attention. 8 tickets were updated today.</div>
        </article>
        <article className="panel">
          <h2 className="panel-title">Recent activity</h2>
          <div className="timeline">
            <div className="t-item"><div className="t-dot" /><div className="t-body"><b>Aniket Vishwakarma</b><div className="t-action">Changed TKT-024 to In Progress</div><div className="t-time">2 minutes ago</div></div></div>
            <div className="t-item"><div className="t-dot" /><div className="t-body"><b>Priya Shah</b><div className="t-action">Created TKT-023</div><div className="t-time">18 minutes ago</div></div></div>
            <div className="t-item"><div className="t-dot note-dot" /><div className="t-body"><b>Aniket Vishwakarma</b><div className="t-action">Added an internal note to TKT-019</div><div className="t-time">42 minutes ago</div></div></div>
          </div>
        </article>
      </div>
    </section>
  );
}
