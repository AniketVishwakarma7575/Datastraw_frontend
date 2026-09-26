import { useMemo, useState } from "react";
import Avatar from "../components/ui/Avatar.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";
import SegmentedControl from "../components/ui/SegmentedControl.jsx";

const filters = [
  { label: "All", value: "all" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Closed", value: "Closed" },
];

export default function Tickets({ tickets, onOpenTicket, onCreateTicket }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const visibleTickets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesStatus = filter === "all" || ticket.status === filter;
      const matchesQuery =
        !normalizedQuery ||
        [ticket.id, ticket.customer, ticket.email, ticket.subject, ticket.desc]
          .some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    });
  }, [tickets, filter, query]);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1 className="page-title">Tickets</h1>
          <p className="page-sub">Manage every customer request from one focused workspace.</p>
        </div>
        <Button onClick={onCreateTicket}><Icon name="plus" className="icon small-icon" />Create ticket</Button>
      </div>
      <div className="toolbar">
        <label className="search">
          <Icon name="search" />
          <input
            aria-label="Search tickets"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tickets, customers, email or description"
          />
          <span className="kbd">⌘K</span>
        </label>
        <SegmentedControl options={filters} value={filter} onChange={setFilter} label="Filter tickets by status" />
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Ticket</th><th>Customer</th><th>Subject</th><th>Status</th><th>Updated</th></tr></thead>
          <tbody>
            {visibleTickets.map((ticket) => (
              <tr key={ticket.id} onClick={() => onOpenTicket(ticket.id)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && onOpenTicket(ticket.id)}>
                <td className="tkt-id">{ticket.id}</td>
                <td>
                  <div className="cust-cell">
                    <Avatar name={ticket.customer} className="table-avatar" />
                    <div><div className="cust-name">{ticket.customer}</div><div className="cust-email">{ticket.email}</div></div>
                  </div>
                </td>
                <td className="subject-cell">{ticket.subject}</td>
                <td><Badge status={ticket.status} /></td>
                <td className="updated-cell">{ticket.updated}</td>
              </tr>
            ))}
            {visibleTickets.length === 0 && (
              <tr><td className="empty-cell" colSpan="5">No tickets match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
