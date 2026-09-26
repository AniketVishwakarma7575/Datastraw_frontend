import { useState } from "react";
import Avatar from "../components/ui/Avatar.jsx";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";

export default function TicketDetail({ ticket, onBack, onStatusChange, onAddNote }) {
  const [note, setNote] = useState("");
  if (!ticket) return null;

  async function submitNote(event) {
    event.preventDefault();
    if (!note.trim()) return;
    const saved = await onAddNote(ticket.id, note);
    if (saved) setNote("");
  }

  return (
    <section>
      <button className="back-link" type="button" onClick={onBack}>
        <Icon name="arrow" className="icon back-icon" />Tickets
      </button>
      <div className="detail-hero">
        <div>
          <div className="detail-id">{ticket.id}</div>
          <h1 className="detail-subject">{ticket.subject}</h1>
          <div className="detail-meta">Created {ticket.created} · Updated {ticket.updated}</div>
        </div>
        <select className="status-select" aria-label="Ticket status" value={ticket.status} onChange={(event) => onStatusChange(ticket.id, event.target.value)}>
          <option>Open</option><option>In Progress</option><option>Closed</option>
        </select>
      </div>
      <div className="detail-grid">
        <div>
          <article className="panel detail-panel">
            <h2 className="panel-title">Issue description</h2>
            <p className="desc-text">{ticket.desc}</p>
          </article>
          <article className="panel detail-panel">
            <h2 className="panel-title">Activity</h2>
            <div className="timeline">
              {ticket.timeline.map((event, index) => (
                <div className="t-item" key={`${event.action}-${index}`}>
                  <div className={`t-dot ${event.type === "note" ? "note-dot" : ""}`} />
                  <div className="t-body">
                    <b>{event.actor}</b>
                    <div className="t-action">{event.action}</div>
                    {event.type === "note" && <><div className="t-note-label">INTERNAL NOTE</div><div className="t-content">{event.content}</div></>}
                    <div className="t-time">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <form className="panel" onSubmit={submitNote}>
            <div className="composer-label">Internal note</div>
            <div className="composer-sub">Only support agents can see this.</div>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add context, investigation details, or next steps..." />
            <div className="composer-foot"><Button type="submit">Add note →</Button></div>
          </form>
        </div>
        <aside>
          <article className="panel side-card">
            <h2 className="panel-title">Customer</h2>
            <div className="customer-detail">
              <Avatar name={ticket.customer} />
              <div><div className="customer-detail-name">{ticket.customer}</div><div className="cust-email">{ticket.email}</div></div>
            </div>
          </article>
          <article className="panel side-card">
            <h2 className="panel-title metadata-title">Ticket metadata</h2>
            <div className="side-row"><span>Ticket ID</span><span>{ticket.id}</span></div>
            <div className="side-row"><span>Status</span><span>{ticket.status}</span></div>
            <div className="side-row"><span>Created</span><span>Sep 26, 2026</span></div>
            <div className="side-row"><span>Updated</span><span>Sep 26, 2026</span></div>
          </article>
        </aside>
      </div>
    </section>
  );
}
