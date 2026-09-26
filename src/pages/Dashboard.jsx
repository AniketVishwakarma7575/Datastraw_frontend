import { useEffect, useState } from "react";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";

export default function Dashboard({ tickets, onCreateTicket }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const hour = now.getHours();
  const greeting = hour < 5
    ? "Good night"
    : hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : hour < 21
          ? "Good evening"
          : "Good night";
  const counts = tickets.reduce(
    (result, ticket) => {
      result.total += 1;
      if (ticket.status === "Open") result.open += 1;
      if (ticket.status === "In Progress") result.inProgress += 1;
      if (ticket.status === "Closed") result.closed += 1;
      return result;
    },
    { total: 0, open: 0, inProgress: 0, closed: 0 },
  );
  const stats = [
    { label: "Total tickets", value: counts.total, trend: "Live ticket count", tone: "up", icon: "ticket" },
    { label: "Open", value: counts.open, trend: `${counts.open} need attention`, tone: "open", icon: "circle" },
    { label: "In progress", value: counts.inProgress, trend: "Being handled", tone: "progress", icon: "circle" },
    { label: "Closed", value: counts.closed, trend: "Resolved tickets", tone: "closed", icon: "circle" },
  ];
  const recentTickets = tickets.slice(0, 3);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">{greeting}, Aniket.</h1>
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
              <div className="donut-inner"><b>{counts.total}</b><span>Tickets</span></div>
            </div>
            <div className="legend">
              <div><span className="dot open-dot" />Open<b>{counts.open}</b></div>
              <div><span className="dot progress-dot" />In Progress<b>{counts.inProgress}</b></div>
              <div><span className="dot closed-dot" />Closed<b>{counts.closed}</b></div>
            </div>
          </div>
          <div className="queue-note"><b>Queue insight.</b> {counts.open} open tickets require attention.</div>
        </article>
        <article className="panel">
          <h2 className="panel-title">Recent activity</h2>
          <div className="timeline">
            {recentTickets.map((ticket) => (
              <div className="t-item" key={ticket.id}>
                <div className="t-dot" />
                <div className="t-body">
                  <b>{ticket.customer}</b>
                  <div className="t-action">Created {ticket.id}</div>
                  <div className="t-time">{ticket.created}</div>
                </div>
              </div>
            ))}
            {recentTickets.length === 0 && <p className="desc-text">No ticket activity yet.</p>}
          </div>
        </article>
      </div>
    </section>
  );
}
